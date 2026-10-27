import Link from "next/link";

import styles from "./BackLink.module.css";

export default function BackLink({
  href,
  label = "Tilbage",
  title = "",
}) {
  return (
    <div className={styles.wrapper}>
      <Link
        href={href}
        className={styles.backLink}
        aria-label={label}
      >
        ←
      </Link>

      {title && (
        <h1 className={styles.title}>
          {title}
        </h1>
      )}
    </div>
  );
}