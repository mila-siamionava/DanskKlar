import { notFound } from "next/navigation";

import StrategyLesson from "@/components/reading/strategy/StrategyLesson/StrategyLesson";
import { requireUser } from "@/lib/access/requireUser";
import { getSkimmingLesson } from "@/lib/reading/getSkimming";

export default async function SkimmingLessonPage({ params }) {
  const { skill } = await params;

  await requireUser();

  const lesson = await getSkimmingLesson(skill);

  if (!lesson) {
    notFound();
  }

  return <StrategyLesson lesson={lesson} />;
}
