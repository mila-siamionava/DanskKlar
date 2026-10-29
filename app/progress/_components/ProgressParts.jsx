import Link from "next/link";

import styles from "./Progress.module.css";

const RING_RADIUS = 50;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

export function GoalRing({ minutes, goal, size = 112 }) {
  const share = goal ? Math.min(1, minutes / goal) : 0;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      role="img"
      aria-label={`${minutes} af ${goal} minutter`}
      className={styles.ring}
    >
      <circle className={styles.ringTrack} cx="60" cy="60" r={RING_RADIUS} />
      {share > 0 && (
        <circle
          className={styles.ringFill}
          cx="60"
          cy="60"
          r={RING_RADIUS}
          strokeDasharray={`${share * RING_LENGTH} ${RING_LENGTH}`}
          transform="rotate(-90 60 60)"
        />
      )}
      <text x="60" y="60" textAnchor="middle" className={styles.ringValue}>
        {minutes}
      </text>
      <text x="60" y="82" textAnchor="middle" className={styles.ringLabel}>
        af {goal} min
      </text>
    </svg>
  );
}

export function StatTiles({ items }) {
  return (
    <div
      className={styles.stats}
      style={{ "--stat-columns": items.length }}
    >
      {items.map((item) => (
        <div key={item.label} className={styles.stat}>
          <strong className={styles.statValue}>{item.value}</strong>
          <span className={styles.statLabel}>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export function NextStepCard({ step }) {
  return (
    <Link href={step.href} className={styles.nextStep}>
      <span className={styles.nextStepLabel}>Næste skridt</span>
      <strong className={styles.nextStepTitle}>{step.title}</strong>
      <span className={styles.nextStepDetail}>{step.detail}</span>
    </Link>
  );
}

export function WeekBars({ days }) {
  const max = Math.max(20, ...days.map((day) => day.minutes));

  const description = days
    .filter((day) => !day.isFuture)
    .map((day) => `${day.label} ${day.minutes} min`)
    .join(", ");

  return (
    <div className={styles.week} role="img" aria-label={description}>
      {days.map((day) => (
        <div key={day.key} className={styles.weekDay}>
          <span className={styles.weekValue}>
            {day.isFuture ? "" : day.minutes}
          </span>

          <span
            className={[
              styles.weekBar,
              day.isToday ? styles.weekBarToday : "",
              day.minutes === 0 ? styles.weekBarEmpty : "",
            ]
              .filter(Boolean)
              .join(" ")}
            style={{
              height: day.minutes
                ? `${Math.max(6, (day.minutes / max) * 100)}%`
                : undefined,
            }}
          />

          <span
            className={[
              styles.weekLabel,
              day.isToday ? styles.weekLabelToday : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {day.label}
          </span>
        </div>
      ))}
    </div>
  );
}

const LEVEL_CLASS = {
  Ny: styles.levelNew,
  Set: styles.levelSeen,
  Genkendt: styles.levelRecognised,
  "Kan skrive": styles.levelWritten,
  Lært: styles.levelLearned,
};

export function levelClass(level) {
  return LEVEL_CLASS[level];
}

export function LevelBar({ counts }) {
  const total = counts.reduce((sum, item) => sum + item.count, 0);

  return (
    <>
      <div
        className={styles.levelBar}
        role="img"
        aria-label={counts
          .map((item) => `${item.level} ${item.count}`)
          .join(", ")}
      >
        {total > 0 &&
          counts
            .filter((item) => item.count > 0)
            .map((item) => (
              <span
                key={item.level}
                className={levelClass(item.level)}
                style={{ flexGrow: item.count }}
              />
            ))}
      </div>

      <ul className={styles.legend}>
        {counts.map((item) => (
          <li key={item.level}>
            <span
              className={[styles.swatch, levelClass(item.level)].join(" ")}
              aria-hidden="true"
            />
            {item.level} <strong>{item.count}</strong>
          </li>
        ))}
      </ul>
    </>
  );
}

export function SkillBar({ score, label }) {
  return (
    <div className={styles.skillTrack}>
      <span
        className={[
          styles.skillFill,
          score >= 85 ? styles.skillFillDone : "",
        ]
          .filter(Boolean)
          .join(" ")}
        style={{ width: `${score ?? 0}%` }}
      />
      <span
        className={styles.skillGoal}
        aria-hidden="true"
        title={label}
      />
    </div>
  );
}

export function EmptyNote({ children }) {
  return <p className={styles.empty}>{children}</p>;
}
