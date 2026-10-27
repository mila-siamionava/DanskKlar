import Link from "next/link";
import Image from "next/image";

import Badge from "@/components/ui/Badge/Badge";

import styles from "./ReadingCard.module.css";

export default function ReadingCard({
  title,
  level = "PD3",
  topic,
  vocabularyHref,
  conjunctionsHref,
  imageSrc,
}) {
  const primaryHref =
    vocabularyHref ||
    conjunctionsHref;

  return (
    <article className={styles.card}>
      {primaryHref && (
        <Link
          href={primaryHref}
          className={styles.cardLink}
          aria-label={`Åbn ${title}`}
        />
      )}

      <div className={styles.illustration}>
        {imageSrc && (
          <Image
            src={imageSrc}
            alt=""
            fill
            sizes="80px"
          />
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.info}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>
              {title}
            </h2>

            <Badge>{level}</Badge>

            {topic && (
              <span className={styles.topic}>
                {topic}
              </span>
            )}
          </div>
        </div>

        <div className={styles.actions}>
          {vocabularyHref && (
            <Link
              href={vocabularyHref}
              className={`${styles.action} ${styles.primaryAction}`}
            >
              Ordforråd
            </Link>
          )}

          {conjunctionsHref && (
            <Link
              href={conjunctionsHref}
              className={`${styles.action} ${styles.secondaryAction}`}
            >
            Bindeord
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}