import { notFound } from "next/navigation";

import BackLink from "@/components/navigation/BackLink/BackLink";
import { adjectiveLessons } from "@/data/grammar/adjectives";
import { adjectiveExercises } from "@/data/grammar/adjectiveExercises";
import {
  levelOfLesson,
  levelOfMixedExercise,
  levels,
} from "@/data/grammar/adjectiveLevels";
import { ruleExercises } from "@/data/grammar/ruleExercises";
import HelpText from "@/components/i18n/HelpText/HelpText";
import {
  ADJECTIVES_PATH,
  adjectiveParts,
  exerciseHref,
  getPartBySlug,
} from "@/lib/grammar/adjectivePaths";

import Fold from "../../_components/Fold/Fold";
import LessonList from "../../_components/LessonList/LessonList";
import PartTabs from "../../_components/PartTabs/PartTabs";

import styles from "../../Adjectives.module.css";

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

      <div>
        {levels.map((item) => {
          const ruleLessons = lessons.filter(
            (lesson) => levelOfLesson[lesson.id] === item.level,
          );

          const mixed = exercises.filter(
            (exercise) => levelOfMixedExercise[exercise.id] === item.level,
          );

          const [reminder, reminderEn, reminderRu] = item.reminder[part.id];

          return (
            <Fold
              key={item.level}
              title={item.title}
              count={ruleLessons.length + mixed.length}
              open={item.level === 1}
            >
              <div className={styles.reminder}>
                <p className={styles.reminderText}>{reminder}</p>
                <HelpText en={reminderEn} ru={reminderRu} />
              </div>

              {ruleLessons.length > 0 && (
                <LessonList
                  lessons={ruleLessons}
                  numberOf={(lesson) => lessons.indexOf(lesson) + 1}
                  hrefOf={(lesson) => exerciseHref(ruleOf[lesson.id])}
                  detailOf={() => "20 opgaver"}
                />
              )}

              {mixed.length > 0 && (
                <LessonList
                  lessons={mixed}
                  numberOf={() => "✱"}
                  hrefOf={exerciseHref}
                  detailOf={(exercise) =>
                    `${exercise.questions.length} opgaver · ${exercise.short}`
                  }
                />
              )}
            </Fold>
          );
        })}
      </div>
    </main>
  );
}
