import { getReadingSkillGroups } from "@/lib/progress/readingSkills";

import OverviewPanel from "./_components/OverviewPanel";

export default async function ProgressPage() {
  const { groups } = await getReadingSkillGroups();

  return <OverviewPanel groups={groups} />;
}
