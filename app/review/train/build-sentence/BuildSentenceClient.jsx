"use client";

import ExerciseQuestionCard from "@/components/exercises/ExerciseQuestionCard/ExerciseQuestionCard";
import ExerciseShell from "@/components/exercises/ExerciseShell/ExerciseShell";
import ExerciseState from "@/components/exercises/ExerciseState/ExerciseState";
import { useActivitySession } from "@/lib/progress/useActivitySession";

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { shuffle } from "../_lib/arrayUtils";
import { useSelectedReviewItems } from "../_hooks/useSelectedReviewItems";
import { useTrainingProgress } from "../_hooks/useTrainingProgress";

import styles from "./BuildSentence.module.css";

function SortableWord({
  item,
  checked,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
    disabled: checked,
  });

  const style = {
    transform:
      CSS.Transform.toString(
        transform,
      ),
    transition,
    zIndex:
      isDragging
        ? 2
        : undefined,
  };

  return (
    <button
      ref={setNodeRef}
      type="button"
      className={`${styles.word} ${
        isDragging
          ? styles.dragging
          : ""
      }`}
      style={style}
      disabled={checked}
      {...attributes}
      {...listeners}
    >
      {item.text}
    </button>
  );
}

function prepareTrainingItem(item) {
  if (!item?.example) {
    return null;
  }

  const words =
    item.example
      .trim()
      .split(/\s+/);

  if (words.length < 3) {
    return null;
  }

  return {
    ...item,
    words,
  };
}

export default function BuildSentenceClient({
  vocabulary,
}) {
  const {
    items: selectedItems,
    isLoading,
  } = useSelectedReviewItems();

  const usableItems =
    useMemo(() => {
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
        .map(
          (
            selectedItem,
          ) => {
            const id =
              selectedItem.vocabularyId ??
              selectedItem.id;

            const fullItem =
              vocabularyById.get(
                id,
              );

            if (!fullItem) {
              return null;
            }

            return prepareTrainingItem(
              fullItem,
            );
          },
        )
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
    usableItems.length,
  );

  const session = useActivitySession({
    area: "words",
    activity: "build-sentence",
    title: "Byg en sætning",
    finished: finished,
  });

  const [
    words,
    setWords,
  ] = useState([]);

  const [
    checked,
    setChecked,
  ] = useState(false);

  const [
    hintType,
    setHintType,
  ] = useState(null);

  const currentItem =
    usableItems[currentIndex];

  const originalWords =
    useMemo(() => {
      if (
        !currentItem?.words
      ) {
        return [];
      }

      return currentItem.words;
    }, [currentItem]);

  const sensors =
    useSensors(
      useSensor(
        PointerSensor,
        {
          activationConstraint: {
            distance: 6,
          },
        },
      ),

      useSensor(
        KeyboardSensor,
        {
          coordinateGetter:
            sortableKeyboardCoordinates,
        },
      ),
    );

  useEffect(() => {
    if (
      originalWords.length ===
      0
    ) {
      setWords([]);

      return;
    }

    const wordItems =
      originalWords.map(
        (
          text,
          index,
        ) => ({
          id: `${index}-${text}`,
          text,
        }),
      );

    setWords(
      shuffle(wordItems),
    );
  }, [originalWords]);

  const isCorrect =
    words
      .map(
        (item) =>
          item.text,
      )
      .join(" ") ===
    originalWords.join(" ");

  const hasHint =
    currentItem?.english ||
    currentItem?.russian ||
    currentItem?.definition_da;

  function handleDragEnd(
    event,
  ) {
    const {
      active,
      over,
    } = event;

    if (
      checked ||
      !over ||
      active.id === over.id
    ) {
      return;
    }

    setWords(
      (
        currentWords,
      ) => {
        const oldIndex =
          currentWords.findIndex(
            (item) =>
              item.id ===
              active.id,
          );

        const newIndex =
          currentWords.findIndex(
            (item) =>
              item.id ===
              over.id,
          );

        if (
          oldIndex === -1 ||
          newIndex === -1
        ) {
          return currentWords;
        }

        return arrayMove(
          currentWords,
          oldIndex,
          newIndex,
        );
      },
    );
  }

  function checkSentence() {
    if (!checked) {
      session.recordWord(currentItem, "bru", isCorrect);
    }

    setChecked(true);
  }

  function nextSentence() {
    setChecked(false);
    setHintType(null);

    next();
  }

  if (isLoading) {
    return (
      <main className="mobilePage">
        <ExerciseState
          eyebrow="Byg en sætning"
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
          eyebrow="Byg en sætning"
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
          eyebrow="Byg en sætning"
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
          eyebrow="Byg en sætning"
          title="Øvelsen er færdig"
          message={`Du har lavet ${
            usableItems.length
          } ${
            usableItems.length ===
            1
              ? "sætning"
              : "sætninger"
          }.`}
          actionLabel="Tilbage til træning"
          actionHref="/review/train"
        />
      </main>
    );
  }

  return (
    <ExerciseShell
      eyebrow="Byg en sætning"
      title="Sæt ordene i den rigtige rækkefølge"
      current={
        currentIndex + 1
      }
      total={
        usableItems.length
      }
    >
      <ExerciseQuestionCard>
        {hasHint && (
          <details
            className={
              styles.hint
            }
            onToggle={(
              event,
            ) => {
              if (
                !event
                  .currentTarget
                  .open
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

        <DndContext
          sensors={sensors}
          collisionDetection={
            closestCenter
          }
          onDragEnd={
            handleDragEnd
          }
        >
          <SortableContext
            items={words.map(
              (item) =>
                item.id,
            )}
            strategy={
              horizontalListSortingStrategy
            }
          >
            <div
              className={
                styles.words
              }
            >
              {words.map(
                (item) => (
                  <SortableWord
                    key={
                      item.id
                    }
                    item={
                      item
                    }
                    checked={
                      checked
                    }
                  />
                ),
              )}
            </div>
          </SortableContext>
        </DndContext>

        {!checked && (
          <button
            type="button"
            className={
              styles.checkButton
            }
            onClick={
              checkSentence
            }
          >
            Tjek
          </button>
        )}

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
                  Rigtig sætning:
                </p>

                <strong>
                  {
                    currentItem.example
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
                nextSentence
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