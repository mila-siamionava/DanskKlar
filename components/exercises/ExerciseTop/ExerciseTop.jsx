import BackLink from "@/components/navigation/BackLink/BackLink";
import ExerciseProgress from "@/components/exercises/ExerciseProgress/ExerciseProgress";

import styles from "./ExerciseTop.module.css";

// Same header as the other pages: back arrow and title, then the task
export default function ExerciseTop({
  eyebrow,
  title,
  current,
  total,
}) {
  return (
    <div className={styles.top}>
      <div className={styles.topRow}>
        <BackLink
          href="/review/train"
          label="Back to training"
          title={eyebrow}
        />

        {current && total ? (
          <span
            className={styles.counter}
            aria-label={`Question ${current} of ${total}`}
          >
            {current} / {total}
          </span>
        ) : null}
      </div>

      {title && (
        <p className={styles.task}>
          {title}
        </p>
      )}

      <ExerciseProgress
        current={current}
        total={total}
      />
    </div>
  );
}
