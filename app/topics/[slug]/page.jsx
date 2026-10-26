import Link from "next/link";
import { notFound } from "next/navigation";

import BackLink from "@/components/navigation/BackLink/BackLink";
import { createClient } from "@/lib/supabase/server";

import styles from "./Topic.module.css";

export default async function TopicPage({ params }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: topic, error } = await supabase
    .from("topics")
    .select(`
      id,
      name,
      description,
      vocabulary_topics(count)
    `)
    .eq("slug", slug)
    .single();

  if (error || !topic) {
    notFound();
  }

  const wordCount =
    topic.vocabulary_topics?.[0]?.count ?? 0;

  return (
    <>
      <main className="mobilePage">
        <div className={styles.headerRow}>
          <BackLink
            href="/topics"
            label="Back to topics"
            title={topic.name}
          />
        </div>

        

        <p className={styles.intro}>
          Choose what you want to practise
        </p>

        <div className={styles.optionList}>
          <Link
            href={`/topics/${slug}/vocabulary`}
            className={styles.optionCard}
          >
            <div className={styles.optionContent}>
              <h2 className={styles.optionTitle}>
                Vocabulary
              </h2>

              <p className={styles.optionDescription}>
                Learn useful topic words and add them
                to your review list.
              </p>

              <span className={styles.optionMeta}>
                {wordCount} words
              </span>
            </div>

            <span
              className={styles.optionArrow}
              aria-hidden="true"
            >
              ›
            </span>
          </Link>

         <Link
  href={`/exercises?topic=${slug}`}
  className={styles.optionCard}
>
  <div className={styles.optionContent}>
    <h2 className={styles.optionTitle}>
      Texts
    </h2>

    <p className={styles.optionDescription}>
      Practise reading texts related to this
      topic.
    </p>

    <span className={styles.optionMeta}>
      Reading practice
    </span>
  </div>

  <span
    className={styles.optionArrow}
    aria-hidden="true"
  >
    ›
  </span>
</Link>
        </div>
      </main>
    </>
  );
}