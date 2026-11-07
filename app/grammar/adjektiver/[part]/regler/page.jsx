import { notFound } from "next/navigation";

import HelpText from "@/components/i18n/HelpText/HelpText";
import BackLink from "@/components/navigation/BackLink/BackLink";
import { adjectiveLessons } from "@/data/grammar/adjectives";
import {
  ADJECTIVES_PATH,
  adjectiveParts,
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

export default async function AdjectiveRulesPage({ params }) {
  const { part: slug } = await params;
  const part = getPartBySlug(slug);

  if (!part) notFound();

  const lessons = adjectiveLessons.filter(
    (lesson) => lesson.part === part.id,
  );

  // grouped like the teaching slides, in this order
  const sections = [...new Set(lessons.map((lesson) => lesson.section))];

  return (
    <main className={styles.page}>
      <BackLink
        href={ADJECTIVES_PATH}
        label="Tilbage til adjektiver"
        title={part.title}
      />

      <PartTabs part={part} current="regler" />

      <div>
        <p className={styles.intro}>{part.intro}</p>
        <HelpText en={part.intro_en} ru={part.intro_ru} />
      </div>

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
              />
            </Fold>
          );
        })}
      </div>
    </main>
  );
}
