import { notFound } from "next/navigation";

import StrategyLesson from "@/components/reading/strategy/StrategyLesson/StrategyLesson";
import { requireUser } from "@/lib/access/requireUser";
import { getNaerlaesningLesson } from "@/lib/reading/getNaerlaesning";

export default async function NaerlaesningLessonPage({ params }) {
  const { skill } = await params;

  await requireUser();

  const lesson = await getNaerlaesningLesson(skill);

  if (!lesson) {
    notFound();
  }

  return <StrategyLesson lesson={lesson} />;
}
