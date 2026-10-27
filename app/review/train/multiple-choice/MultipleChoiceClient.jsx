"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import ExerciseQuestionCard from "@/components/exercises/ExerciseQuestionCard/ExerciseQuestionCard";
import ExerciseShell from "@/components/exercises/ExerciseShell/ExerciseShell";
import ExerciseState from "@/components/exercises/ExerciseState/ExerciseState";

import { useSelectedReviewItems } from "../_hooks/useSelectedReviewItems";
import { useTrainingProgress } from "../_hooks/useTrainingProgress";
import { shuffle } from "../_lib/arrayUtils";

import styles from "./MultipleChoice.module.css";

const MODES = [
  {
    key: "english",
    label: "EN",
    title: "English",
    field: "english",
  },
  {
    key: "russian",
    label: "RU",
    title: "Russian",
    field: "russian",
  },
  {
    key: "definition",
    label: "Definition",
    title: "Danish definition",
    field: "definition_da",
  },
];

function normalizePartOfSpeech(
  value = "",
) {
  return value
    .trim()
    .toLowerCase();
}

export default function MultipleChoiceClient({
  vocabulary,
}) {
  const {
    items,
    isLoading,
  } = useSelectedReviewItems();

  const [
    chosenMode,
    setTrainingMode,
  ] = useState("english");

  // only offer modes that at least one selected word has
  const availableModes =
    useMemo(
      () =>
        MODES.filter((mode) =>
          items.some(
            (item) =>
              item.term &&
              item[mode.field],
          ),
        ),
      [items],
    );

  // e.g. no English yet: start with Russian instead of stopping
  const trainingMode =
    availableModes.some(
      (mode) =>
        mode.key === chosenMode,
    )
      ? chosenMode
      : (availableModes[0]?.key ??
        chosenMode);

  const activeMode =
    MODES.find(
      (mode) =>
        mode.key ===
        trainingMode,
    );

  const activeField =
    activeMode?.field ??
    "english";

  const usableItems =
    useMemo(
      () =>
        items.filter(
          (item) =>
            item.term &&
            item[
              activeField
            ],
        ),
      [
        items,
        activeField,
      ],
    );

  const {
    currentIndex,
    finished,
    next,
    reset,
  } = useTrainingProgress(
    usableItems.length,
  );

  const [
    selectedAnswer,
    setSelectedAnswer,
  ] = useState(null);

  const [
    options,
    setOptions,
  ] = useState([]);

  const currentItem =
    usableItems[
      currentIndex
    ];

  const correctAnswer =
    useMemo(() => {
      if (!currentItem) {
        return null;
      }

      const value =
        currentItem[
          activeField
        ];

      if (!value) {
        return null;
      }

      return {
        value,
      };
    }, [
      currentItem,
      activeField,
    ]);

  useEffect(() => {
    if (
      !currentItem ||
      !correctAnswer
    ) {
      setOptions([]);
      return;
    }

    const currentCategory =
      normalizePartOfSpeech(
        currentItem.part_of_speech,
      );

    const wrongAnswers =
      vocabulary
        .filter(
          (item) =>
            item.id !==
              currentItem.id &&
            item[
              activeField
            ] &&
            item[
              activeField
            ] !==
              correctAnswer.value &&
            normalizePartOfSpeech(
              item.part_of_speech,
            ) ===
              currentCategory,
        )
        .map((item) => ({
          value:
            item[
              activeField
            ],
        }));

    const uniqueWrongAnswers =
      wrongAnswers.filter(
        (
          answer,
          index,
          array,
        ) =>
          index ===
          array.findIndex(
            (item) =>
              item.value ===
              answer.value,
          ),
      );

    const selectedWrongAnswers =
      shuffle(
        uniqueWrongAnswers,
      ).slice(0, 2);

    setOptions(
      shuffle([
        correctAnswer,
        ...selectedWrongAnswers,
      ]),
    );
  }, [
    currentItem,
    correctAnswer,
    vocabulary,
    activeField,
  ]);

  function changeMode(mode) {
    if (
      mode ===
      trainingMode
    ) {
      return;
    }

    setTrainingMode(mode);
    setSelectedAnswer(null);
    setOptions([]);
    reset();
  }

  if (isLoading) {
    return (
      <main className="mobilePage">
        <ExerciseState
          eyebrow="Multiple choice"
          title="Loading words"
          message="Preparing your selected review words…"
        />
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="mobilePage">
        <ExerciseState
          eyebrow="Multiple choice"
          title="No words selected"
          message="Choose some words in Review before starting this exercise."
          actionLabel="Back to review"
          actionHref="/review"
        />
      </main>
    );
  }

  if (
    usableItems.length === 0
  ) {
    return (
      <main className="mobilePage">
        <ExerciseState
          eyebrow="Multiple choice"
          title="No usable vocabulary"
          message="Your selected words have no English, Russian or Danish definition yet."
          actionLabel="Back to review"
          actionHref="/review"
        />
      </main>
    );
  }

  if (finished) {
    return (
      <main className="mobilePage">
        <ExerciseState
          eyebrow="Multiple choice"
          title="Practice complete"
          message={`You reviewed ${
            usableItems.length
          } ${
            usableItems.length ===
            1
              ? "word"
              : "words"
          }.`}
          actionLabel="Back to training"
          actionHref="/review/train"
        />
      </main>
    );
  }

  const isAnswered =
    selectedAnswer !== null;

  function isSameAnswer(
    answerA,
    answerB,
  ) {
    return (
      answerA?.value ===
      answerB?.value
    );
  }

  function chooseAnswer(
    answer,
  ) {
    if (isAnswered) {
      return;
    }

    setSelectedAnswer(
      answer,
    );
  }

  function nextQuestion() {
    setSelectedAnswer(null);
    setOptions([]);
    next();
  }

  return (
    <ExerciseShell
      eyebrow="Multiple choice"
      title={`Choose the correct ${
        activeMode?.title ??
        ""
      } meaning`}
      current={
        currentIndex + 1
      }
      total={
        usableItems.length
      }
    >
      <div
        className={
          styles.modeSelector
        }
      >
        <span
          className={
            styles.modeLabel
          }
        >
          Train with
        </span>

        <div
          className={
            styles.modeButtons
          }
          role="group"
          aria-label="Choose training language"
        >
          {availableModes.map(
            (mode) => (
              <button
                key={
                  mode.key
                }
                type="button"
                className={`${styles.modeButton} ${
                  trainingMode ===
                  mode.key
                    ? styles.modeButtonActive
                    : ""
                }`}
                onClick={() =>
                  changeMode(
                    mode.key,
                  )
                }
                aria-pressed={
                  trainingMode ===
                  mode.key
                }
              >
                {
                  mode.label
                }
              </button>
            ),
          )}
        </div>
      </div>

      <ExerciseQuestionCard>
        <h2
          className={
            styles.word
          }
        >
          {currentItem.term}
        </h2>

        {correctAnswer ? (
          <div
            className={
              styles.options
            }
          >
            {options.map(
              (
                option,
                index,
              ) => {
                const isCorrect =
                  isSameAnswer(
                    option,
                    correctAnswer,
                  );

                const isSelected =
                  isSameAnswer(
                    option,
                    selectedAnswer,
                  );

                let optionClass =
                  styles.option;

                if (
                  isAnswered &&
                  isCorrect
                ) {
                  optionClass +=
                    ` ${styles.correct}`;
                }

                if (
                  isAnswered &&
                  isSelected &&
                  !isCorrect
                ) {
                  optionClass +=
                    ` ${styles.wrong}`;
                }

                return (
                  <button
                    key={`${option.value}-${index}`}
                    type="button"
                    className={
                      optionClass
                    }
                    onClick={() =>
                      chooseAnswer(
                        option,
                      )
                    }
                    disabled={
                      isAnswered
                    }
                  >
                    <span
                      className={
                        styles.optionDefinition
                      }
                    >
                      {
                        option.value
                      }
                    </span>
                  </button>
                );
              },
            )}
          </div>
        ) : (
          <p
            className={
              styles.noAnswer
            }
          >
            No{" "}
            {
              activeMode?.title
            }{" "}
            meaning is
            available for this
            word.
          </p>
        )}

        {isAnswered && (
          <div
            className={
              styles.feedback
            }
          >
            {isSameAnswer(
              selectedAnswer,
              correctAnswer,
            ) ? (
              <p
                className={
                  styles.feedbackCorrect
                }
              >
                ✓ Correct
              </p>
            ) : (
              <div
                className={
                  styles.feedbackWrong
                }
              >
                <p>
                  Correct answer:
                </p>

                <strong>
                  {
                    correctAnswer
                      ?.value
                  }
                </strong>
              </div>
            )}

            <button
              type="button"
              className={
                styles.nextButton
              }
              onClick={
                nextQuestion
              }
            >
              Next →
            </button>
          </div>
        )}
      </ExerciseQuestionCard>
    </ExerciseShell>
  );
}