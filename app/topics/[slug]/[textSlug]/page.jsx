import Link from "next/link";
import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export default async function TextPage({ params }) {
  const { slug, textSlug } = await params;
  const supabase = await createClient();

  const { data: text, error } = await supabase
    .from("texts")
    .select(`
      id,
      title,
      slug,
      content,
      level,
      topics!inner (
        name,
        slug
      )
    `)
    .eq("slug", textSlug)
    .eq("topics.slug", slug)
    .single();

  if (error || !text) {
    notFound();
  }

  return (
    <>
      <main className="mobilePage">
        <Link href={`/topics/${slug}`}>
          ← {text.topics.name}
        </Link>

        <h1>{text.title}</h1>

        <p>{text.level}</p>

        <div
          style={{
            marginTop: "1.5rem",
            whiteSpace: "pre-line",
            lineHeight: "1.7",
          }}
        >
          {text.content}
        </div>
      </main>
    </>
  );
}