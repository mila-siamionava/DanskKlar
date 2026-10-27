"use client";

import {
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import BackLink from "@/components/navigation/BackLink/BackLink";

import {
  addReviewItem,
  getReviewItems,
} from "@/lib/reviewStorage";

import styles from "./TopicVocabularyList.module.css";
import { formatPartOfSpeech } from "@/lib/vocabulary/partOfSpeech";

const SELECTED_REVIEW_KEY =
  "danskTrainerSelectedReview";

export default function TopicVocabularyList({
  words = [],
  topicName,
  topicSlug,
}) {
  const router = useRouter();

  const [selectedIds, setSelectedIds] = useState(
    new Set(),
  );

  const [reviewIds, setReviewIds] = useState(
    new Set(),
  );

  const [expandedIds, setExpandedIds] = useState(
    new Set(),
  );

  const [openSections, setOpenSections] = useState(
    new Set(),
  );

  const [statusMessage, setStatusMessage] =
    useState("");

  useEffect(() => {
    const reviewItems = getReviewItems();

    setReviewIds(
      new Set(
        reviewItems.map(
          (item) => item.vocabularyId ?? item.id,
        ),
      ),
    );
  }, []);

  const selectedWords = words.filter((word) =>
    selectedIds.has(word.id),
  );

  const selectedCount = selectedIds.size;
  const totalCount = words.length;

  const allSelected =
    totalCount > 0 &&
    selectedCount === totalCount;

  function toggleSelected(id) {
    setStatusMessage("");

    setSelectedIds((current) => {
      const updated = new Set(current);

      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }

      return updated;
    });
  }

  function toggleSelectAll() {
    setStatusMessage("");

    if (allSelected) {
      setSelectedIds(new Set());
      return;
    }

    setSelectedIds(
      new Set(words.map((word) => word.id)),
    );
  }

  function addSelectedToReview() {
    if (selectedWords.length === 0) {
      return;
    }

    selectedWords.forEach((word) => {
      addReviewItem({
        ...word,
        vocabularyId: word.id,
        exerciseTitle: topicName,
      });
    });

    setReviewIds((current) => {
      const updated = new Set(current);

      selectedWords.forEach((word) => {
        updated.add(word.id);
      });

      return updated;
    });

    const amount = selectedWords.length;

    setStatusMessage(
      `✓ ${amount} ord er gemt`,
    );

    setSelectedIds(new Set());
  }

  function trainSelected() {
    if (selectedWords.length === 0) {
      return;
    }

    const trainingItems = selectedWords.map(
      (word) => ({
        ...word,
        vocabularyId: word.id,
        exerciseTitle: topicName,
      }),
    );

    localStorage.setItem(
      SELECTED_REVIEW_KEY,
      JSON.stringify(trainingItems),
    );

    const amount = selectedWords.length;

    setStatusMessage(
      `✓ ${amount} ord er klar til træning`,
    );

    setTimeout(() => {
      router.push("/review/train");
    }, 600);
  }

  function toggleDetails(id) {
    setExpandedIds((current) => {
      const updated = new Set(current);

      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }

      return updated;
    });
  }

  function toggleSection(wordId, section) {
    const sectionId = `${wordId}-${section}`;

    setOpenSections((current) => {
      const updated = new Set(current);

      if (updated.has(sectionId)) {
        updated.delete(sectionId);
      } else {
        updated.add(sectionId);
      }

      return updated;
    });
  }

  return (
    <>
      <div className={styles.headerRow}>
        <BackLink
          href={`/topics/${topicSlug}`}
          label={`Tilbage til ${topicName}`}
          title="Ordforråd"
        />
      </div>

      <section
        className={styles.selectionPanel}
        aria-label="Valg af ord"
      >
        <div className={styles.selectionTop}>
          <p className={styles.selectionCount}>
            <strong>{selectedCount}</strong>
            <span>
              {" "}
              af {totalCount} valgt
            </span>
          </p>

          <button
            type="button"
            className={styles.selectAllButton}
            onClick={toggleSelectAll}
          >
            {allSelected
              ? "Fravælg alle"
              : "Vælg alle"}
          </button>
        </div>

        <div className={styles.selectionActions}>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={addSelectedToReview}
            disabled={selectedCount === 0}
          >
            Gem ord
          </button>

          <button
            type="button"
            className={styles.primaryButton}
            onClick={trainSelected}
            disabled={selectedCount === 0}
          >
            Træn valgte
          </button>
        </div>

        {statusMessage && (
          <div
            className={styles.statusMessage}
            role="status"
            aria-live="polite"
          >
            {statusMessage}
          </div>
        )}
      </section>

      <div className={styles.wordList}>
        {words.map((word) => {
          const isSelected =
            selectedIds.has(word.id);

          const isInReview =
            reviewIds.has(word.id);

          const isExpanded =
            expandedIds.has(word.id);

          const definitionId =
            `${word.id}-definition`;

          const exampleId =
            `${word.id}-example`;

          const isDefinitionOpen =
            openSections.has(definitionId);

          const isExampleOpen =
            openSections.has(exampleId);

          return (
            <article
              key={word.id}
              className={[
                styles.wordItem,
                isSelected
                  ? styles.wordItemSelected
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div className={styles.wordRow}>
                <label
                  className={styles.wordSelection}
                >
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={isSelected}
                    onChange={() =>
                      toggleSelected(word.id)
                    }
                    aria-label={`Vælg ${word.term}`}
                  />

                  <span
                    className={styles.wordInfo}
                  >
                    <span className={styles.word}>
                      {word.term}
                    </span>

                    {word.part_of_speech && (
                      <span
                        className={
                          styles.partOfSpeech
                        }
                      >
                        {formatPartOfSpeech(word.part_of_speech)}
                      </span>
                    )}

                    {isInReview && (
                      <span
                        className={
                          styles.reviewBadge
                        }
                      >
                        Gemt
                      </span>
                    )}
                  </span>
                </label>

                <button
                  type="button"
                  className={styles.detailsButton}
                  onClick={() =>
                    toggleDetails(word.id)
                  }
                  aria-expanded={isExpanded}
                >
                  <span>
                    {isExpanded
                      ? "Vis mindre"
                      : "Vis mere"}
                  </span>

                  <span
                    className={styles.chevron}
                    aria-hidden="true"
                  >
                    {isExpanded ? "⌃" : "›"}
                  </span>
                </button>
              </div>

              {isExpanded && (
                <div className={styles.details}>
                  <div
                    className={
                      styles.translations
                    }
                  >
                    <span
                      className={
                        styles.sectionLabel
                      }
                    >
                      Oversættelse
                    </span>

                    {word.english && (
                      <p
                        className={
                          styles.translation
                        }
                      >
                        {word.english}
                      </p>
                    )}

                    {word.russian && (
                      <p
                        className={
                          styles.secondaryTranslation
                        }
                      >
                        {word.russian}
                      </p>
                    )}
                  </div>

                  {word.definition_da && (
                    <div
                      className={
                        styles.dropdownSection
                      }
                    >
                      <button
                        type="button"
                        className={
                          styles.dropdownButton
                        }
                        onClick={() =>
                          toggleSection(
                            word.id,
                            "definition",
                          )
                        }
                        aria-expanded={
                          isDefinitionOpen
                        }
                      >
                        <span>
                          Definition
                        </span>

                        <span
                          className={
                            styles.dropdownChevron
                          }
                          aria-hidden="true"
                        >
                          {isDefinitionOpen
                            ? "⌃"
                            : "⌄"}
                        </span>
                      </button>

                      {isDefinitionOpen && (
                        <div
                          className={
                            styles.dropdownContent
                          }
                        >
                          <p>
                            {
                              word.definition_da
                            }
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {word.example && (
                    <div
                      className={
                        styles.dropdownSection
                      }
                    >
                      <button
                        type="button"
                        className={
                          styles.dropdownButton
                        }
                        onClick={() =>
                          toggleSection(
                            word.id,
                            "example",
                          )
                        }
                        aria-expanded={
                          isExampleOpen
                        }
                      >
                        <span>Example</span>

                        <span
                          className={
                            styles.dropdownChevron
                          }
                          aria-hidden="true"
                        >
                          {isExampleOpen
                            ? "⌃"
                            : "⌄"}
                        </span>
                      </button>

                      {isExampleOpen && (
                        <div
                          className={
                            styles.dropdownContent
                          }
                        >
                          <p>{word.example}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </>
  );
}