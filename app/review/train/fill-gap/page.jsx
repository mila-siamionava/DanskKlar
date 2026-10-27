import { getVocabulary } from "@/lib/vocabulary/getVocabulary";

import FillGapClient from "./FillGapClient";

// rebuild with fresh vocabulary at most once per hour
export const revalidate = 3600;

export default async function FillGapPage() {
  const vocabulary = await getVocabulary();

  return (
    <FillGapClient vocabulary={vocabulary} />
  );
}