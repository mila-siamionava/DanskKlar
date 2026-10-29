"use client";

import { useEffect, useRef } from "react";

import styles from "./SkimmingText.module.css";

function classNames(...names) {
  return names.filter(Boolean).join(" ");
}

const MARK_CLASS = {
  clue: styles.clue,
  detail: styles.detail,
};

/*
  Splits a text into plain parts and marked phrases.
  Each phrase is found by its first occurrence; overlapping marks are skipped.
*/
function splitByMarks(text, marks) {
  const found = marks
    .map((mark) => ({ ...mark, start: text.indexOf(mark.text) }))
    .filter((mark) => mark.start >= 0)
    .sort((a, b) => a.start - b.start);

  const parts = [];
  let position = 0;

  for (const mark of found) {
    if (mark.start < position) continue;

    if (mark.start > position) {
      parts.push({ text: text.slice(position, mark.start) });
    }

    parts.push({ text: mark.text, kind: mark.kind });
    position = mark.start + mark.text.length;
  }

  if (position < text.length) {
    parts.push({ text: text.slice(position) });
  }

  return parts;
}

/*
  A short article for skimming.
  marks: clues and details to show, by block or by phrase (see skimmingSamples.js)
  preview: only the title and headings; the paragraphs are grey lines
  dimOthers: walkthrough mode, everything but the marks fades back
*/
export default function SkimmingText({
  text,
  marks = [],
  preview = false,
  dimOthers = false,
}) {
  const rootRef = useRef(null);

  const firstMarkId = marks[0]?.blockId ?? null;

  // bring the first mark into view, inside whichever area scrolls
  useEffect(() => {
    if (!firstMarkId) return;

    const target = rootRef.current?.querySelector(
      `[data-skim-id="${firstMarkId}"]`,
    );

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    target?.scrollIntoView({
      block: "center",
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [firstMarkId, marks]);

  function blockClass(id) {
    const blockMark = marks.find(
      (mark) => mark.blockId === id && !mark.text,
    );

    return blockMark ? MARK_CLASS[blockMark.kind] : "";
  }

  function renderContent(id, content) {
    const phraseMarks = marks.filter(
      (mark) => mark.blockId === id && mark.text,
    );

    if (phraseMarks.length === 0) {
      return content;
    }

    return splitByMarks(content, phraseMarks).map((part, index) =>
      part.kind ? (
        <mark key={index} className={MARK_CLASS[part.kind]}>
          {part.text}
        </mark>
      ) : (
        part.text
      ),
    );
  }

  // "Afsnit 1", "Afsnit 2"… counts paragraphs only, not headings
  const paragraphNumbers = {};
  let count = 0;

  for (const block of text.blocks) {
    if (block.type === "paragraph") {
      count += 1;
      paragraphNumbers[block.id] = count;
    }
  }

  function renderBlock(block) {
    if (block.type === "heading") {
      return (
        <h3
          key={block.id}
          data-skim-id={block.id}
          className={classNames(styles.heading, blockClass(block.id))}
        >
          {renderContent(block.id, block.text)}
        </h3>
      );
    }

    if (preview) {
      return (
        <div key={block.id} className={styles.skeleton} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      );
    }

    return (
      <div key={block.id} className={styles.block}>
        {text.numbered && (
          <p className={styles.number}>Afsnit {paragraphNumbers[block.id]}</p>
        )}

        <p
          data-skim-id={block.id}
          className={classNames(styles.paragraph, blockClass(block.id))}
        >
          {renderContent(block.id, block.text)}
        </p>
      </div>
    );
  }

  return (
    <article
      ref={rootRef}
      className={classNames(
        styles.text,
        dimOthers && marks.length > 0 ? styles.dimmed : "",
      )}
      aria-label={text.title ?? "Tekst"}
    >
      {text.title && (
        <h2
          data-skim-id="title"
          className={classNames(styles.title, blockClass("title"))}
        >
          {renderContent("title", text.title)}
        </h2>
      )}

      {text.lead && (
        <p
          data-skim-id="lead"
          className={classNames(styles.lead, blockClass("lead"))}
        >
          {renderContent("lead", text.lead)}
        </p>
      )}

      {text.blocks.map(renderBlock)}

      {preview && (
        <p className="u-visually-hidden">
          Brødteksten vises, når du starter læsningen.
        </p>
      )}
    </article>
  );
}
