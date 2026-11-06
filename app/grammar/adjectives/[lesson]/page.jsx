import { notFound } from "next/navigation";

import BackLink from "@/components/navigation/BackLink/BackLink";
import Button from "@/components/ui/Button/Button";
import {
  adjectiveLessons,
  getAdjectiveLesson,
} from "@/data/grammar/adjectives";
import {
  adjectiveExercises,
  getAdjectiveExercise,
} from "@/data/grammar/adjectiveExercises";

import AdjectiveAnimation from "../_components/AdjectiveAnimation/AdjectiveAnimation";
import GrammarQuiz from "../_components/GrammarQuiz/GrammarQuiz";
import InflectionTable from "../_components/InflectionTable/InflectionTable";

import styles from "../Adjectives.module.css";

// lessons and exercises share this address: /grammar/adjectives/<id>
export function generateStaticParams() {
  return [...adjectiveLessons, ...adjectiveExercises].map((item) => ({
    lesson: item.id,
  }));
}

export const dynamicParams = false;

export default async function AdjectiveLessonPage({ params }) {
  const { lesson: id } = await params;

  const exercise = getAdjectiveExercise(id);

  if (exercise) {
    return <GrammarQuiz exercise={exercise} lessons={adjectiveLessons} />;
  }

  const lesson = getAdjectiveLesson(id);

  if (!lesson) notFound();

  const index = adjectiveLessons.indexOf(lesson);
  const following = adjectiveLessons[index + 1];

  // the next lesson in the same part; at the end of a part, the exercises
  const nextLesson = following?.part === lesson.part ? following : null;

  return (
    <main className={styles.page}>
      <BackLink
        href="/grammar/adjectives"
        label="Tilbage til adjektiver"
        title="Adjektiver"
      />

      <section
        className={styles.lesson}
        aria-labelledby="lesson-heading"
      >
        <h2 id="lesson-heading" className={styles.heading}>
          {lesson.title}
        </h2>

        <p className={styles.intro}>{lesson.intro}</p>

        <AdjectiveAnimation lesson={lesson} />

        {lesson.table && (
          <InflectionTable
            rows={lesson.table}
            columns={lesson.tableColumns}
            heading={lesson.tableHeading}
          />
        )}
      </section>

      <div className={styles.next}>
        {nextLesson ? (
          <Button href={`/grammar/adjectives/${nextLesson.id}`} fullWidth>
            Næste: {nextLesson.title}
          </Button>
        ) : (
          <Button href="/grammar/adjectives" fullWidth>
            Til øvelserne
          </Button>
        )}
      </div>
    </main>
  );
}
