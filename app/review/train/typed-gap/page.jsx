import { getVocabulary } from "@/lib/vocabulary/getVocabulary";

import TypedGapClient from "./TypedGapClient";

// rebuild with fresh vocabulary at most once per hour
export const revalidate = 3600;

export default async function TypedGapPage() {
  const vocabulary = await getVocabulary();

  return (
    <TypedGapClient vocabulary={vocabulary} />
  );
}