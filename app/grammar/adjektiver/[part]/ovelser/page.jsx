import { notFound } from "next/navigation";

import BackLink from "@/components/navigation/BackLink/BackLink";
import { adjectiveLessons } from "@/data/grammar/adjectives";
import { adjectiveExercises } from "@/data/grammar/adjectiveExercises";
import { ruleExercises } from "@/data/grammar/ruleExercises";
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

  const sections = [...new Set(lessons.map((lesson) => lesson.section))];

  return (
    <main className={styles.page}>
      <BackLink
        href={ADJECTIVES_PATH}
        label="Tilbage til adjektiver"
        title={part.title}
      />

      <PartTabs part={part} current="ovelser" />

      <p className={styles.intro}>
        Øv én regel ad gangen, eller bland dem. 20 opgaver i hver øvelse.
      </p>

      <div>
        {sections.map((section, index) => {
          const inSection = lessons.filter(
            (lesson) => lesson.section === section,
          );

          return (
            <Fold
              key={section}
              title={section}
              count={inSection.length}
              open={index === 0}
            >
              <LessonList
                lessons={inSection}
                numberOf={(lesson) => lessons.indexOf(lesson) + 1}
                hrefOf={(lesson) => exerciseHref(ruleOf[lesson.id])}
                detailOf={() => "20 opgaver"}
              />
            </Fold>
          );
        })}

        <Fold title="Blandede øvelser" count={exercises.length}>
          <LessonList
            lessons={exercises}
            numberOf={(exercise) => (exercise.type === "error" ? "?" : "✓")}
            hrefOf={exerciseHref}
            detailOf={(exercise) =>
              `${exercise.questions.length} opgaver · ${exercise.short}`
            }
          />
        </Fold>
      </div>
    </main>
  );
}
