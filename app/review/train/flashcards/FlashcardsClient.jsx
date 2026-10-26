"use client";

import {
  useRef,
  useState,
} from "react";
import {
  ChevronDown,
  RotateCcw,
} from "lucide-react";

import ExerciseShell from "@/components/exercises/ExerciseShell/ExerciseShell";
import ExerciseState from "@/components/exercises/ExerciseState/ExerciseState";

import { useSelectedReviewItems } from "../_hooks/useSelectedReviewItems";

import styles from "./Flashcards.module.css";

export default function FlashcardsClient() {
  const {
    items,
    setItems,
    isLoading,
  } = useSelectedReviewItems();

  const [
    currentIndex,
    setCurrentIndex,
  ] = useState(0);

  const [
    flipped,
    setFlipped,
  ] = useState(false);

  const [
    startX,
    setStartX,
  ] = useState(null);

  const [
    finished,
    setFinished,
  ] = useState(false);

  const revealButtonRef =
    useRef(null);

  const turnBackButtonRef =
    useRef(null);

  if (isLoading) {
    return (
      <main className="mobilePage">
        <ExerciseState
          eyebrow="Flashcards"
          title="Loading flashcards"
          message="Preparing your selected words…"
        />
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="mobilePage">
        <ExerciseState
          eyebrow="Flashcards"
          title="No words selected"
          message="Choose some words in Review before starting flashcards."
          actionLabel="Back to training"
          actionHref="/review/train"
        />
      </main>
    );
  }

  if (finished) {
    return (
      <main className="mobilePage">
        <ExerciseState
          eyebrow="Flashcards"
          title="Review complete"
          message={`You reviewed ${items.length} ${
            items.length === 1
              ? "word"
              : "words"
          }.`}
          actionLabel="Back to training"
          actionHref="/review/train"
        />
      </main>
    );
  }

  const currentItem =
    items[currentIndex];

  const english =
    currentItem.english ||
    "No English translation";

  const russian =
    currentItem.russian ||
    "Нет русского перевода";

  const partOfSpeech =
    currentItem.part_of_speech ||
    currentItem.partOfSpeech ||
    currentItem.pos ||
    currentItem.word_type ||
    currentItem.type ||
    "";

  function moveToNextCard() {
    setFlipped(false);

    if (
      currentIndex ===
      items.length - 1
    ) {
      setFinished(true);
      return;
    }

    setCurrentIndex(
      (current) => current + 1,
    );
  }

  function rememberWord() {
    moveToNextCard();
  }

  function reviewAgain() {
    setFlipped(false);

    const currentCard =
      items[currentIndex];

    setItems((currentItems) => {
      const remainingItems =
        currentItems.filter(
          (_, index) =>
            index !== currentIndex,
        );

      return [
        ...remainingItems,
        currentCard,
      ];
    });

    if (
      currentIndex >=
      items.length - 1
    ) {
      setCurrentIndex(0);
    }
  }

  function handlePointerDown(event) {
    if (
      event.target.closest("details")
    ) {
      return;
    }

    setStartX(event.clientX);
  }

  function handlePointerUp(event) {
    if (
      event.target.closest("details")
    ) {
      return;
    }

    if (startX === null) {
      return;
    }

    const difference =
      event.clientX - startX;

    if (difference > 70) {
      rememberWord();
    } else if (
      difference < -70
    ) {
      reviewAgain();
    }

    setStartX(null);
  }

  function flipCard(event) {
    if (
      event.target.closest("details")
    ) {
      return;
    }

    setFlipped(
      (current) => !current,
    );
  }

  function flipFromButton(
    event,
    nextButtonRef,
  ) {
    event.stopPropagation();

    setFlipped(
      (current) => !current,
    );

    /*
      The face we came from becomes inert,
      so move focus to the button on the other face.
    */
    requestAnimationFrame(() => {
      nextButtonRef.current?.focus();
    });
  }

  function stopDetailsClick(event) {
    event.stopPropagation();
  }

  return (
    <ExerciseShell
      eyebrow="Flashcards"
      title="Remember, then flip"
      current={currentIndex + 1}
      total={items.length}
    >
      <div
        className={
          styles.cardArea
        }
      >
        <div
          className={`${styles.card} ${
            flipped
              ? styles.flipped
              : ""
          }`}
          onClick={flipCard}
          onPointerDown={
            handlePointerDown
          }
          onPointerUp={
            handlePointerUp
          }
        >
          <div
            className={
              styles.cardInner
            }
          >
            <div
              className={`${styles.cardFace} ${styles.cardFront}`}
              inert={flipped}
            >
              <div
                className={
                  styles.frontContent
                }
              >
                <div
                  className={
                    styles.termRow
                  }
                >
                  {partOfSpeech && (
                    <span
                      className={
                        styles.partOfSpeech
                      }
                    >
                      {partOfSpeech}
                    </span>
                  )}

                  <h2
                    className={
                      styles.word
                    }
                  >
                    {currentItem.term?.toLowerCase()}
                  </h2>
                </div>
              </div>

              <button
                ref={revealButtonRef}
                type="button"
                className={
                  styles.tapHint
                }
                onClick={(event) =>
                  flipFromButton(
                    event,
                    turnBackButtonRef,
                  )
                }
              >
                <RotateCcw
                  size={20}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />

                <span>
                  Tap to reveal
                </span>
              </button>
            </div>

            <div
              className={`${styles.cardFace} ${styles.cardBack}`}
              inert={!flipped}
            >
              {currentItem.definition_da && (
                <section
                  className={
                    styles.meaning
                  }
                >
                  <span
                    className={
                      styles.sectionLabel
                    }
                  >
                    Meaning
                  </span>

                  <p
                    className={
                      styles.definition
                    }
                  >
                    {
                      currentItem.definition_da
                    }
                  </p>
                </section>
              )}

              <div
                className={
                  styles.detailsList
                }
              >
                <details
                  className={
                    styles.infoRow
                  }
                  onClick={
                    stopDetailsClick
                  }
                >
                  <summary
                    className={
                      styles.infoSummary
                    }
                  >
                    <span
                      className={
                        styles.infoLabel
                      }
                    >
                      English
                    </span>

                    <ChevronDown
                      size={18}
                      className={
                        styles.chevron
                      }
                    />
                  </summary>

                  <div
                    className={
                      styles.infoContent
                    }
                  >
                    <p
                      className={
                        styles.translationValue
                      }
                    >
                      {english}
                    </p>
                  </div>
                </details>

                <details
                  className={
                    styles.infoRow
                  }
                  onClick={
                    stopDetailsClick
                  }
                >
                  <summary
                    className={
                      styles.infoSummary
                    }
                  >
                    <span
                      className={
                        styles.infoLabel
                      }
                    >
                      Russian
                    </span>

                    <ChevronDown
                      size={18}
                      className={
                        styles.chevron
                      }
                    />
                  </summary>

                  <div
                    className={
                      styles.infoContent
                    }
                  >
                    <p
                      className={
                        styles.translationValue
                      }
                    >
                      {russian}
                    </p>
                  </div>
                </details>

                {currentItem.example && (
                  <details
                    className={
                      styles.infoRow
                    }
                    onClick={
                      stopDetailsClick
                    }
                  >
                    <summary
                      className={
                        styles.infoSummary
                      }
                    >
                      <span
                        className={
                          styles.infoLabel
                        }
                      >
                        Examples
                      </span>

                      <ChevronDown
                        size={18}
                        className={
                          styles.chevron
                        }
                      />
                    </summary>

                    <div
                      className={`${styles.infoContent} ${styles.examples}`}
                    >
                      <p>
                        {
                          currentItem.example
                        }
                      </p>
                    </div>
                  </details>
                )}
              </div>

              <button
                ref={turnBackButtonRef}
                type="button"
                className={
                  styles.tapHint
                }
                onClick={(event) =>
                  flipFromButton(
                    event,
                    revealButtonRef,
                  )
                }
              >
                <RotateCcw
                  size={20}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />

                <span>
                  Tap to turn back
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={
          styles.actions
        }
      >
        <button
          type="button"
          className={
            styles.againButton
          }
          onClick={reviewAgain}
        >
          <span>←</span>
          Review again
        </button>

        <button
          type="button"
          className={
            styles.knowButton
          }
          onClick={rememberWord}
        >
          I know this
          <span>→</span>
        </button>
      </div>
    </ExerciseShell>
  );
}