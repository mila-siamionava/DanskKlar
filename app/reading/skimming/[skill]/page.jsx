import { notFound } from "next/navigation";

import { requireUser } from "@/lib/access/requireUser";
import { getSkimmingLesson } from "@/lib/reading/getSkimming";

import SkimmingLesson from "../_components/SkimmingLesson/SkimmingLesson";

export default async function SkimmingLessonPage({ params }) {
  const { skill } = await params;

  await requireUser();

  const lesson = await getSkimmingLesson(skill);

  if (!lesson) {
    notFound();
  }

  return <SkimmingLesson lesson={lesson} />;
}
