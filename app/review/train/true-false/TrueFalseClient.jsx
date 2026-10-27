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

import styles from "./TrueFalse.module.css";

const MODES = [
  {
    key: "english",
    label: "EN",
    title: "Engelsk",
    field: "english",
  },
  {
    key: "russian",
    label: "RU",
    title: "Russisk",
    field: "russian",
  },
  {
    key: "definition",
    label: "Definition",
    title: "Dansk definition",
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

export default function TrueFalseClient() {
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

  const usableVocabulary =
    useMemo(() => {
      const activeMode =
        MODES.find(
          (mode) =>
            mode.key ===
            trainingMode,
        );

      if (!activeMode) {
        return [];
      }

      return items.filter(
        (item) =>
          item.term &&
          item[
            activeMode.field
          ],
      );
    }, [
      items,
      trainingMode,
    ]);

  const {
    currentIndex,
    finished,
    next,
    reset,
  } = useTrainingProgress(
    usableVocabulary.length,
  );

  const [
    selectedAnswer,
    setSelectedAnswer,
  ] = useState(null);

  const [
    statement,
    setStatement,
  ] = useState(null);

  const currentItem =
    usableVocabulary[
      currentIndex
    ];

  const activeMode =
    MODES.find(
      (mode) =>
        mode.key ===
        trainingMode,
    );

  const activeField =
    activeMode?.field ??
    "english";

  useEffect(() => {
    if (!currentItem) {
      setStatement(null);
      return;
    }

    const shouldBeCorrect =
      Math.random() >= 0.5;

    if (shouldBeCorrect) {
      setStatement({
        text:
          currentItem[
            activeField
          ],
        isCorrect: true,
      });

      return;
    }

    const currentCategory =
      normalizePartOfSpeech(
        currentItem.part_of_speech,
      );

    const wrongItems =
      usableVocabulary.filter(
        (item) =>
          item.id !==
            currentItem.id &&
          item[activeField] &&
          normalizePartOfSpeech(
            item.part_of_speech,
          ) === currentCategory,
      );

    if (
      wrongItems.length === 0
    ) {
      setStatement({
        text:
          currentItem[
            activeField
          ],
        isCorrect: true,
      });

      return;
    }

    const wrongItem =
      wrongItems[
        Math.floor(
          Math.random() *
            wrongItems.length,
        )
      ];

    setStatement({
      text:
        wrongItem[
          activeField
        ],
      isCorrect: false,
    });
  }, [
    currentItem,
    usableVocabulary,
    activeField,
  ]);

  function changeMode(mode) {
    if (
      mode === trainingMode
    ) {
      return;
    }

    setTrainingMode(mode);
    setSelectedAnswer(null);
    setStatement(null);

    if (reset) {
      reset();
    }
  }

  if (isLoading) {
    return (
      <main className="mobilePage">
        <ExerciseState
          eyebrow="Sandt eller falsk"
          title="Henter ord"
          message="Gør dine valgte ord klar …"
        />
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="mobilePage">
        <ExerciseState
          eyebrow="Sandt eller falsk"
          title="Ingen ord valgt"
          message="Vælg nogle ord under Dine ord, før du starter øvelsen."
          actionLabel="Tilbage til dine ord"
          actionHref="/review"
        />
      </main>
    );
  }

  if (
    usableVocabulary.length === 0
  ) {
    return (
      <main className="mobilePage">
        <ExerciseState
          eyebrow="Sandt eller falsk"
          title="Ingen brugbare ord"
          message="Dine valgte ord har endnu ingen oversættelse eller dansk definition."
          actionLabel="Tilbage til dine ord"
          actionHref="/review"
        />
      </main>
    );
  }

  if (finished) {
    return (
      <main className="mobilePage">
        <ExerciseState
          eyebrow="Sandt eller falsk"
          title="Øvelsen er færdig"
          message={`Du har øvet ${
            usableVocabulary.length
          } ${
            usableVocabulary.length ===
            1
              ? "ord"
              : "ord"
          }.`}
          actionLabel="Tilbage til træning"
          actionHref="/review/train"
        />
      </main>
    );
  }

  if (!statement) {
    return null;
  }

  const isAnswered =
    selectedAnswer !== null;

  const isUserCorrect =
    selectedAnswer ===
    statement.isCorrect;

  function chooseAnswer(answer) {
    if (isAnswered) {
      return;
    }

    setSelectedAnswer(answer);
  }

  function nextQuestion() {
    setSelectedAnswer(null);
    setStatement(null);
    next();
  }

  return (
    <ExerciseShell
      eyebrow="Sandt eller falsk"
      title="Er betydningen rigtig?"
      current={
        currentIndex + 1
      }
      total={
        usableVocabulary.length
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
          Træn med
        </span>

        <div
          className={
            styles.modeButtons
          }
          role="group"
          aria-label="Vælg træningssprog"
        >
          {availableModes.map((mode) => (
            <button
              key={mode.key}
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
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      <ExerciseQuestionCard>
        <p
          className={
            styles.term
          }
        >
          {currentItem.term}
        </p>

        <span
          className={
            styles.means
          }
        >
          betyder
        </span>

        <div
          className={
            styles.translation
          }
        >
          <p
            className={
              styles.english
            }
          >
            {statement.text}
          </p>
        </div>

        <div
          className={
            styles.answers
          }
        >
          <button
            type="button"
            className={`${styles.answerButton} ${styles.trueButton}`}
            onClick={() =>
              chooseAnswer(true)
            }
            disabled={
              isAnswered
            }
          >
            Sandt
          </button>

          <button
            type="button"
            className={`${styles.answerButton} ${styles.falseButton}`}
            onClick={() =>
              chooseAnswer(false)
            }
            disabled={
              isAnswered
            }
          >
            Falsk
          </button>
        </div>

        {isAnswered && (
          <div
            className={
              styles.feedback
            }
          >
            {isUserCorrect ? (
              <p
                className={
                  styles.correct
                }
              >
                ✓ Rigtigt
              </p>
            ) : (
              <p
                className={
                  styles.wrong
                }
              >
                ✕ Ikke helt
              </p>
            )}

            <div
              className={
                styles.correctMeaning
              }
            >
              <strong>
                Rigtig betydning:
              </strong>

              <p>
                {
                  currentItem[
                    activeField
                  ]
                }
              </p>
            </div>

            <button
              type="button"
              className={
                styles.nextButton
              }
              onClick={
                nextQuestion
              }
            >
              Næste →
            </button>
          </div>
        )}
      </ExerciseQuestionCard>
    </ExerciseShell>
  );
}