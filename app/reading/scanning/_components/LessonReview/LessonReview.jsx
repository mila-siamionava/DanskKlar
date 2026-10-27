"use client";

import { useEffect } from "react";

import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  MASTERY_SCORE,
  saveScanningResult,
} from "@/lib/reading/scanningProgress";

import styles from "./LessonReview.module.css";

function countCorrect(results = []) {
  return results.filter((result) => result.isCorrect).length;
}

/*
  Last step: compare the first try with the final test (test-teach-test),
  show the mistakes and suggest what to practise next.
*/
export default function LessonReview({
  lesson,
  stageResults,
  onRestart,
}) {
  const tryResults = stageResults.try?.results;
  const checkResults = stageResults.check?.results ?? [];

  const score = checkResults.length
    ? Math.round((countCorrect(checkResults) / checkResults.length) * 100)
    : 0;

  const isMastered = score >= MASTERY_SCORE;

  const practiceResults = [
    ...(stageResults.independent?.results ?? []),
    ...checkResults,
  ];

  const mistakes = practiceResults.filter((result) => !result.isCorrect);

  const bySubskill = lesson.subskills
    .map((subskill) => {
      const results = practiceResults.filter(
        (result) => result.subskill === subskill.slug,
      );

      return {
        ...subskill,
        total: results.length,
        correct: countCorrect(results),
      };
    })
    .filter((subskill) => subskill.total > 0);

  const weakSubskills = bySubskill.filter(
    (subskill) => subskill.correct < subskill.total,
  );

  useEffect(() => {
    saveScanningResult(lesson.slug, score);
  }, [lesson.slug, score]);

  return (
    <div className={styles.review}>
      <h2 className={styles.title}>Gennemgang</h2>

      <section className={styles.card}>
        <div className={styles.scoreRow}>
          <p className={styles.score}>
            {countCorrect(checkResults)} af {checkResults.length} rigtige
            <span className={styles.percent}> ({score} %)</span>
          </p>

          <Badge variant={isMastered ? "success" : "warning"} size="sm">
            {isMastered ? "Mestret" : `Målet er ${MASTERY_SCORE} %`}
          </Badge>
        </div>

        {tryResults && (
          <p className={styles.compare}>
            Prøv selv: {countCorrect(tryResults)} af {tryResults.length}
            {" → "}
            Test dig selv: {countCorrect(checkResults)} af{" "}
            {checkResults.length}
          </p>
        )}

        <p className={styles.message}>
          {isMastered
            ? "Flot! Du bruger teknikken sikkert. Prøv den nu på en anden type dokument."
            : "Du er på vej. Se dine fejl nedenfor, og tag lektionen igen."}
        </p>
      </section>

      {lesson.isMixed && bySubskill.length > 0 && (
        <section className={styles.card}>
          <h3 className={styles.sectionTitle}>Resultat pr. teknik</h3>

          <ul className={styles.subskillList}>
            {bySubskill.map((subskill) => (
              <li key={subskill.slug}>
                <span>{subskill.title}</span>
                <strong>
                  {subskill.correct} af {subskill.total}
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

        {lesson.isMixed &&
          weakSubskills.map((subskill) => (
            <Button
              key={subskill.slug}
              variant="secondary"
              href={`/reading/scanning/${subskill.slug}`}
            >
              Øv: {subskill.title}
            </Button>
          ))}

        {!lesson.isMixed && isMastered && (
          <Button variant="secondary" href="/reading/scanning/blandet">
            Blandet skanningstræning
          </Button>
        )}

        <Button variant="secondary" href="/reading/scanning">
          Tilbage til skanning
        </Button>
      </div>
    </div>
  );
}
