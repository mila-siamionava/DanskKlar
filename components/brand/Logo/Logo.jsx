import styles from "./Logo.module.css";

/*
  Open book: a page with text lines on the left, Dannebrog on the right.
  Colours come from the --color-logo-* and --color-flag tokens,
  so it follows light and dark mode.
*/
export function BookMark({ className = "" }) {
  return (
    <svg
      viewBox="0 0 60 50"
      className={[styles.mark, className].filter(Boolean).join(" ")}
      aria-hidden="true"
      focusable="false"
    >
      <g className={styles.lines} strokeWidth="2.6">
        <path d="M30 3v6" />
        <path d="M19 6l3 5" />
        <path d="M41 6l-3 5" />
      </g>

      <path
        className={styles.cover}
        d="M4 18v26c9-2 18-1 26 4 8-5 17-6 26-4V18"
      />

      <path
        className={styles.page}
        d="M8 15c8-1 15 1 21 5v25c-6-4-13-5-21-4z"
        strokeWidth="1.2"
      />

      <path
        className={styles.flag}
        d="M52 15c-8-1-15 1-21 5v25c6-4 13-5 21-4z"
      />
      <path className={styles.cross} d="M38 17.6v24.6" strokeWidth="3.6" />
      <path
        className={styles.cross}
        d="M31 30.2c7-2.6 14-3.4 21-2.6"
        strokeWidth="3.6"
      />

      <g className={styles.lines} strokeWidth="2.2">
        <path d="M12 22c5-.4 9 .6 13 2.4" />
        <path d="M12 28c5-.4 9 .6 13 2.4" />
        <path d="M12 34c5-.4 9 .6 13 2.4" />
      </g>
    </svg>
  );
}

// Book and name side by side, for the top of each page
export default function Logo({ className = "" }) {
  return (
    <span className={[styles.logo, className].filter(Boolean).join(" ")}>
      <BookMark />
      <span className={styles.name}>DanskKlar</span>
    </span>
  );
}
