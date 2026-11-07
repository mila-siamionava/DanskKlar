import HelpText from "@/components/i18n/HelpText/HelpText";
import { helpFor } from "@/data/grammar/textHelp";

import styles from "./Fold.module.css";

/*
  A section that opens and closes: a heading you can tap,
  with its translation right under it, and the content below.
*/
export default function Fold({ title, count, open = false, children }) {
  return (
    <details className={styles.fold} open={open}>
      <summary className={styles.summary}>
        <span className={styles.titles}>
          <span className={styles.title}>
            {title}
            {count !== undefined && (
              <span className={styles.count}> · {count}</span>
            )}
          </span>

          <HelpText as="span" className={styles.help} {...helpFor(title)} />
        </span>

        <span className={styles.chevron} aria-hidden="true">
          ⌄
        </span>
      </summary>

      <div className={styles.body}>{children}</div>
    </details>
  );
}
