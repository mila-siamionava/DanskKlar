import { createClient } from "@/lib/supabase/server";

const topicLabels = {
  arbejde: "Arbejde",
  miljo: "Miljø",
  sundhed: "Sundhed",
};

export async function getTexts() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("texts")
    .select(`
      id,
      slug,
      title,
      level,
      topic_id,
      topic:topics (
        id,
        name,
        slug
      ),
      text_exercises (
        exercise_type
      )
    `)
    .order("title");

  if (error) {
    console.error("Texts error:", error);
    return [];
  }

  const texts = data.map((text) => ({
    ...text,

    topicSlug: text.topic?.slug ?? null,

    category:
      topicLabels[text.topic?.slug] ??
      text.topic?.name ??
      "Andet",

    hasVocabulary:
      text.text_exercises?.some(
        (exercise) =>
          exercise.exercise_type ===
          "vocabulary_gap",
      ) ?? false,

    hasConjunctions:
      text.text_exercises?.some(
        (exercise) =>
          exercise.exercise_type ===
          "connector_gap",
      ) ?? false,
  }));

  return texts;
}