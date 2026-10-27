import { getVocabulary } from "@/lib/vocabulary/getVocabulary";

import MultipleChoiceClient from "./MultipleChoiceClient";

// rebuild with fresh vocabulary at most once per hour
export const revalidate = 3600;

export default async function MultipleChoicePage() {
  const vocabulary =
    await getVocabulary();

  return (
    <MultipleChoiceClient
      vocabulary={vocabulary}
    />
  );
}