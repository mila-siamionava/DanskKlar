import { getVocabulary } from "@/lib/vocabulary/getVocabulary";

import BuildSentenceClient from "./BuildSentenceClient";

// rebuild with fresh vocabulary at most once per hour
export const revalidate = 3600;

export default async function BuildSentencePage() {
  const vocabulary = await getVocabulary();

  return (
    <BuildSentenceClient
      vocabulary={vocabulary}
    />
  );
}