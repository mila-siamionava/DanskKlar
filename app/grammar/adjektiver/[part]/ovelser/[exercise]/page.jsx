import { notFound } from "next/navigation";

import { adjectiveLessons } from "@/data/grammar/adjectives";
import { adjectiveExercises } from "@/data/grammar/adjectiveExercises";
import {
  getPart,
  getPartBySlug,
  lessonHref,
  partHref,
} from "@/lib/grammar/adjectivePaths";

import GrammarQuiz from "../../../_components/GrammarQuiz/GrammarQuiz";

export function generateStaticParams() {
  return adjectiveExercises.map((exercise) => ({
    part: getPart(exercise.part).slug,
    exercise: exercise.id,
  }));
}

export const dynamicParams = false;

export default async function AdjectiveExercisePage({ params }) {
  const { part: slug, exercise: id } = await params;
  const part = getPartBySlug(slug);

  const exercise = adjectiveExercises.find(
    (item) => item.id === id && item.part === part?.id,
  );

  if (!exercise) notFound();

  // only what the quiz shows: the title and address of each lesson
  const lessonLinks = Object.fromEntries(
    adjectiveLessons.map((lesson) => [
      lesson.id,
      { title: lesson.title, href: lessonHref(lesson) },
    ]),
  );

  return (
    <GrammarQuiz
      exercise={exercise}
      lessonLinks={lessonLinks}
      backHref={partHref(part.id, "ovelser")}
      backLabel={`Tilbage til ${part.title}`}
    />
  );
}
