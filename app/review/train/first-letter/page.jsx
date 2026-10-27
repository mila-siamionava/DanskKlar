import { getVocabulary } from "@/lib/vocabulary/getVocabulary";

import FirstLetterClient from "./FirstLetterClient";

// rebuild with fresh vocabulary at most once per hour
export const revalidate = 3600;

export default async function FirstLetterPage() {
  const vocabulary = await getVocabulary();

  return (
    <FirstLetterClient
      vocabulary={vocabulary}
    />
  );
}