import styles from "./ExerciseHeader.module.css";

export default function ExerciseHeader({
  eyebrow,
  title,
  current,
  total,
}) {
  return (
    <header className={styles.header}>
      {eyebrow && (
        <span className={styles.eyebrow}>
          {eyebrow}
        </span>
      )}

      <div className={styles.titleRow}>
        <h1 className={styles.title}>
          {title}
        </h1>

        {current && total && (
          <span
            className={styles.counter}
            aria-label={`Spørgsmål ${current} af ${total}`}
          >
            {current} / {total}
          </span>
        )}
      </div>
    </header>
  );
}