import NounPhrase from "../NounPhrase/NounPhrase";

import styles from "./KeyRules.module.css";

/*
  The one thing to remember from a lesson, shown first:
  each row is a case, its ending and the finished example.
  Built from lesson.summary and the phrases of the scenes.
*/
export default function KeyRules({ lesson }) {
  const byId = Object.fromEntries(
    lesson.scenes.map((scene) => [scene.id, scene]),
  );

  return (
    <section className={styles.box} aria-labelledby="key-rules-heading">
      <h3 id="key-rules-heading" className={styles.heading}>
        Husk
      </h3>

      <ul className={styles.rows}>
        {lesson.summary.map((row) => (
          <li key={row.group} className={styles.row}>
            <span className={styles.group}>{row.group}</span>

            <span className={styles.ending}>{row.ending}</span>

            <span className={styles.examples}>
              {row.examples.map((id) => (
                <NounPhrase
                  key={id}
                  phrase={byId[id].phrase}
                  size="small"
                />
              ))}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
