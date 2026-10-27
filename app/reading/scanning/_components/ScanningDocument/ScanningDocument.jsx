"use client";

import { useEffect, useRef } from "react";

import styles from "./ScanningDocument.module.css";

function classNames(...names) {
  return names.filter(Boolean).join(" ");
}

export default function ScanningDocument({
  document,
  highlight = [],
  dimOthers = false,
}) {
  const rootRef = useRef(null);

  const highlighted = new Set(highlight);
  const firstHighlight = highlight[0] ?? null;

  // bring the evidence into view, inside whichever area scrolls
  useEffect(() => {
    if (!firstHighlight) return;

    const target = rootRef.current?.querySelector(
      `[data-scan-id="${firstHighlight}"]`,
    );

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    target?.scrollIntoView({
      block: "center",
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [firstHighlight]);

  function stateClass(id) {
    return highlighted.has(id) ? styles.highlighted : "";
  }

  function renderBlock(block) {
    if (block.type === "heading") {
      return (
        <h3
          key={block.id}
          data-scan-id={block.id}
          className={classNames(styles.heading, stateClass(block.id))}
        >
          {block.text}
        </h3>
      );
    }

    if (block.type === "notice") {
      return (
        <p
          key={block.id}
          data-scan-id={block.id}
          className={classNames(styles.notice, stateClass(block.id))}
        >
          {block.text}
        </p>
      );
    }

    if (block.type === "list") {
      return (
        <ul
          key={block.id}
          data-scan-id={block.id}
          className={classNames(styles.list, stateClass(block.id))}
        >
          {block.items.map((item) => (
            <li
              key={item.id}
              data-scan-id={item.id}
              className={stateClass(item.id)}
            >
              {item.text}
            </li>
          ))}
        </ul>
      );
    }

    if (block.type === "table") {
      return (
        <div
          key={block.id}
          data-scan-id={block.id}
          className={classNames(
            styles.tableWrapper,
            stateClass(block.id),
          )}
        >
          <table className={styles.table}>
            <caption>{block.caption}</caption>

            <thead>
              <tr>
                {block.columns.map((column) => (
                  <th key={column} scope="col">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {block.rows.map((row) => (
                <tr
                  key={row.id}
                  data-scan-id={row.id}
                  className={stateClass(row.id)}
                >
                  {row.cells.map((cell, index) =>
                    index === 0 ? (
                      <th key={index} scope="row">
                        {cell}
                      </th>
                    ) : (
                      <td key={index}>{cell}</td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    return (
      <p
        key={block.id}
        data-scan-id={block.id}
        className={classNames(styles.paragraph, stateClass(block.id))}
      >
        {block.text}
      </p>
    );
  }

  return (
    <article
      ref={rootRef}
      className={classNames(
        styles.document,
        dimOthers && highlight.length > 0 ? styles.dimmed : "",
      )}
      aria-label={document.title}
    >
      <h2 className={styles.title}>{document.title}</h2>

      {document.blocks.map(renderBlock)}
    </article>
  );
}
