import { CircleHelp, Play, SearchCheck, SpellCheck } from "lucide-react";

import BackLink from "@/components/navigation/BackLink/BackLink";
import HomeNavigationCard from "@/components/navigation/HomeNavigationCard/HomeNavigationCard";
import { adjectiveLessons } from "@/data/grammar/adjectives";
import { adjectiveExercises } from "@/data/grammar/adjectiveExercises";

import styles from "./Adjectives.module.css";

const exerciseIcons = {
  choose: CircleHelp,
  error: SearchCheck,
};

// two parts, each with its lessons (grouped like the slides) and exercises
const parts = [
  {
    id: "grundform",
    title: "Grundform (1. grad)",
    intro: "Sådan bøjer du adjektivet efter navneordet: en grøn bil, et grønt hus, de grønne huse.",
  },
  {
    id: "grad",
    title: "Gradbøjning (2. og 3. grad)",
    intro: "Sådan sammenligner du: høj, højere, højest, den højeste.",
  },
];

export default function AdjectivesPage() {
  return (
    <main className={styles.page}>
      <BackLink
        href="/grammar"
        label="Tilbage til grammatik"
        title="Adjektiver"
      />

      {parts.map((part) => {
        const lessons = adjectiveLessons.filter(
          (lesson) => lesson.part === part.id,
        );

        const sections = [...new Set(lessons.map((lesson) => lesson.section))];

        const exercises = adjectiveExercises.filter(
          (exercise) => exercise.part === part.id,
        );

        return (
          <section
            key={part.id}
            className={styles.part}
            aria-labelledby={`part-${part.id}`}
          >
            <div className={styles.partHeader}>
              <h2 id={`part-${part.id}`} className={styles.partTitle}>
                {part.title}
              </h2>

              <p className={styles.intro}>{part.intro}</p>
            </div>

            {sections.map((section) => (
              <div key={section} className={styles.lesson}>
                <h3 className={styles.heading}>{section}</h3>

                <nav className={styles.list} aria-label={section}>
                  {lessons
                    .filter((lesson) => lesson.section === section)
                    .map((lesson) => (
                      <HomeNavigationCard
                        key={lesson.id}
                        href={`/grammar/adjectives/${lesson.id}`}
                        icon={Play}
                        title={`${lessons.indexOf(lesson) + 1}. ${lesson.title}`}
                        description={lesson.short}
                      />
                    ))}
                </nav>
              </div>
            ))}

            <div className={styles.lesson}>
              <h3 className={styles.heading}>Øvelser</h3>

              <nav
                className={styles.list}
                aria-label={`Øvelser: ${part.title}`}
              >
                {exercises.map((exercise) => (
                  <HomeNavigationCard
                    key={exercise.id}
                    href={`/grammar/adjectives/${exercise.id}`}
                    icon={
                      exercise.id === "endelser"
                        ? SpellCheck
                        : exerciseIcons[exercise.type]
                    }
                    title={exercise.title}
                    description={`${exercise.questions.length} spørgsmål · ${exercise.short}`}
                  />
                ))}
              </nav>
            </div>
          </section>
        );
      })}
    </main>
  );
}
