"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

import ScoreBadge from "@/components/reading/ScoreBadge/ScoreBadge";
import { getSkimmingProgress } from "@/lib/reading/skimmingProgress";

import styles from "./SkillList.module.css";

// read as a string so the snapshot stays the same between renders
function readProgress() {
  return JSON.stringify(getSkimmingProgress());
}

function subscribe(onChange) {
  window.addEventListener("storage", onChange);

  return () => window.removeEventListener("storage", onChange);
}

function SkillContent({ skill, children }) {
  return (
    <span className={styles.content}>
      <strong className={styles.title}>{skill.title}</strong>
      <span className={styles.description}>{skill.description}</span>
      <span className={styles.level}>Niveau {skill.level}</span>
      {children}
    </span>
  );
}

export default function SkillList({ skills, upcoming }) {
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
            <li key={skill.slug}>
              <Link
                href={`/reading/skimming/${skill.slug}`}
                className={styles.card}
              >
                <SkillContent skill={skill}>
                  <ScoreBadge bestScore={progress[skill.slug]?.bestScore} />
                </SkillContent>

                <span className={styles.arrow} aria-hidden="true">
                  ›
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="upcoming-heading">
        <h2 id="upcoming-heading" className={styles.heading}>
          Kommer snart
        </h2>

        <ul className={styles.list}>
          {upcoming.map((skill) => (
            <li
              key={skill.slug}
              className={[styles.card, styles.upcoming].join(" ")}
            >
              <SkillContent skill={skill} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
