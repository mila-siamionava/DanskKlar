"use client";

import Link from "next/link";

import {
  currentStreak,
  daySummary,
  encounterTotals,
  formatMinutes,
  levelCounts,
  nextStep,
  skillReadiness,
  weekSummary,
  wordList,
} from "@/lib/progress/summaries";
import { ENCOUNTER_TYPES } from "@/lib/progress/wordLevels";

import {
  GoalRing,
  LevelBar,
  NextStepCard,
  SkillBar,
  StatTiles,
  WeekBars,
} from "./ProgressParts";
import { sessionScore } from "./sessionFormat";
import { useProgressData } from "./useProgressData";

import styles from "./Progress.module.css";

/*
  The main dashboard: one card per area, each linking to its own tab.
*/
export default function OverviewPanel({ groups }) {
  const data = useProgressData();

  if (!data.isReady) return null;

  const { log, today, readingProgress, savedItems } = data;

  const day = daySummary(log, today);
  const week = weekSummary(log, today);
  const weekMinutes = week.reduce((total, item) => total + item.minutes, 0);
  const readiness = skillReadiness(log, groups, readingProgress);
  const words = wordList(log, savedItems);
  const counts = levelCounts(words);
  const learned = counts.find((item) => item.level === "Lært").count;
  const totals = encounterTotals(log);

  const skillCount = readiness.reduce(
    (total, group) => total + group.skills.length,
    0,
  );

  const masteredCount = readiness.reduce(
    (total, group) => total + group.mastered,
    0,
  );

  return (
    <div className={styles.panel}>
      <NextStepCard step={nextStep({ words, readiness, today: day })} />

      <div className={styles.grid}>
        <section className={styles.card} aria-labelledby="overview-today">
          <div className={styles.cardHeader}>
            <h2 id="overview-today" className={styles.cardTitle}>
              I dag
            </h2>
            <Link href="/progress/today" className={styles.cardLink}>
              Se dagen ›
            </Link>
          </div>

          <div className={styles.goalRow}>
            <GoalRing minutes={day.minutes} goal={log.goalMinutes} />

            <StatTiles
              items={[
                { label: "aktiviteter", value: day.sessions.length },
                { label: "ord øvet", value: day.wordsPractised.length },
                { label: "ord rykket op", value: day.levelUps.length },
              ]}
            />
          </div>

          {day.sessions.length > 0 && (
            <ul className={styles.skillList}>
              {day.sessions.map((session) => (
                <li key={session.id} className={styles.skillHead}>
                  <span>{session.title}</span>
                  <strong>{sessionScore(session)}</strong>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className={styles.card} aria-labelledby="overview-week">
          <div className={styles.cardHeader}>
            <h2 id="overview-week" className={styles.cardTitle}>
              Denne uge
            </h2>
            <Link href="/progress/history" className={styles.cardLink}>
              Historik ›
            </Link>
          </div>

          <StatTiles
            items={[
              { label: "dage i træk", value: currentStreak(log, today) },
              { label: "denne uge", value: formatMinutes(weekMinutes) },
              {
                label: "dage denne uge",
                value: week.filter((item) => item.minutes > 0).length,
              },
            ]}
          />

          <WeekBars days={week} />
        </section>

        <section className={styles.card} aria-labelledby="overview-skills">
          <div className={styles.cardHeader}>
            <h2 id="overview-skills" className={styles.cardTitle}>
              Læsestrategier
            </h2>
            <Link href="/progress/skills" className={styles.cardLink}>
              Færdigheder ›
            </Link>
          </div>

          <p className={styles.text}>
            <strong>
              {masteredCount} af {skillCount}
            </strong>{" "}
            teknikker mestret · målet er 85 %
          </p>

          <ul className={styles.skillList}>
            {readiness.flatMap((group) =>
              group.skills.map((skill) => (
                <li key={skill.href} className={styles.skillRow}>
                  <div className={styles.skillHead}>
                    <span>
                      <span className={styles.muted}>{group.name} ·</span>{" "}
                      {skill.title}
                    </span>
                    <strong>
                      {skill.bestScore === null
                        ? "Ikke startet"
                        : `${skill.bestScore} %`}
                    </strong>
                  </div>
                  <SkillBar score={skill.bestScore} label="Mål: 85 %" />
                </li>
              )),
            )}
          </ul>
        </section>

        <section className={styles.card} aria-labelledby="overview-words">
          <div className={styles.cardHeader}>
            <h2 id="overview-words" className={styles.cardTitle}>
              Ordforråd
            </h2>
            <Link href="/progress/words" className={styles.cardLink}>
              Alle ord ›
            </Link>
          </div>

          <p className={styles.text}>
            <strong>
              {learned} af {words.length}
            </strong>{" "}
            ord er lært. Et ord er lært efter mange forskellige møder på
            flere dage.
          </p>

          <LevelBar counts={counts} />

          <StatTiles
            items={ENCOUNTER_TYPES.map((type) => ({
              label: type.label.toLowerCase(),
              value: totals[type.id],
            }))}
          />
        </section>
      </div>
    </div>
  );
}
