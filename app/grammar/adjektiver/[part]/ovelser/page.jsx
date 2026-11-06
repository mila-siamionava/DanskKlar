import { notFound } from "next/navigation";
import { CircleHelp, SearchCheck, SpellCheck } from "lucide-react";

import BackLink from "@/components/navigation/BackLink/BackLink";
import HomeNavigationCard from "@/components/navigation/HomeNavigationCard/HomeNavigationCard";
import { adjectiveExercises } from "@/data/grammar/adjectiveExercises";
import {
  ADJECTIVES_PATH,
  adjectiveParts,
  exerciseHref,
  getPartBySlug,
} from "@/lib/grammar/adjectivePaths";

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

  return (
    <main className={styles.page}>
      <BackLink
        href={ADJECTIVES_PATH}
        label="Tilbage til adjektiver"
        title={part.title}
      />

      <PartTabs part={part} current="ovelser" />

      <p className={styles.intro}>
        20 spørgsmål i hver øvelse. Ord på A1–B1-niveau.
      </p>

      <nav className={styles.list} aria-label="Øvelser">
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
            description={`${exercise.questions.length} spørgsmål · ${exercise.short}`}
          />
        ))}
      </nav>
    </main>
  );
}
