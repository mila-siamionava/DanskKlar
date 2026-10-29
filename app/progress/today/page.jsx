import { getReadingSkillGroups } from "@/lib/progress/readingSkills";

import TodayPanel from "../_components/TodayPanel";

export default async function ProgressTodayPage() {
  const { groups } = await getReadingSkillGroups();

  return <TodayPanel groups={groups} />;
}
