import { notFound, redirect } from "next/navigation";

import {
  adjectiveParts,
  getPartBySlug,
  partHref,
} from "@/lib/grammar/adjectivePaths";

export function generateStaticParams() {
  return adjectiveParts.map((part) => ({ part: part.slug }));
}

export const dynamicParams = false;

// a part opens on its rules
export default async function AdjectivePartPage({ params }) {
  const { part: slug } = await params;
  const part = getPartBySlug(slug);

  if (!part) notFound();

  redirect(partHref(part.id, "regler"));
}
