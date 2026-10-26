import styles from "./ProgressBar.module.css";

export default function ProgressBar({
  value = 0,
  max = 100,
  showLabel = true,
  label,
  className = "",
}) {
  const safeMax = max > 0 ? max : 1;

  const percentage = Math.min(
    100,
    Math.max(0, (value / safeMax) * 100)
  );

  return (
    <div className={`${styles.wrapper} ${className}`}>
      {showLabel && (
        <div className={styles.header}>
          <span>
            {label ?? `${value} af ${max}`}
          </span>

          <span>
            {Math.round(percentage)}%
          </span>
        </div>
      )}

      <div
        className={styles.track}
        role="progressbar"
        aria-label={label ?? "Progress"}
        aria-valuemin="0"
        aria-valuemax={max}
        aria-valuenow={value}
      >
        <div
          className={styles.fill}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}