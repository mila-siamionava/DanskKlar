import BackLink from "@/components/navigation/BackLink/BackLink";

import ReadingPracticeClient from "./_components/ReadingPracticeClient/ReadingPracticeClient";

import styles from "./Exercises.module.css";

import { canAccessResource } from "@/lib/access/canAccessResource";
import { getCurrentAccess } from "@/lib/access/getCurrentAccess";
import { getTexts } from "@/lib/exercises/getTexts";

const readingImages = {
  "fleksibelt-arbejde":
    "https://images.unsplash.com/photo-1758691737124-05c5bffe46f0?auto=format&fit=crop&w=500&q=80",

  "udenlandsk-arbejdskraft":
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=500&q=80",

  "frivilligt-arbejde":
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=500&q=80",

  jobskifte:
    "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=500&q=80",

  "stress-paa-arbejdspladsen":
    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=500&q=80",

  "tilfredshed-paa-arbejdspladsen":
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=500&q=80",
};

const validTopics = [
  "arbejde",
  "miljo",
  "sundhed",
];

export default async function ExercisesPage({
  searchParams,
}) {
  const query = await searchParams;

  const requestedTopic =
    typeof query?.topic === "string"
      ? query.topic
      : null;

  const initialTopic = validTopics.includes(
    requestedTopic,
  )
    ? requestedTopic
    : null;

  const [texts, access] = await Promise.all([
    getTexts(),
    getCurrentAccess(),
  ]);

  const canUseVocabulary =
    canAccessResource(
      access.resources,
      "reading_exercise",
      "vocabulary_gap",
    );

  const canUseConjunctions =
    canAccessResource(
      access.resources,
      "reading_exercise",
      "connector_gap",
    );

  const visibleTexts = texts
    .filter((text) =>
      canAccessResource(
        access.resources,
        "text",
        text.slug,
      ),
    )
    .map((text) => ({
      ...text,

      hasVocabulary:
        text.hasVocabulary &&
        canUseVocabulary,

      hasConjunctions:
        text.hasConjunctions &&
        canUseConjunctions,
    }));

  const backHref = initialTopic
    ? `/topics/${initialTopic}`
    : "/reading";

  const backLabel = initialTopic
    ? "Back to topic"
    : "Back to reading";

  return (
    <main>
      <div className={styles.page}>
        <h1 className="u-visually-hidden">
          Text practice
        </h1>

        <div className={styles.introRow}>
          <BackLink
            href={backHref}
            label={backLabel}
          />

          <p className={styles.instruction}>
            Choose a text to practice vocabulary
            or connectors.
          </p>
        </div>

        <ReadingPracticeClient
          texts={visibleTexts}
          readingImages={readingImages}
          initialTopic={initialTopic}
        />
      </div>
    </main>
  );
}