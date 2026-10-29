"use client";

import Link from "next/link";

import Badge from "@/components/ui/Badge/Badge";
import { MASTERY_SCORE } from "@/lib/reading/progressStore";
import { skillReadiness } from "@/lib/progress/summaries";

import { SkillBar } from "./ProgressParts";
import { useProgressData } from "./useProgressData";

import styles from "./Progress.module.css";

function SkillBadge({ skill }) {
  if (skill.bestScore === null) {
    return (
      <Badge variant="neutral" size="sm">
        Ikke startet
      </Badge>
    );
  }

  if (skill.isMastered) {
    return (
      <Badge variant="success" size="sm">
        Mestret · {skill.bestScore} %
      </Badge>
    );
  }

  return (
    <Badge variant="warning" size="sm">
      Bedste: {skill.bestScore} %
    </Badge>
  );
}

export default function SkillsPanel({ groups, upcoming }) {
  const data = useProgressData();

  if (!data.isReady) return null;

  const readiness = skillReadiness(data.log, groups, data.readingProgress);

  const total = readiness.reduce(
    (sum, group) => sum + group.skills.length,
    0,
  );

  const mastered = readiness.reduce((sum, group) => sum + group.mastered, 0);

  const next = readiness
    .flatMap((group) => group.skills)
    .find((skill) => !skill.isMastered);

  return (
    <div className={styles.panel}>
      <section className={styles.card} aria-labelledby="skills-total">
        <h2 id="skills-total" className={styles.cardTitle}>
          {mastered} af {total} læseteknikker mestret
        </h2>

        <p className={styles.text}>
          Mestret betyder mindst {MASTERY_SCORE} % i »Test dig selv«.
          {next && (
            <>
              {" "}
              Næste: <Link href={next.href}>{next.title}</Link>.
            </>
          )}
        </p>
      </section>

      {readiness.map((group) => (
        <section
          key={group.id}
          className={styles.card}
          aria-labelledby={`skills-${group.id}`}
        >
          <div className={styles.cardHeader}>
            <h2 id={`skills-${group.id}`} className={styles.cardTitle}>
              {group.name}
            </h2>
            <span className={styles.text}>
              {group.mastered} af {group.skills.length} mestret
            </span>
          </div>

          <ul className={styles.skillList}>
            {group.skills.map((skill) => (
              <li key={skill.slug} className={styles.skillRow}>
                <div className={styles.skillHead}>
                  <Link href={skill.href}>{skill.title}</Link>
                  <SkillBadge skill={skill} />
                </div>

                <SkillBar score={skill.bestScore} label="Mål: 85 %" />

                <div className={styles.skillHead}>
                  <span className={styles.muted}>
                    {skill.texts
                      ? `${skill.texts} tekster øvet`
                      : "Ikke øvet endnu"}
                  </span>
                  {skill.firstScore !== null &&
                    skill.firstScore !== skill.bestScore && (
                      <span className={styles.muted}>
                        Første gang {skill.firstScore} % → nu{" "}
                        {skill.bestScore} %
                      </span>
                    )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}

      {upcoming.length > 0 && (
        <section className={styles.card} aria-labelledby="skills-upcoming">
          <h2 id="skills-upcoming" className={styles.cardTitle}>
            Kommer snart
          </h2>
          <p className={styles.text}>
            Skimming: {upcoming.map((skill) => skill.title).join(" · ")}
          </p>
        </section>
      )}
    </div>
  );
}
