import { notFound } from "next/navigation";
import { Play } from "lucide-react";

import HelpText from "@/components/i18n/HelpText/HelpText";
import BackLink from "@/components/navigation/BackLink/BackLink";
import HomeNavigationCard from "@/components/navigation/HomeNavigationCard/HomeNavigationCard";
import { adjectiveLessons } from "@/data/grammar/adjectives";
import {
  ADJECTIVES_PATH,
  adjectiveParts,
  getPartBySlug,
  lessonHref,
} from "@/lib/grammar/adjectivePaths";

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

      {sections.map((section, index) => (
        <section
          key={section}
          className={styles.lesson}
          aria-labelledby={`section-${index}`}
        >
          <h2 id={`section-${index}`} className={styles.heading}>
            {section}
          </h2>

          <nav className={styles.list} aria-label={section}>
            {lessons
              .filter((lesson) => lesson.section === section)
              .map((lesson) => (
                <HomeNavigationCard
                  key={lesson.id}
                  href={lessonHref(lesson)}
                  icon={Play}
                  title={`${lessons.indexOf(lesson) + 1}. ${lesson.title}`}
                  description={lesson.short}
                />
              ))}
          </nav>
        </section>
      ))}
    </main>
  );
}
