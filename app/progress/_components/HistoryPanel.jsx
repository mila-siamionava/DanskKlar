"use client";

import { useState } from "react";

import {
  currentStreak,
  daySummary,
  formatDayLong,
  formatMinutes,
  formatMonth,
  formatTime,
  monthCells,
  monthTotals,
  parseDay,
  WEEKDAYS,
} from "@/lib/progress/summaries";

import { EmptyNote, StatTiles } from "./ProgressParts";
import { sessionMeta, sessionScore } from "./sessionFormat";
import { useProgressData } from "./useProgressData";

import styles from "./Progress.module.css";
import calendar from "./History.module.css";

function shadeClass(minutes) {
  if (minutes === 0) return calendar.shade0;
  if (minutes < 10) return calendar.shade1;
  if (minutes < 20) return calendar.shade2;

  return calendar.shade3;
}

function DayDetail({ summary }) {
  return (
    <section
      className={styles.card}
      aria-labelledby="history-day"
      aria-live="polite"
    >
      <div className={styles.cardHeader}>
        <h2 id="history-day" className={calendar.dayTitle}>
          {formatDayLong(summary.key)}
        </h2>
        {summary.minutes > 0 && (
          <strong>{formatMinutes(summary.minutes)}</strong>
        )}
      </div>

      {summary.sessions.length === 0 ? (
        <EmptyNote>
          Ingen træning denne dag. Det er helt i orden – en pause hører med.
        </EmptyNote>
      ) : (
        <>
          <ul className={styles.activityList}>
            {summary.sessions.map((session) => (
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

          {summary.wordsPractised.length > 0 && (
            <div className={calendar.words}>
              <h3 className={calendar.wordsTitle}>Ord øvet denne dag</h3>
              <ul className={calendar.chips}>
                {summary.wordsPractised.map((term) => (
                  <li key={term}>{term}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default function HistoryPanel() {
  const data = useProgressData();

  // null until the learner picks: then follow today and the current month
  const [picked, setPicked] = useState(null);
  const [shownMonth, setShownMonth] = useState(null);

  if (!data.isReady) return null;

  const { log, today } = data;

  const todayDate = parseDay(today);
  const selected = picked ?? today;
  const { year, month } = shownMonth ?? {
    year: todayDate.getFullYear(),
    month: todayDate.getMonth(),
  };

  const cells = monthCells(log, year, month, today);
  const totals = monthTotals(log, year, month);

  const isCurrentMonth =
    year === todayDate.getFullYear() && month === todayDate.getMonth();

  function moveMonth(step) {
    const date = new Date(year, month + step, 1);

    setShownMonth({ year: date.getFullYear(), month: date.getMonth() });
  }

  return (
    <div className={styles.panel}>
      <StatTiles
        items={[
          { label: "dage i træk", value: currentStreak(log, today) },
          { label: "træningsdage", value: totals.days },
          { label: "i alt", value: formatMinutes(totals.minutes) },
        ]}
      />

      <div className={calendar.layout}>
        <section className={styles.card} aria-labelledby="history-month">
          <div className={calendar.monthHeader}>
            <button
              type="button"
              className={calendar.monthButton}
              aria-label="Forrige måned"
              onClick={() => moveMonth(-1)}
            >
              ‹
            </button>

            <h2 id="history-month" className={styles.cardTitle}>
              {formatMonth(year, month)}
            </h2>

            <button
              type="button"
              className={calendar.monthButton}
              aria-label="Næste måned"
              disabled={isCurrentMonth}
              onClick={() => moveMonth(1)}
            >
              ›
            </button>
          </div>

          <div className={calendar.weekdays} aria-hidden="true">
            {WEEKDAYS.map((label) => (
              <span key={label}>{label.charAt(0)}</span>
            ))}
          </div>

          <div className={calendar.grid}>
            {cells.map((cell) =>
              cell.blank ? (
                <span key={cell.key} />
              ) : (
                <button
                  key={cell.key}
                  type="button"
                  className={[
                    calendar.day,
                    cell.isFuture ? calendar.future : shadeClass(cell.minutes),
                    cell.isToday ? calendar.today : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-label={`${formatDayLong(cell.key)}${
                    cell.isFuture
                      ? ""
                      : cell.minutes
                        ? `, ${cell.minutes} minutter`
                        : ", ingen træning"
                  }`}
                  aria-pressed={cell.key === selected}
                  disabled={cell.isFuture}
                  onClick={() => setPicked(cell.key)}
                >
                  {cell.day}
                </button>
              ),
            )}
          </div>

          <div className={calendar.scale} aria-hidden="true">
            <span>Mindre</span>
            <span className={[calendar.swatch, calendar.shade0].join(" ")} />
            <span className={[calendar.swatch, calendar.shade1].join(" ")} />
            <span className={[calendar.swatch, calendar.shade2].join(" ")} />
            <span className={[calendar.swatch, calendar.shade3].join(" ")} />
            <span>Mere</span>
          </div>
        </section>

        <DayDetail summary={daySummary(log, selected)} />
      </div>
    </div>
  );
}
