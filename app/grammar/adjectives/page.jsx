import { CircleHelp, Play, SearchCheck, SpellCheck } from "lucide-react";

import BackLink from "@/components/navigation/BackLink/BackLink";
import HomeNavigationCard from "@/components/navigation/HomeNavigationCard/HomeNavigationCard";
import { adjectiveLessons } from "@/data/grammar/adjectives";
import { adjectiveExercises } from "@/data/grammar/adjectiveExercises";

import styles from "./Adjectives.module.css";

const exerciseIcons = {
  "vaelg-formen": CircleHelp,
  endelser: SpellCheck,
  "find-fejlen": SearchCheck,
};

// lessons are grouped like the teaching slides, in this order
const sections = [...new Set(adjectiveLessons.map((lesson) => lesson.section))];

export default function AdjectivesPage() {
  return (
    <main className={styles.page}>
      <BackLink
        href="/grammar"
        label="Tilbage til grammatik"
        title="Adjektiver"
      />

      {sections.map((section, sectionIndex) => (
        <section
          key={section}
          className={styles.lesson}
          aria-labelledby={`section-${sectionIndex}`}
        >
          <h2 id={`section-${sectionIndex}`} className={styles.heading}>
            {section}
          </h2>

          <nav className={styles.list} aria-label={section}>
            {adjectiveLessons
              .filter((lesson) => lesson.section === section)
              .map((lesson) => (
                <HomeNavigationCard
                  key={lesson.id}
                  href={`/grammar/adjectives/${lesson.id}`}
                  icon={Play}
                  title={`${adjectiveLessons.indexOf(lesson) + 1}. ${lesson.title}`}
                  description={lesson.short}
                />
              ))}
          </nav>
        </section>
      ))}

      <section
        className={styles.lesson}
        aria-labelledby="exercises-heading"
      >
        <h2 id="exercises-heading" className={styles.heading}>
          Øvelser
        </h2>

        <p className={styles.intro}>
          Alle øvelser handler om grundformen (1. grad). Ord på A1–B1-niveau.
        </p>

        <nav className={styles.list} aria-label="Øvelser">
          {adjectiveExercises.map((exercise) => (
            <HomeNavigationCard
              key={exercise.id}
              href={`/grammar/adjectives/${exercise.id}`}
              icon={exerciseIcons[exercise.id]}
              title={exercise.title}
              description={`${exercise.questions.length} spørgsmål · ${exercise.short}`}
            />
          ))}
        </nav>
      </section>
    </main>
  );
}
