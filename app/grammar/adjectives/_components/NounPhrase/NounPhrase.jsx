import styles from "./NounPhrase.module.css";

/*
  "en grøn bil" built from parts, so each part can animate in.
  withAdjective opens the adjective slot, withEnding grows the ending.
  Letters added to a word are marked with the contrast colour.
*/
export default function NounPhrase({
  scene,
  withAdjective = true,
  withEnding = true,
  size = "large",
}) {
  const { article, noun, adjective } = scene;

  return (
    <span
      className={`${styles.phrase} ${styles[size]}`}
      lang="da"
    >
      {article && <span className={styles.word}>{article}</span>}

      <span
        className={styles.slot}
        data-open={withAdjective}
      >
        <span className={styles.slotInner}>
          <span className={styles.word}>
            {adjective.stem}

            {adjective.ending && (
              <span
                className={styles.slot}
                data-open={withEnding}
              >
                <span className={styles.slotInner}>
                  <mark className={styles.added}>
                    {adjective.ending}
                  </mark>
                </span>
              </span>
            )}
          </span>
        </span>
      </span>

      <span className={styles.word}>
        {noun.stem}

        {noun.ending && (
          <mark className={styles.added}>{noun.ending}</mark>
        )}
      </span>
    </span>
  );
}
