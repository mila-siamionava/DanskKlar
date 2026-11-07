import ExerciseInstructions from "@/components/exercises/ExerciseInstructions/ExerciseInstructions";
import ExerciseTop from "@/components/exercises/ExerciseTop/ExerciseTop";

import styles from "./ExerciseShell.module.css";

export default function ExerciseShell({
  eyebrow,
  title,
  current,
  total,
  instructions,
  controls,
  backHref,
  backLabel,
  taskHelp,
  children,
}) {
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <ExerciseTop
          eyebrow={eyebrow}
          title={title}
          current={current}
          total={total}
          backHref={backHref}
          backLabel={backLabel}
          taskHelp={taskHelp}
        />

        {instructions && (
          <div className={styles.instructions}>
            <ExerciseInstructions>
              {instructions}
            </ExerciseInstructions>
          </div>
        )}

        {controls && (
          <div className={styles.controls}>
            {controls}
          </div>
        )}

        <div className={styles.exercise}>
          {children}
        </div>
      </div>
    </main>
  );
}