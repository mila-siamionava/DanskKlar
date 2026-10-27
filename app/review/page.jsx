"use client";

import {
  useEffect,
  useState,
} from "react";

import BackLink from "@/components/navigation/BackLink/BackLink";

import {
  getReviewItems,
  removeReviewItem,
} from "@/lib/reviewStorage";

import styles from "./Review.module.css";

export default function ReviewPage() {
  const [items, setItems] =
    useState([]);

  const [
    selectedIds,
    setSelectedIds,
  ] = useState([]);

  useEffect(() => {
    setItems(getReviewItems());
  }, []);

  const groupedItems =
    items.reduce(
      (groups, item) => {
        const title =
          item.exerciseTitle ||
          "Other";

        if (!groups[title]) {
          groups[title] = [];
        }

        groups[title].push(item);

        return groups;
      },
      {},
    );

  function toggleWord(id) {
    setSelectedIds((current) => {
      if (current.includes(id)) {
        return current.filter(
          (selectedId) =>
            selectedId !== id,
        );
      }

      return [
        ...current,
        id,
      ];
    });
  }

  function selectAllWords() {
    setSelectedIds(
      items.map(
        (item) => item.id,
      ),
    );
  }

  function startTraining() {
    const selectedItems =
      items.filter((item) =>
        selectedIds.includes(
          item.id,
        ),
      );

    localStorage.setItem(
      "danskTrainerSelectedReview",
      JSON.stringify(
        selectedItems,
      ),
    );

    window.location.href =
      "/review/train";
  }

  function deleteSelectedWords() {
    const amount = selectedIds.length;

    const confirmed = window.confirm(
      `Vil du slette ${amount} valgte ord?`,
    );

    if (!confirmed) {
      return;
    }

    selectedIds.forEach((id) => {
      removeReviewItem(id);
    });

    setItems(
      getReviewItems(),
    );

    setSelectedIds([]);
  }

  function deleteAllWords() {
    const confirmed = window.confirm(
      `Vil du slette alle ${items.length} ord? Det kan ikke fortrydes.`,
    );

    if (!confirmed) {
      return;
    }

    items.forEach((item) => {
      removeReviewItem(item.id);
    });

    setItems([]);
    setSelectedIds([]);
  }

  return (
    <main className={styles.page}>
      <div className={styles.titleRow}>
        <BackLink
          href="/"
          label="Tilbage til forsiden"
        />

        <h1>
          Dine ord
        </h1>
      </div>

      <header className={styles.header}>
        <p>
          Vælg de ord og udtryk, du vil øve.
        </p>
      </header>

      {items.length > 0 && (
        <div
          className={
            styles.actionBar
          }
        >
          {selectedIds.length ===
          0 ? (
            <>
              <button
                type="button"
                className={
                  styles.secondaryButton
                }
                onClick={
                  selectAllWords
                }
              >
                Vælg alle
              </button>

              <button
                type="button"
                className={
                  styles.deleteLink
                }
                onClick={
                  deleteAllWords
                }
              >
                Slet alle
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className={
                  styles.trainButton
                }
                onClick={
                  startTraining
                }
              >
                Træn valgte
              </button>

              <button
                type="button"
                className={
                  styles.deleteButton
                }
                onClick={
                  deleteSelectedWords
                }
              >
                Slet valgte
              </button>
            </>
          )}
        </div>
      )}

      {items.length === 0 ? (
        <p
          className={
            styles.emptyState
          }
        >
          Du har ikke gemt nogen ord
          eller udtryk endnu.
        </p>
      ) : (
        <div
          className={
            styles.groups
          }
        >
          {Object.entries(
            groupedItems,
          ).map(
            ([
              exerciseTitle,
              reviewItems,
            ]) => (
              <section
                key={
                  exerciseTitle
                }
                className={
                  styles.group
                }
              >
                <h2>
                  {exerciseTitle}
                </h2>

                <ul
                  className={
                    styles.wordList
                  }
                >
                  {reviewItems.map(
                    (item) => {
                      const isSelected =
                        selectedIds.includes(
                          item.id,
                        );

                      return (
                        <li
                          key={
                            item.id
                          }
                          className={
                            styles.wordItem
                          }
                        >
                          <label
                            className={`${styles.wordLabel} ${
                              isSelected
                                ? styles.selectedWord
                                : ""
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={
                                isSelected
                              }
                              onChange={() =>
                                toggleWord(
                                  item.id,
                                )
                              }
                            />

                            <span
                              className={
                                styles.wordText
                              }
                            >
                              {item.term?.toLowerCase()}
                            </span>
                          </label>
                        </li>
                      );
                    },
                  )}
                </ul>
              </section>
            ),
          )}
        </div>
      )}
    </main>
  );
}