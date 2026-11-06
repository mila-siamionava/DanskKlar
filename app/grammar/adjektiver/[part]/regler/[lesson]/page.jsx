import { notFound } from "next/navigation";

import HelpText from "@/components/i18n/HelpText/HelpText";
import BackLink from "@/components/navigation/BackLink/BackLink";
import Button from "@/components/ui/Button/Button";
import { adjectiveLessons } from "@/data/grammar/adjectives";
import {
  getPart,
  getPartBySlug,
  lessonHref,
  partHref,
} from "@/lib/grammar/adjectivePaths";

import AdjectiveAnimation from "../../../_components/AdjectiveAnimation/AdjectiveAnimation";
import InflectionTable from "../../../_components/InflectionTable/InflectionTable";

import styles from "../../../Adjectives.module.css";

export function generateStaticParams() {
  return adjectiveLessons.map((lesson) => ({
    part: getPart(lesson.part).slug,
    lesson: lesson.id,
  }));
}

export const dynamicParams = false;

export default async function AdjectiveLessonPage({ params }) {
  const { part: slug, lesson: id } = await params;
  const part = getPartBySlug(slug);

  const lessons = adjectiveLessons.filter(
    (lesson) => lesson.part === part?.id,
  );

  const lesson = lessons.find((item) => item.id === id);

  if (!lesson) notFound();

  // the next lesson in this part; after the last one, the exercises
  const nextLesson = lessons[lessons.indexOf(lesson) + 1];

  return (
    <main className={styles.page}>
      <BackLink
        href={partHref(part.id, "regler")}
        label={`Tilbage til ${part.title}`}
        title="Adjektiver"
      />

      <section
        className={styles.lesson}
        aria-labelledby="lesson-heading"
      >
        <h2 id="lesson-heading" className={styles.heading}>
          {lesson.title}
        </h2>

        <div>
          <p className={styles.intro}>{lesson.intro}</p>
          <HelpText en={lesson.intro_en} ru={lesson.intro_ru} />
        </div>

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
          <Button href={lessonHref(nextLesson)} fullWidth>
            Næste: {nextLesson.title}
          </Button>
        ) : (
          <Button href={partHref(part.id, "ovelser")} fullWidth>
            Til øvelserne
          </Button>
        )}
      </div>
    </main>
  );
}
