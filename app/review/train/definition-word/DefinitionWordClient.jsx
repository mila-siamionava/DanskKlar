"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import ExerciseQuestionCard from "@/components/exercises/ExerciseQuestionCard/ExerciseQuestionCard";
import ExerciseShell from "@/components/exercises/ExerciseShell/ExerciseShell";
import ExerciseState from "@/components/exercises/ExerciseState/ExerciseState";
import { useActivitySession } from "@/lib/progress/useActivitySession";

import { useSelectedReviewItems } from "../_hooks/useSelectedReviewItems";
import { useTrainingProgress } from "../_hooks/useTrainingProgress";
import { shuffle } from "../_lib/arrayUtils";

import styles from "./DefinitionWord.module.css";

function normalizePartOfSpeech(
  value = "",
) {
  return value
    .trim()
    .toLowerCase();
}

export default function DefinitionWordClient({
  vocabulary,
}) {
  const {
    items,
    isLoading,
  } = useSelectedReviewItems();

  const usableItems = useMemo(
    () =>
      items.filter(
        (item) =>
          item.term &&
          item.definition_da,
      ),
    [items],
  );

  const {
    currentIndex,
    finished,
    next,
  } = useTrainingProgress(
    usableItems.length,
  );

  const session = useActivitySession({
    area: "words",
    activity: "definition-word",
    title: "Definition → ord",
    finished: finished,
  });

  const [
    selectedAnswer,
    setSelectedAnswer,
  ] = useState(null);

  const [
    options,
    setOptions,
  ] = useState([]);

  const currentItem =
    usableItems[currentIndex];

  const correctAnswer =
    currentItem
      ? {
          id:
            currentItem.id,
          term:
            currentItem.term,
        }
      : null;

  useEffect(() => {
    if (
      !currentItem ||
      !correctAnswer?.term
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
            item.term &&
            normalizePartOfSpeech(
              item.part_of_speech,
            ) ===
              currentCategory,
        )
        .map((item) => ({
          id: item.id,
          term: item.term,
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
              item.term ===
              answer.term,
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
    correctAnswer?.term,
    vocabulary,
  ]);

  if (isLoading) {
    return (
      <main className="mobilePage">
        <ExerciseState
          eyebrow="Definition → ord"
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
          eyebrow="Definition → ord"
          title="Ingen ord valgt"
          message="Vælg nogle ord under Dine ord, før du starter øvelsen."
          actionLabel="Tilbage til dine ord"
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
          eyebrow="Definition → ord"
          title="Ingen ord tilgængelige"
          message="Vælg ord med en dansk definition under Dine ord, før du starter øvelsen."
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
          eyebrow="Definition → ord"
          title="Øvelsen er færdig"
          message={`Du har øvet ${
            usableItems.length
          } ${
            usableItems.length === 1
              ? "ord"
              : "ord"
          }.`}
          actionLabel="Tilbage til træning"
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
      answerA?.id ===
      answerB?.id
    );
  }

  function chooseAnswer(
    answer,
  ) {
    if (isAnswered) {
      return;
    }

    session.recordWord(
      currentItem,
      "gen",
      isSameAnswer(answer, correctAnswer),
    );

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
      eyebrow="Definition → ord"
      title="Vælg det ord, der passer til definitionen"
      current={
        currentIndex + 1
      }
      total={
        usableItems.length
      }
    >
      <ExerciseQuestionCard>
        <p
          className={
            styles.questionLabel
          }
        >
          Dansk definition
        </p>

        <p
          className={
            styles.definition
          }
        >
          {
            currentItem.definition_da
          }
        </p>

        <div
          className={
            styles.options
          }
        >
          {options.map(
            (option) => {
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
                  key={option.id}
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
                  {option.term}
                </button>
              );
            },
          )}
        </div>

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
                ✓ Rigtigt
              </p>
            ) : (
              <div
                className={
                  styles.feedbackWrong
                }
              >
                <p>
                  Rigtigt svar:
                </p>

                <strong>
                  {
                    correctAnswer?.term
                  }
                </strong>
              </div>
            )}

            {currentItem.example && (
              <p
                className={
                  styles.example
                }
              >
                {
                  currentItem.example
                }
              </p>
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
              Næste →
            </button>
          </div>
        )}
      </ExerciseQuestionCard>
    </ExerciseShell>
  );
}