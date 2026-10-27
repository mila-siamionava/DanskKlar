import { notFound } from "next/navigation";

import BackLink from "@/components/navigation/BackLink/BackLink";

import GapExercise from "@/components/exercises/GapExercise/GapExercise";
import Button from "@/components/ui/Button/Button";
import Badge from "@/components/ui/Badge/Badge";

import { getExercise } from "@/lib/exercises/getExercise";

import styles from "./ExercisePage.module.css";
import { canAccessResource } from "@/lib/access/canAccessResource";
import { getCurrentAccess } from "@/lib/access/getCurrentAccess";

export default async function ExercisePage({ params, searchParams }) {
  const { slug } = await params;
  const query = await searchParams;

  const exerciseType =
    query?.type === "connector_gap" ? "connector_gap" : "vocabulary_gap";
  const access = await getCurrentAccess();

  const canAccessText = canAccessResource(access.resources, "text", slug);

  const canAccessExerciseType = canAccessResource(
    access.resources,
    "reading_exercise",
    exerciseType,
  );

  if (!canAccessText || !canAccessExerciseType) {
    notFound();
  }
  const exercise = await getExercise(slug, exerciseType);

  if (!exercise) {
    notFound();
  }

  return (
    <main>
      <div className={styles.page}>
        <div className={styles.topRow}>
          <BackLink href="/exercises" label="Tilbage til tekstøvelser" />

          <div className={styles.badges}>
            <Badge variant="neutral" size="sm">
              {exercise.level}
            </Badge>

            <Badge variant="accent" size="sm">
              {exercise.category}
            </Badge>

            <Badge variant="neutral" size="sm">
              {exercise.questions.length} spørgsmål
            </Badge>
          </div>
        </div>

        <div className={styles.exerciseSection}>
          <div className={styles.exerciseTabs}>
            <Button
              href={`/exercises/${slug}?type=vocabulary_gap`}
              variant={
                exerciseType === "vocabulary_gap" ? "primary" : "secondary"
              }
              size="md"
              ariaCurrent={
                exerciseType === "vocabulary_gap" ? "page" : undefined
              }
            >
              Ordforråd
            </Button>

            <Button
              href={`/exercises/${slug}?type=connector_gap`}
              variant={
                exerciseType === "connector_gap" ? "primary" : "secondary"
              }
              size="md"
              ariaCurrent={
                exerciseType === "connector_gap" ? "page" : undefined
              }
            >
              Bindeord
            </Button>
          </div>

          <GapExercise exercise={exercise} />
        </div>
      </div>
    </main>
  );
}
