import styles from "./ExerciseProgress.module.css";

export default function ExerciseProgress({
  current,
  total,
}) {
  const progress =
    total > 0
      ? Math.min(
          100,
          (current / total) * 100
        )
      : 0;

  return (
    <div
  className={styles.progress}
  role="progressbar"
  aria-label="Fremskridt i øvelsen"
  aria-valuemin={0}
  aria-valuemax={total}
  aria-valuenow={current}
>
      <div
        className={styles.progressFill}
        style={{
          width: `${progress}%`,
        }}
      />
    </div>
  );
}