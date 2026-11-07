import BackLink from "@/components/navigation/BackLink/BackLink";
import ExerciseProgress from "@/components/exercises/ExerciseProgress/ExerciseProgress";

import styles from "./ExerciseTop.module.css";

// Same header as the other pages: back arrow and title, then the task
export default function ExerciseTop({
  eyebrow,
  title,
  current,
  total,
  backHref = "/review/train",
  backLabel = "Tilbage til træning",
  taskHelp,
}) {
  return (
    <div className={styles.top}>
      <div className={styles.topRow}>
        <BackLink
          href={backHref}
          label={backLabel}
          title={eyebrow}
        />

        {current && total ? (
          <span
            className={styles.counter}
            aria-label={`Spørgsmål ${current} af ${total}`}
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

      {/* the task in the learner's help language, right under the Danish */}
      {taskHelp}

      <ExerciseProgress
        current={current}
        total={total}
      />
    </div>
  );
}
