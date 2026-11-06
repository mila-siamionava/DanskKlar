import { notFound } from "next/navigation";

import StrategyLesson from "@/components/reading/strategy/StrategyLesson/StrategyLesson";
import { requireUser } from "@/lib/access/requireUser";
import { getInferensLesson } from "@/lib/reading/getInferens";

export default async function InferensLessonPage({ params }) {
  const { skill } = await params;

  await requireUser();

  const lesson = await getInferensLesson(skill);

  if (!lesson) {
    notFound();
  }

  return <StrategyLesson lesson={lesson} />;
}
