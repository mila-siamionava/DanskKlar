import { getReadingSkillGroups } from "@/lib/progress/readingSkills";

import SkillsPanel from "../_components/SkillsPanel";

export default async function ProgressSkillsPage() {
  const { groups, upcoming } = await getReadingSkillGroups();

  return <SkillsPanel groups={groups} upcoming={upcoming} />;
}
