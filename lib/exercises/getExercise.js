import { shuffle } from "@/app/review/train/_lib/arrayUtils";
import { createClient } from "@/lib/supabase/server";

export async function getExercise(
  slug,
  exerciseType = "vocabulary_gap",
) {
  const supabase = await createClient();

  // 1. Get master text
  const { data: text, error: textError } =
    await supabase
      .from("texts")
      .select("*")
      .eq("slug", slug)
      .single();

  if (textError) {
    console.error("Text error:", textError);
    return null;
  }

  // 2. Get exercise
  const {
    data: exercise,
    error: exerciseError,
  } = await supabase
    .from("text_exercises")
    .select("*")
    .eq("text_id", text.id)
    .eq("exercise_type", exerciseType)
    .single();

  if (exerciseError) {
    console.error(
      "Exercise error:",
      exerciseError,
    );
    return null;
  }

  // 3. Get gaps
  const { data: gaps, error: gapsError } =
    await supabase
      .from("text_exercise_gaps")
      .select("*")
      .eq(
        "text_exercise_id",
        exercise.id,
      )
      .order("gap_number");

  if (gapsError) {
    console.error(
      "Gap error:",
      gapsError,
    );
    return null;
  }

  // 4. Get options
  const gapIds = gaps.map(
    (gap) => gap.id,
  );

  const {
    data: options,
    error: optionsError,
  } = await supabase
    .from("text_gap_options")
    .select("*")
    .in("gap_id", gapIds)
    .order("option_order");

  if (optionsError) {
    console.error(
      "Options error:",
      optionsError,
    );
    return null;
  }

  // 5. Transform DB data into the shape
  // GapExercise expects
  const questions = gaps.map((gap) => {
    const gapOptions = options.filter(
      (option) =>
        option.gap_id === gap.id,
    );

    const transformedOptions =
      shuffle(
        gapOptions.map((option) => ({
          id: option.id,
          text: option.option_text,
          vocabularyId:
            option.vocabulary_id ?? null,
        })),
      );

    const correctOption =
      gapOptions.find(
        (option) =>
          option.is_correct,
      );

    return {
      id: gap.gap_number,

      options: transformedOptions,

      correctOptionId:
        correctOption?.id ?? null,

      correctVocabularyId:
        gap.correct_vocabulary_id ?? null,

      explanation: {
        danish:
          gap.explanation_da || "",
        english:
          gap.explanation_en || "",
        russian:
          gap.explanation_ru || "",
        translations: [],
      },
    };
  });

  return {
    id: exercise.id,
    slug: text.slug,
    title: exercise.title,
    level: exercise.level,

    exerciseType,

    category:
      exerciseType ===
      "connector_gap"
        ? "Bindeord"
        : "Ordforråd",

    type: "gap-multiple-choice",

    instructions:
      exercise.instruction,

    content:
      exercise.exercise_text,

    questions,
  };
}