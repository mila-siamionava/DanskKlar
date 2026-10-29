"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

import ScoreBadge from "@/components/reading/ScoreBadge/ScoreBadge";
import { getScanningProgress } from "@/lib/reading/scanningProgress";

import styles from "./SkillList.module.css";

// read as a string so the snapshot stays the same between renders
function readProgress() {
  return JSON.stringify(getScanningProgress());
}

function subscribe(onChange) {
  window.addEventListener("storage", onChange);

  return () => window.removeEventListener("storage", onChange);
}

function SkillCard({ href, title, description, result }) {
  return (
    <li>
      <Link href={href} className={styles.card}>
        <span className={styles.content}>
          <strong className={styles.title}>{title}</strong>
          <span className={styles.description}>{description}</span>
          <ScoreBadge bestScore={result?.bestScore} />
        </span>

        <span className={styles.arrow} aria-hidden="true">
          ›
        </span>
      </Link>
    </li>
  );
}

export default function SkillList({ skills, mixed }) {
  const progress = JSON.parse(
    useSyncExternalStore(subscribe, readProgress, () => "{}"),
  );

  return (
    <>
      <section aria-labelledby="skills-heading">
        <h2 id="skills-heading" className={styles.heading}>
          Teknikker
        </h2>

        <ol className={styles.list}>
          {skills.map((skill) => (
            <SkillCard
              key={skill.slug}
              href={`/reading/scanning/${skill.slug}`}
              title={skill.title}
              description={skill.description}
              result={progress[skill.slug]}
            />
          ))}
        </ol>
      </section>

      <section aria-labelledby="mixed-heading">
        <h2 id="mixed-heading" className={styles.heading}>
          Saml det hele
        </h2>

        <ul className={styles.list}>
          <SkillCard
            href={`/reading/scanning/${mixed.slug}`}
            title={mixed.title}
            description={mixed.description}
            result={progress[mixed.slug]}
          />
        </ul>
      </section>
    </>
  );
}
