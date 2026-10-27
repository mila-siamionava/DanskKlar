import { getVocabulary } from "@/lib/vocabulary/getVocabulary";

import DefinitionWordClient from "./DefinitionWordClient";

// rebuild with fresh vocabulary at most once per hour
export const revalidate = 3600;

export default async function DefinitionWordPage() {
  const vocabulary = await getVocabulary();

  return (
    <DefinitionWordClient
      vocabulary={vocabulary}
    />
  );
}