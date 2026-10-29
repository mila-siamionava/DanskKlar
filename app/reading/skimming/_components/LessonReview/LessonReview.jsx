"use client";

import { useEffect } from "react";

import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  MASTERY_SCORE,
  saveSkimmingResult,
} from "@/lib/reading/skimmingProgress";

import { formatSeconds } from "../TextStage/TextStage";

import styles from "./LessonReview.module.css";

function sumPoints(results = []) {
  return results.reduce(
    (total, result) => ({
      points: total.points + result.points,
      max: total.max + result.maxPoints,
    }),
    { points: 0, max: 0 },
  );
}

// one entry per text: its questions share the reading time
function readingTimes(results = []) {
  const seen = new Set();

  return results.filter((result) => {
    if (result.readSeconds === null || seen.has(result.textSlug)) {
      return false;
    }

    seen.add(result.textSlug);
    return true;
  });
}

/*
  Last step: the test score, practice → test,
  reading time against the target and the mistakes.
*/
export default function LessonReview({ lesson, stageResults, onRestart }) {
  const practiceResults = stageResults.practice?.results ?? [];
  const checkResults = stageResults.check?.results ?? [];

  const practice = sumPoints(practiceResults);
  const check = sumPoints(checkResults);

  const score = check.max
    ? Math.round((check.points / check.max) * 100)
    : 0;

  const isMastered = score >= MASTERY_SCORE;

  const times = readingTimes([...practiceResults, ...checkResults]);
  const onTarget = times.filter(
    (result) => result.readSeconds <= result.targetSeconds,
  ).length;

  const mistakes = [...practiceResults, ...checkResults].filter(
    (result) => !result.isCorrect,
  );

  useEffect(() => {
    saveSkimmingResult(lesson.slug, score);
  }, [lesson.slug, score]);

  return (
    <div className={styles.review}>
      <h2 className={styles.title}>Gennemgang</h2>

      <section className={styles.card}>
        <div className={styles.scoreRow}>
          <p className={styles.score}>
            {check.points} af {check.max} point
            <span className={styles.percent}> ({score} %)</span>
          </p>

          <Badge variant={isMastered ? "success" : "warning"} size="sm">
            {isMastered ? "Mestret" : `Målet er ${MASTERY_SCORE} %`}
          </Badge>
        </div>

        {practice.max > 0 && (
          <p className={styles.compare}>
            Øv med hjælp: {practice.points} af {practice.max}
            {" → "}
            Test dig selv: {check.points} af {check.max}
          </p>
        )}

        <p className={styles.message}>
          {isMastered
            ? "Flot! Du får overblik over teksten uden at fare vild i detaljerne."
            : "Du er på vej. Se dine fejl nedenfor, og tag lektionen igen."}
        </p>
      </section>

      {times.length > 0 && (
        <section className={styles.card}>
          <h3 className={styles.sectionTitle}>Læsetid</h3>

          <p>
            Du skimmede {onTarget} af {times.length} tekster inden for
            målet. Tiden tæller ikke med i resultatet.
          </p>

          <ul className={styles.subskillList}>
            {times.map((result, index) => (
              <li key={result.textSlug}>
                <span>{result.textTitle ?? `Tekst ${index + 1}`}</span>
                <strong>
                  {formatSeconds(result.readSeconds)} / ca.{" "}
                  {result.targetSeconds} sek.
                </strong>
              </li>
            ))}
          </ul>
        </section>
      )}

      {mistakes.length > 0 && (
        <section className={styles.card}>
          <h3 className={styles.sectionTitle}>Dine fejl</h3>

          <ul className={styles.mistakeList}>
            {mistakes.map((mistake) => (
              <li key={mistake.questionId}>
                <p className={styles.mistakePrompt}>{mistake.prompt}</p>
                <p>Dit svar: {mistake.givenAnswer}</p>
                <p>Rigtigt svar: {mistake.correctAnswer}</p>
                <p className={styles.explanation}>{mistake.explanation}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className={styles.actions}>
        <Button onClick={onRestart}>Tag lektionen igen</Button>

        <Button variant="secondary" href="/reading/skimming">
          Tilbage til skimming
        </Button>
      </div>
    </div>
  );
}
