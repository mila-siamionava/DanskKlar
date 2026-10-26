"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import ExerciseShell from "@/components/exercises/ExerciseShell/ExerciseShell";
import ExerciseState from "@/components/exercises/ExerciseState/ExerciseState";

import { useSelectedReviewItems } from "../_hooks/useSelectedReviewItems";
import { shuffle } from "../_lib/arrayUtils";

import styles from "./MatchPairs.module.css";

export default function MatchPairsClient() {
  const {
    items,
    isLoading,
  } = useSelectedReviewItems();

  const usableVocabulary =
    useMemo(
      () =>
        items.filter(
          (item) =>
            item.term &&
            item.english,
        ),
      [items],
    );

  const [round, setRound] =
    useState(0);

  const [
    selectedTerm,
    setSelectedTerm,
  ] = useState(null);

  const [
    selectedTranslation,
    setSelectedTranslation,
  ] = useState(null);

  const [
    matchedIds,
    setMatchedIds,
  ] = useState([]);

  const [
    wrongPair,
    setWrongPair,
  ] = useState(false);

  const [
    translations,
    setTranslations,
  ] = useState([]);

  const roundItems =
    useMemo(() => {
      const start =
        round * 5;

      return usableVocabulary.slice(
        start,
        start + 5,
      );
    }, [
      usableVocabulary,
      round,
    ]);

  const totalRounds =
    Math.ceil(
      usableVocabulary.length / 5,
    );

  useEffect(() => {
    setTranslations(
      shuffle(roundItems),
    );
  }, [roundItems]);

  function chooseTerm(item) {
    if (
      matchedIds.includes(
        item.id,
      )
    ) {
      return;
    }

    setSelectedTerm(item);
    setWrongPair(false);

    if (selectedTranslation) {
      checkPair(
        item,
        selectedTranslation,
      );
    }
  }

  function chooseTranslation(
    item,
  ) {
    if (
      matchedIds.includes(
        item.id,
      )
    ) {
      return;
    }

    setSelectedTranslation(
      item,
    );

    setWrongPair(false);

    if (selectedTerm) {
      checkPair(
        selectedTerm,
        item,
      );
    }
  }

  function checkPair(
    termItem,
    translationItem,
  ) {
    if (
      termItem.id ===
      translationItem.id
    ) {
      setMatchedIds(
        (current) => [
          ...current,
          termItem.id,
        ],
      );

      setSelectedTerm(null);
      setSelectedTranslation(
        null,
      );

      setWrongPair(false);

      return;
    }

    setWrongPair(true);

    setTimeout(() => {
      setSelectedTerm(null);

      setSelectedTranslation(
        null,
      );

      setWrongPair(false);
    }, 700);
  }

  const roundComplete =
    roundItems.length > 0 &&
    roundItems.every(
      (item) =>
        matchedIds.includes(
          item.id,
        ),
    );

  function nextRound() {
    setTranslations([]);

    setRound(
      (current) =>
        current + 1,
    );

    setMatchedIds([]);
    setSelectedTerm(null);
    setSelectedTranslation(
      null,
    );
    setWrongPair(false);
  }

  if (isLoading) {
    return (
      <main className="mobilePage">
        <ExerciseState
          eyebrow="Match pairs"
          title="Loading words"
          message="Preparing your selected review words…"
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
          eyebrow="Match pairs"
          title="No usable vocabulary"
          message="Choose some words with English translations in Review before starting this exercise."
          actionLabel="Back to review"
          actionHref="/review"
        />
      </main>
    );
  }

  if (
    roundItems.length === 0
  ) {
    return (
      <main className="mobilePage">
        <ExerciseState
          eyebrow="Match pairs"
          title="Practice complete"
          message="You matched all selected review words."
          actionLabel="Back to training"
          actionHref="/review/train"
        />
      </main>
    );
  }

  return (
    <ExerciseShell
      eyebrow="Match pairs"
      title="Match each word with its meaning"
      current={round + 1}
      total={totalRounds}
    >
      <div
        className={
          styles.game
        }
      >
        <div
          className={
            styles.column
          }
        >
          <h2
            className={
              styles.columnTitle
            }
          >
            Danish
          </h2>

          {roundItems.map(
            (item) => {
              const matched =
                matchedIds.includes(
                  item.id,
                );

              const selected =
                selectedTerm?.id ===
                item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  className={`${styles.card} ${
                    matched
                      ? styles.matched
                      : ""
                  } ${
                    selected
                      ? styles.selected
                      : ""
                  }`}
                  aria-pressed={
                    selected
                  }
                  onClick={() =>
                    chooseTerm(item)
                  }
                  disabled={
                    matched
                  }
                >
                  {item.term}
                </button>
              );
            },
          )}
        </div>

        <div
          className={
            styles.column
          }
        >
          <h2
            className={
              styles.columnTitle
            }
          >
            English
          </h2>

          {translations.map(
            (item) => {
              const matched =
                matchedIds.includes(
                  item.id,
                );

              const selected =
                selectedTranslation
                  ?.id ===
                item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  className={`${styles.card} ${
                    matched
                      ? styles.matched
                      : ""
                  } ${
                    selected
                      ? styles.selected
                      : ""
                  }`}
                  aria-pressed={
                    selected
                  }
                  onClick={() =>
                    chooseTranslation(
                      item,
                    )
                  }
                  disabled={
                    matched
                  }
                >
                  {item.english}
                </button>
              );
            },
          )}
        </div>
      </div>

      {wrongPair && (
        <p
          className={
            styles.wrong
          }
        >
          Not a match — try
          again.
        </p>
      )}

      {roundComplete && (
        <button
          type="button"
          className={
            styles.nextButton
          }
          onClick={
            nextRound
          }
        >
          Next round →
        </button>
      )}
    </ExerciseShell>
  );
}