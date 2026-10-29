"use client";

import { useState } from "react";

import { levelCounts, wordList } from "@/lib/progress/summaries";
import {
  ENCOUNTER_TYPES,
  LEARNED_RULE,
  learnedChecks,
  LEVELS,
  nextStepForWord,
} from "@/lib/progress/wordLevels";

import { EmptyNote, LevelBar, levelClass } from "./ProgressParts";
import { useProgressData } from "./useProgressData";

import styles from "./Progress.module.css";
import words from "./Words.module.css";

const STRIP_LENGTH = 15;

// levels with a dark background get light text
const DARK_LEVELS = new Set(["Kan skrive", "Lært"]);

const TYPE_CLASS = {
  set: words.typeSeen,
  gen: words.typeRecognised,
  skr: words.typeWritten,
  bru: words.typeUsed,
};

// one square per meeting, coloured by how the word was met
function EncounterStrip({ stats }) {
  const squares = stats
    ? ENCOUNTER_TYPES.flatMap((type) =>
        Array(stats.counts[type.id]).fill(type.id),
      ).slice(0, STRIP_LENGTH)
    : [];

  const description = stats
    ? ENCOUNTER_TYPES.map(
        (type) => `${type.label} ${stats.counts[type.id]}`,
      ).join(", ")
    : "Ikke mødt endnu";

  return (
    <span className={words.strip} role="img" aria-label={description}>
      {Array.from({ length: STRIP_LENGTH }, (_, index) => (
        <span
          key={index}
          className={[
            words.square,
            TYPE_CLASS[squares[index]] ?? "",
            index === LEARNED_RULE.encounters - 1 ? words.goal : "",
          ]
            .filter(Boolean)
            .join(" ")}
        />
      ))}
    </span>
  );
}

function WordDetail({ word }) {
  return (
    <div className={words.detail}>
      <div className={words.counts}>
        {ENCOUNTER_TYPES.map((type) => (
          <div key={type.id} className={words.count}>
            <strong>{word.stats?.counts[type.id] ?? 0}</strong>
            <span>{type.label.toLowerCase()}</span>
          </div>
        ))}
      </div>

      <ul className={words.checks}>
        {learnedChecks(word.stats).map((check) => (
          <li key={check.id}>
            <span
              className={[words.check, check.ok ? words.checkOk : ""].join(
                " ",
              )}
              aria-label={check.ok ? "Opfyldt" : "Ikke endnu"}
            >
              {check.ok ? "✓" : "–"}
            </span>
            {check.text}
          </li>
        ))}
      </ul>

      <p className={words.next}>
        <strong>Næste:</strong> {nextStepForWord(word.stats)}
      </p>
    </div>
  );
}

export default function WordsPanel() {
  const data = useProgressData();

  const [filter, setFilter] = useState("Alle");
  const [openKey, setOpenKey] = useState(null);

  if (!data.isReady) return null;

  const all = wordList(data.log, data.savedItems);
  const counts = levelCounts(all);
  const learned = counts.find((item) => item.level === "Lært").count;

  const shown =
    filter === "Alle" ? all : all.filter((word) => word.level === filter);

  return (
    <div className={styles.panel}>
      <section className={styles.card} aria-labelledby="words-levels">
        <h2 id="words-levels" className={styles.cardTitle}>
          {learned} af {all.length} ord er lært
        </h2>

        <LevelBar counts={counts} />

        <p className={styles.text}>
          Et ord er lært, når du har mødt det mindst{" "}
          {LEARNED_RULE.encounters} gange, skrevet eller brugt det rigtigt{" "}
          {LEARNED_RULE.written} gange og svaret rigtigt på{" "}
          {LEARNED_RULE.days} forskellige dage.
        </p>
      </section>

      <div className={words.filters} role="group" aria-label="Vis niveau">
        {["Alle", ...LEVELS].map((level) => (
          <button
            key={level}
            type="button"
            className={words.filter}
            aria-pressed={filter === level}
            onClick={() => setFilter(level)}
          >
            {level !== "Alle" && (
              <span
                className={[styles.swatch, levelClass(level)].join(" ")}
                aria-hidden="true"
              />
            )}
            {level}
          </button>
        ))}
      </div>

      <ul className={words.legend} aria-label="Typer af møder">
        {ENCOUNTER_TYPES.map((type) => (
          <li key={type.id}>
            <span
              className={[words.square, TYPE_CLASS[type.id]].join(" ")}
              aria-hidden="true"
            />
            {type.label}
          </li>
        ))}
        <li>· linjen = {LEARNED_RULE.encounters} møder</li>
      </ul>

      {shown.length === 0 ? (
        <EmptyNote>
          {all.length === 0
            ? "Du har ingen ord endnu. Gem ord fra teksterne, eller træn dem under »Træn«."
            : "Ingen ord på dette niveau lige nu."}
        </EmptyNote>
      ) : (
        <ul className={words.list}>
          {shown.map((word) => {
            const isOpen = openKey === word.key;
            const days = word.stats?.days.length ?? 0;

            return (
              <li key={word.key} className={words.item}>
                <button
                  type="button"
                  className={words.row}
                  aria-expanded={isOpen}
                  onClick={() => setOpenKey(isOpen ? null : word.key)}
                >
                  <span className={words.rowHead}>
                    <strong className={words.term}>{word.term}</strong>
                    <span
                      className={[
                        words.level,
                        levelClass(word.level),
                        DARK_LEVELS.has(word.level) ? words.levelDark : "",
                      ].join(" ")}
                    >
                      {word.level}
                    </span>
                  </span>

                  <EncounterStrip stats={word.stats} />

                  <span className={styles.text}>
                    {word.encounters} møder · {days}{" "}
                    {days === 1 ? "dag" : "dage"}
                  </span>
                </button>

                {isOpen && <WordDetail word={word} />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
