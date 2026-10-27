"use client";

import {
  useMemo,
  useState,
} from "react";

import ExerciseQuestionCard from "@/components/exercises/ExerciseQuestionCard/ExerciseQuestionCard";
import ExerciseShell from "@/components/exercises/ExerciseShell/ExerciseShell";
import ExerciseState from "@/components/exercises/ExerciseState/ExerciseState";

import { createGapSentence } from "../_lib/sentenceUtils";
import { useSelectedReviewItems } from "../_hooks/useSelectedReviewItems";
import { useTrainingProgress } from "../_hooks/useTrainingProgress";

import styles from "./FirstLetter.module.css";

function createLetterHint(target) {
  return target
    .trim()
    .split(/\s+/)
    .map((word) => {
      if (word.length <= 1) {
        return word;
      }

      return `${word[0]}${"_".repeat(
        word.length - 1,
      )}`;
    });
}

function prepareTrainingItem(item) {
  if (!item?.example) {
    return null;
  }

  const target =
    item.example_target;

  if (!target) {
    return null;
  }

  const trainingSentence =
    createGapSentence(
      item.example,
      target,
    );

  if (!trainingSentence) {
    return null;
  }

  return {
    ...item,
    target,
    trainingSentence,
  };
}

export default function FirstLetterClient({
  vocabulary,
}) {
  const {
    items: selectedItems,
    isLoading,
  } = useSelectedReviewItems();

  const items = useMemo(() => {
    const vocabularyById =
      new Map(
        vocabulary.map(
          (item) => [
            item.id,
            item,
          ],
        ),
      );

    return selectedItems
      .map((selectedItem) => {
        const id =
          selectedItem.vocabularyId ??
          selectedItem.id;

        const fullItem =
          vocabularyById.get(id);

        if (!fullItem) {
          return null;
        }

        return prepareTrainingItem(
          fullItem,
        );
      })
      .filter(Boolean);
  }, [
    selectedItems,
    vocabulary,
  ]);

  const {
    currentIndex,
    finished,
    next,
  } = useTrainingProgress(
    items.length,
  );

  const [
    answer,
    setAnswer,
  ] = useState("");

  const [
    checked,
    setChecked,
  ] = useState(false);

  const [
    hintType,
    setHintType,
  ] = useState(null);

  const currentItem =
    items[currentIndex];

  if (isLoading) {
    return (
      <main className="mobilePage">
        <ExerciseState
          eyebrow="Første bogstav"
          title="Henter ord"
          message="Gør dine valgte ord klar …"
        />
      </main>
    );
  }

  if (selectedItems.length === 0) {
    return (
      <main className="mobilePage">
        <ExerciseState
          eyebrow="Første bogstav"
          title="Ingen ord valgt"
          message="Vælg nogle ord under Dine ord, før du starter øvelsen."
          actionLabel="Tilbage til dine ord"
          actionHref="/review"
        />
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="mobilePage">
        <ExerciseState
          eyebrow="Første bogstav"
          title="Ingen brugbare eksempler"
          message="Dine valgte ord har ingen eksempelsætninger, der kan bruges i denne øvelse."
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
          eyebrow="Første bogstav"
          title="Øvelsen er færdig"
          message={`Du har lavet ${
            items.length
          } ${
            items.length === 1
              ? "hul"
              : "huller"
          }.`}
          actionLabel="Tilbage til træning"
          actionHref="/review/train"
        />
      </main>
    );
  }

  const correctAnswer =
    currentItem.target
      .trim()
      .toLowerCase();

  const letterHint =
    createLetterHint(
      currentItem.target,
    );

  const normalizedAnswer =
    answer
      .trim()
      .toLowerCase();

  const isCorrect =
    normalizedAnswer ===
    correctAnswer;

  const sentenceParts =
    currentItem.trainingSentence.split(
      "{{gap}}",
    );

  const hasHint =
    currentItem.english ||
    currentItem.russian ||
    currentItem.definition_da;

  function checkAnswer(event) {
    event.preventDefault();

    if (!answer.trim()) {
      return;
    }

    setChecked(true);
  }

  function nextQuestion() {
    setAnswer("");
    setChecked(false);
    setHintType(null);

    next();
  }

  return (
    <ExerciseShell
      eyebrow="Første bogstav"
      title="Gør sætningen færdig"
      current={
        currentIndex + 1
      }
      total={
        items.length
      }
    >
      <ExerciseQuestionCard>
        <p
          className={
            styles.sentence
          }
        >
          {sentenceParts[0]}

          <span
            className={
              styles.gap
            }
          >
            {letterHint.map(
              (
                word,
                index,
              ) => (
                <span
                  key={`${word}-${index}`}
                  className={
                    styles.hintWord
                  }
                >
                  {word}
                </span>
              ),
            )}
          </span>

          {sentenceParts[1]}
        </p>

        {hasHint && (
          <details
            className={
              styles.hint
            }
            onToggle={(
              event,
            ) => {
              if (
                !event.currentTarget.open
              ) {
                setHintType(
                  null,
                );
              }
            }}
          >
            <summary
              className={
                styles.hintSummary
              }
            >
              Tip
            </summary>

            <div
              className={
                styles.hintContent
              }
            >
              <div
                className={
                  styles.hintButtons
                }
              >
                {currentItem.english && (
                  <button
                    type="button"
                    className={`${styles.hintButton} ${
                      hintType ===
                      "english"
                        ? styles.hintButtonActive
                        : ""
                    }`}
                    onClick={() =>
                      setHintType(
                        "english",
                      )
                    }
                  >
                    Engelsk
                  </button>
                )}

                {currentItem.russian && (
                  <button
                    type="button"
                    className={`${styles.hintButton} ${
                      hintType ===
                      "russian"
                        ? styles.hintButtonActive
                        : ""
                    }`}
                    onClick={() =>
                      setHintType(
                        "russian",
                      )
                    }
                  >
                    Russisk
                  </button>
                )}

                {currentItem.definition_da && (
                  <button
                    type="button"
                    className={`${styles.hintButton} ${
                      hintType ===
                      "definition"
                        ? styles.hintButtonActive
                        : ""
                    }`}
                    onClick={() =>
                      setHintType(
                        "definition",
                      )
                    }
                  >
                    Definition
                  </button>
                )}
              </div>

              {hintType && (
                <div
                  className={
                    styles.hintResult
                  }
                >
                  {hintType ===
                    "english" && (
                    <p>
                      {
                        currentItem.english
                      }
                    </p>
                  )}

                  {hintType ===
                    "russian" && (
                    <p>
                      {
                        currentItem.russian
                      }
                    </p>
                  )}

                  {hintType ===
                    "definition" && (
                    <p>
                      {
                        currentItem.definition_da
                      }
                    </p>
                  )}
                </div>
              )}
            </div>
          </details>
        )}

        <form
          className={
            styles.form
          }
          onSubmit={
            checkAnswer
          }
        >
          <label
            className={
              styles.inputLabel
            }
            htmlFor="first-letter-answer"
          >
            Dit svar
          </label>

          <input
            id="first-letter-answer"
            className={
              styles.input
            }
            value={answer}
            onChange={(
              event,
            ) =>
              setAnswer(
                event.target.value,
              )
            }
            disabled={
              checked
            }
            autoComplete="off"
            spellCheck="false"
          />

          {!checked && (
            <button
              type="submit"
              className={
                styles.checkButton
              }
            >
              Tjek
            </button>
          )}
        </form>

        {checked && (
          <div
            className={
              styles.feedback
            }
          >
            {isCorrect ? (
              <p
                className={
                  styles.correct
                }
              >
                ✓ Rigtigt
              </p>
            ) : (
              <div
                className={
                  styles.wrong
                }
              >
                <p>
                  Rigtigt svar:
                </p>

                <strong>
                  {
                    currentItem.target
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
              Næste →
            </button>
          </div>
        )}
      </ExerciseQuestionCard>
    </ExerciseShell>
  );
}