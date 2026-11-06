import { notFound, permanentRedirect } from "next/navigation";

import { adjectiveLessons } from "@/data/grammar/adjectives";
import { adjectiveExercises } from "@/data/grammar/adjectiveExercises";
import { exerciseHref, lessonHref } from "@/lib/grammar/adjectivePaths";

// old address /grammar/adjectives/<id> → its place under /grammar/adjektiver
export async function GET(request, { params }) {
  const { id } = await params;

  const lesson = adjectiveLessons.find((item) => item.id === id);
  if (lesson) permanentRedirect(lessonHref(lesson));

  const exercise = adjectiveExercises.find((item) => item.id === id);
  if (exercise) permanentRedirect(exerciseHref(exercise));

  notFound();
}
