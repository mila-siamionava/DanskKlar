import { notFound } from "next/navigation";
import { CircleHelp, SearchCheck, SpellCheck } from "lucide-react";

import BackLink from "@/components/navigation/BackLink/BackLink";
import HomeNavigationCard from "@/components/navigation/HomeNavigationCard/HomeNavigationCard";
import { adjectiveLessons } from "@/data/grammar/adjectives";
import { adjectiveExercises } from "@/data/grammar/adjectiveExercises";
import { ruleExercises } from "@/data/grammar/ruleExercises";
import {
  ADJECTIVES_PATH,
  adjectiveParts,
  exerciseHref,
  getPartBySlug,
} from "@/lib/grammar/adjectivePaths";

import LessonList from "../../_components/LessonList/LessonList";
import PartTabs from "../../_components/PartTabs/PartTabs";

import styles from "../../Adjectives.module.css";

const typeIcons = {
  choose: CircleHelp,
  error: SearchCheck,
};

export function generateStaticParams() {
  return adjectiveParts.map((part) => ({ part: part.slug }));
}

export const dynamicParams = false;

export default async function AdjectiveExercisesPage({ params }) {
  const { part: slug } = await params;
  const part = getPartBySlug(slug);

  if (!part) notFound();

  const exercises = adjectiveExercises.filter(
    (exercise) => exercise.part === part.id,
  );

  // lessons that have their own practice exercise, in lesson order
  const ruleOf = Object.fromEntries(
    ruleExercises.map((exercise) => [exercise.id, exercise]),
  );

  const lessons = adjectiveLessons.filter(
    (lesson) => lesson.part === part.id && ruleOf[lesson.id],
  );

  return (
    <main className={styles.page}>
      <BackLink
        href={ADJECTIVES_PATH}
        label="Tilbage til adjektiver"
        title={part.title}
      />

      <PartTabs part={part} current="ovelser" />

      <p className={styles.intro}>
        20 opgaver i hver øvelse. Ord på A1–B1-niveau.
      </p>

      <section className={styles.lesson} aria-labelledby="rule-heading">
        <h2 id="rule-heading" className={styles.heading}>
          Øv én regel ad gangen
        </h2>

        <nav aria-label="Øv én regel ad gangen">
          <LessonList
            lessons={lessons}
            numberOf={(lesson) => lessons.indexOf(lesson) + 1}
            hrefOf={(lesson) => exerciseHref(ruleOf[lesson.id])}
            detailOf={() => "20 opgaver"}
          />
        </nav>
      </section>

      <section className={styles.lesson} aria-labelledby="mixed-heading">
        <h2 id="mixed-heading" className={styles.heading}>
          Blandede øvelser
        </h2>

        <nav className={styles.list} aria-label="Blandede øvelser">
          {exercises.map((exercise) => (
            <HomeNavigationCard
              key={exercise.id}
              href={exerciseHref(exercise)}
              icon={
                exercise.id === "endelser"
                  ? SpellCheck
                  : typeIcons[exercise.type]
              }
              title={exercise.title}
              description={`${exercise.questions.length} opgaver · ${exercise.short}`}
            />
          ))}
        </nav>
      </section>
    </main>
  );
}
