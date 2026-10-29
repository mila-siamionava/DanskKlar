"use client";

import { setGoalMinutes } from "@/lib/progress/activityLog";
import {
  currentStreak,
  daySummary,
  formatDayLong,
  formatTime,
  nextStep,
  skillReadiness,
  wordList,
} from "@/lib/progress/summaries";

import {
  EmptyNote,
  GoalRing,
  NextStepCard,
  StatTiles,
} from "./ProgressParts";
import { sessionMeta, sessionScore } from "./sessionFormat";
import { useProgressData } from "./useProgressData";

import styles from "./Progress.module.css";

const GOAL_OPTIONS = [5, 10, 15, 20, 30, 45];

function goalMessage(minutes, goal) {
  if (minutes === 0) return "Du har ikke trænet endnu i dag";
  if (minutes >= goal) return "Dagens mål er nået";

  const left = goal - minutes;

  return `${left} ${left === 1 ? "minut" : "minutter"} fra dagens mål`;
}

export default function TodayPanel({ groups }) {
  const data = useProgressData();

  if (!data.isReady) return null;

  const { log, today, readingProgress, savedItems } = data;

  const day = daySummary(log, today);
  const streak = currentStreak(log, today);
  const words = wordList(log, savedItems);
  const readiness = skillReadiness(log, groups, readingProgress);

  return (
    <div className={styles.panel}>
      <section className={styles.card} aria-labelledby="today-goal">
        <div className={styles.goalRow}>
          <GoalRing minutes={day.minutes} goal={log.goalMinutes} />

          <div className={styles.goalText}>
            <span className={styles.text}>{formatDayLong(today)}</span>
            <h2 id="today-goal" className={styles.goalTitle}>
              {goalMessage(day.minutes, log.goalMinutes)}
            </h2>
            <span className={styles.text}>
              {streak} {streak === 1 ? "dag" : "dage"} i træk
            </span>

            <label className={styles.text}>
              Dagligt mål:{" "}
              <select
                className={styles.select}
                value={log.goalMinutes}
                onChange={(event) =>
                  setGoalMinutes(Number(event.target.value))
                }
              >
                {GOAL_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option} min
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </section>

      <StatTiles
        items={[
          { label: "aktiviteter", value: day.sessions.length },
          { label: "ord øvet", value: day.wordsPractised.length },
          { label: "nye ord", value: day.newWords },
        ]}
      />

      <section className={styles.card} aria-labelledby="today-activities">
        <h2 id="today-activities" className={styles.cardTitle}>
          Det har du trænet
        </h2>

        {day.sessions.length === 0 ? (
          <EmptyNote>
            Når du laver en øvelse, en læseteknik eller en tekst, kommer den
            her.
          </EmptyNote>
        ) : (
          <ul className={styles.activityList}>
            {day.sessions.map((session) => (
              <li key={session.id} className={styles.activity}>
                <span className={styles.activityTime}>
                  {formatTime(session.at)}
                </span>
                <span className={styles.activityBody}>
                  <strong className={styles.activityTitle}>
                    {session.title}
                  </strong>
                  <span className={styles.activityMeta}>
                    {sessionMeta(session)}
                  </span>
                </span>
                <span className={styles.score}>{sessionScore(session)}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className={styles.card} aria-labelledby="today-words">
        <h2 id="today-words" className={styles.cardTitle}>
          Ord, der rykkede op i dag
        </h2>

        {day.levelUps.length === 0 ? (
          <EmptyNote>
            Ingen endnu. Et ord rykker op, når du møder det på en ny måde –
            fx skriver det i stedet for kun at genkende det.
          </EmptyNote>
        ) : (
          <ul className={styles.skillList}>
            {day.levelUps.map((levelUp) => (
              <li key={levelUp.term} className={styles.skillHead}>
                <strong>{levelUp.term}</strong>
                <span className={styles.muted}>
                  {levelUp.from} → <strong>{levelUp.to}</strong>
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <NextStepCard step={nextStep({ words, readiness, today: day })} />
    </div>
  );
}
