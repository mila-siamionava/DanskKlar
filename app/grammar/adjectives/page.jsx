import { CircleHelp, Play, SearchCheck } from "lucide-react";

import BackLink from "@/components/navigation/BackLink/BackLink";
import HomeNavigationCard from "@/components/navigation/HomeNavigationCard/HomeNavigationCard";
import { adjectiveLessons } from "@/data/grammar/adjectives";
import { adjectiveExercises } from "@/data/grammar/adjectiveExercises";

import styles from "./Adjectives.module.css";

const exerciseIcons = {
  "vaelg-formen": CircleHelp,
  "find-fejlen": SearchCheck,
};

export default function AdjectivesPage() {
  return (
    <main className={styles.page}>
      <BackLink
        href="/grammar"
        label="Tilbage til grammatik"
        title="Adjektiver"
      />

      <section
        className={styles.lesson}
        aria-labelledby="lessons-heading"
      >
        <h2 id="lessons-heading" className={styles.heading}>
          Forklaringer
        </h2>

        <nav className={styles.list} aria-label="Forklaringer">
          {adjectiveLessons.map((lesson, index) => (
            <HomeNavigationCard
              key={lesson.id}
              href={`/grammar/adjectives/${lesson.id}`}
              icon={Play}
              title={`${index + 1}. ${lesson.title}`}
              description={lesson.short}
            />
          ))}
        </nav>
      </section>

      <section
        className={styles.lesson}
        aria-labelledby="exercises-heading"
      >
        <h2 id="exercises-heading" className={styles.heading}>
          Øvelser
        </h2>

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
