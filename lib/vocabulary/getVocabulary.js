import { supabase } from "@/lib/supabase";

export async function getVocabulary() {
  const { data, error } = await supabase
    .from("vocabulary")
    .select(`
      id,
      term,
      english,
      russian,
      definition_da,
      example,
      example_target,
      example_target_1,
      example_target_2,
      part_of_speech,
      level
    `)
    .order("term");

  if (error) {
    console.error("Vocabulary error:", error);
    return [];
  }

  return data;
}