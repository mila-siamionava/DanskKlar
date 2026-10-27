import Link from "next/link";

import BackLink from "@/components/navigation/BackLink/BackLink";
import { createClient } from "@/lib/supabase/server";

import styles from "./Topics.module.css";

const topicLabels = {
  arbejde: "Arbejde",
  miljo: "Miljø",
  sundhed: "Sundhed",
};

export default async function TopicsPage() {
  const supabase = await createClient();

  const { data: topics, error } = await supabase
    .from("topics")
    .select(`
      id,
      name,
      slug,
      vocabulary_topics(count)
    `)
    .in("slug", [
      "arbejde",
      "sundhed",
      "miljo",
    ])
    .order("name", { ascending: true });

  if (error) {
    console.error(
      "Failed to load topics:",
      error,
    );
  }

  return (
    <>
      <main className={styles.page}>
        <div className={styles.headerRow}>
          <BackLink
            href="/"
            label="Tilbage til forsiden"
            title="Emner"
          />
        </div>

        {error ? (
          <p>Could not load topics.</p>
        ) : (
          <div className={styles.topicList}>
            {topics?.map((topic) => (
              <Link
                key={topic.id}
                href={`/topics/${topic.slug}`}
                className={styles.topicLink}
              >
                <div className={styles.topicIcon}>
                  {topic.slug === "arbejde"
                    ? "💼"
                    : topic.slug === "miljo"
                      ? "🌱"
                      : "♡"}
                </div>

                <div className={styles.topicContent}>
                  <h2 className={styles.topicTitle}>
                    {topicLabels[topic.slug] ??
                      topic.name}
                  </h2>
                </div>

                <span className={styles.wordCount}>
                  {topic.vocabulary_topics?.[0]
                    ?.count ?? 0}{" "}
                  ord
                </span>

                <span
                  className={styles.topicArrow}
                  aria-hidden="true"
                >
                  ›
                </span>
              </Link>
            ))}
          </div>
        )}
      </main>
    </>
  );
}