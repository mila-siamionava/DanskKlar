import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import TopicVocabularyList from "../_components/TopicVocabularyList";

export default async function TopicVocabularyPage({
  params,
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: topic, error } = await supabase
    .from("topics")
    .select("id, name")
    .eq("slug", slug)
    .single();

  if (error || !topic) {
    notFound();
  }

  const {
    data: vocabulary,
    error: vocabularyError,
  } = await supabase
    .from("vocabulary_topics")
    .select(`
      vocabulary (
        id,
        term,
        part_of_speech,
        level,
        definition_da,
        english,
        russian,
        example
      )
    `)
    .eq("topic_id", topic.id);

  if (vocabularyError) {
    console.error(
      "Failed to load vocabulary:",
      vocabularyError,
    );
  }

  const words =
    vocabulary
      ?.map((item) => item.vocabulary)
      .filter(Boolean)
      .sort((a, b) =>
        a.term.localeCompare(b.term, "da"),
      ) ?? [];

  return (
    <>
      <main className="mobilePage">
        <TopicVocabularyList
          words={words}
          topicName={topic.name}
        />
      </main>
    </>
  );
}