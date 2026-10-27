import { notFound } from "next/navigation";

import { requireUser } from "@/lib/access/requireUser";
import { getScanningLesson } from "@/lib/reading/getScanning";

import ScanningLesson from "../_components/ScanningLesson/ScanningLesson";

export default async function ScanningLessonPage({ params }) {
  const { skill } = await params;

  await requireUser();

  const lesson = await getScanningLesson(skill);

  if (!lesson) {
    notFound();
  }

  return <ScanningLesson lesson={lesson} />;
}
