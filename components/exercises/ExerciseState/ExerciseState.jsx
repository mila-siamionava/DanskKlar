import BackLink from "@/components/navigation/BackLink/BackLink";

import styles from "./ExerciseState.module.css";

export default function ExerciseState({
  eyebrow,
  title,
  message,
  actionLabel,
  actionHref,
}) {
  return (
    <div className={styles.state}>
      {actionHref && (
        <div className={styles.back}>
          <BackLink
            href={actionHref}
            label={actionLabel || "Tilbage"}
          />
        </div>
      )}

      <div className={styles.content}>
        {eyebrow && (
          <span className={styles.eyebrow}>
            {eyebrow}
          </span>
        )}

        <h1 className={styles.title}>
          {title}
        </h1>

        {message && (
          <p className={styles.message}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}