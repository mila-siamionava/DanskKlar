"use client";

import { useRef, useState } from "react";

import styles from "./SplitReader.module.css";

const SPLIT_KEY = "danskKlarReaderSplit";
const DEFAULT_SPLIT = 60;
const MIN_SPLIT = 35;
const MAX_SPLIT = 75;

function clampSplit(value) {
  return Math.min(MAX_SPLIT, Math.max(MIN_SPLIT, Math.round(value)));
}

function readSavedSplit() {
  if (typeof window === "undefined") return DEFAULT_SPLIT;

  try {
    const saved = Number(localStorage.getItem(SPLIT_KEY));

    return saved ? clampSplit(saved) : DEFAULT_SPLIT;
  } catch {
    return DEFAULT_SPLIT;
  }
}

function saveSplit(value) {
  try {
    localStorage.setItem(SPLIT_KEY, String(value));
  } catch {
    // not saved: the default is used next time
  }
}

/*
  Desktop: document and questions side by side, each scrolling on its own,
  with a drag handle between them.
  Mobile: the document fills the screen and the questions sit in a card
  at the bottom that can be folded away.
  The document is never remounted, so its scroll position is kept
  when the questions change.
*/
export default function SplitReader({
  document,
  panel,
  panelLabel,
  panelSummary,
}) {
  const containerRef = useRef(null);

  const [split, setSplit] = useState(readSavedSplit);
  const [isDragging, setIsDragging] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  function updateSplit(value) {
    const next = clampSplit(value);

    setSplit(next);
    saveSplit(next);
  }

  function handlePointerDown(event) {
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
  }

  function handlePointerMove(event) {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    updateSplit(((event.clientX - rect.left) / rect.width) * 100);
  }

  function handlePointerUp(event) {
    event.currentTarget.releasePointerCapture(event.pointerId);
    setIsDragging(false);
  }

  function handleKeyDown(event) {
    const moves = {
      ArrowLeft: split - 5,
      ArrowRight: split + 5,
      Home: MIN_SPLIT,
      End: MAX_SPLIT,
    };

    if (!(event.key in moves)) return;

    event.preventDefault();
    updateSplit(moves[event.key]);
  }

  return (
    <div
      ref={containerRef}
      className={[
        styles.reader,
        isDragging ? styles.dragging : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ "--document-width": `${split}%` }}
    >
      <section
        className={styles.documentPane}
        aria-label="Dokument"
        tabIndex={0}
      >
        {document}
      </section>

      <div
        className={styles.handle}
        role="separator"
        aria-orientation="vertical"
        aria-label="Bredde på dokumentet"
        aria-valuemin={MIN_SPLIT}
        aria-valuemax={MAX_SPLIT}
        aria-valuenow={split}
        aria-valuetext={`Dokumentet fylder ${split} %`}
        tabIndex={0}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onKeyDown={handleKeyDown}
      />

      <section
        className={[
          styles.panel,
          isPanelOpen ? "" : styles.panelClosed,
        ]
          .filter(Boolean)
          .join(" ")}
        aria-label={panelLabel}
      >
        <button
          type="button"
          className={styles.panelToggle}
          aria-expanded={isPanelOpen}
          onClick={() => setIsPanelOpen((open) => !open)}
        >
          {/* folded: show where the learner is; open: the panel shows it */}
          <span className={styles.panelSummary}>
            {isPanelOpen ? panelLabel : panelSummary}
          </span>

          <span className={styles.panelToggleLabel}>
            {isPanelOpen ? "Skjul" : "Vis"}
          </span>
        </button>

        <div className={styles.panelBody}>{panel}</div>
      </section>
    </div>
  );
}
