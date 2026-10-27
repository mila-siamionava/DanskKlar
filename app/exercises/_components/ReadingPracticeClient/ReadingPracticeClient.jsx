"use client";

import { useState } from "react";

import ReadingCard from "@/components/reading/ReadingCard/ReadingCard";
import FilterChip from "@/components/ui/FilterChip/FilterChip";

import styles from "./ReadingPracticeClient.module.css";

const filters = [
  {
    label: "Alle",
    slug: null,
  },
  {
    label: "Arbejde",
    slug: "arbejde",
  },
  {
    label: "Miljø",
    slug: "miljo",
  },
  {
    label: "Sundhed",
    slug: "sundhed",
  },
];

export default function ReadingPracticeClient({
  texts,
  readingImages = {},
  initialTopic = null,
}) {
  const [activeFilter, setActiveFilter] =
    useState(initialTopic);

  const filteredTexts =
    activeFilter === null
      ? texts
      : texts.filter(
          (text) =>
            text.topicSlug === activeFilter,
        );

  return (
    <>
      <div className={styles.filters}>
        {filters.map((filter) => (
          <FilterChip
            key={filter.label}
            active={
              activeFilter === filter.slug
            }
            onClick={() =>
              setActiveFilter(filter.slug)
            }
          >
            {filter.label}
          </FilterChip>
        ))}
      </div>

      <section
        className={styles.readingList}
      >
        {filteredTexts.map((text) => (
          <ReadingCard
            key={text.id}
            title={text.title}
            level={
              text.level || "PD3"
            }
            topic={text.category}
            imageSrc={
              readingImages[text.slug]
            }
            vocabularyHref={
              text.hasVocabulary
                ? `/exercises/${text.slug}?type=vocabulary_gap`
                : null
            }
            conjunctionsHref={
              text.hasConjunctions
                ? `/exercises/${text.slug}?type=connector_gap`
                : null
            }
          />
        ))}
      </section>
    </>
  );
}