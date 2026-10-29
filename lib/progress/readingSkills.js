import { getScanningSkills } from "@/lib/reading/getScanning";
import { getSkimmingSkills } from "@/lib/reading/getSkimming";

/*
  The reading techniques the dashboards track, grouped by strategy.
  id matches the progress store and the activity name ("skimming/emne").
*/
export async function getReadingSkillGroups() {
  const [scanning, skimming] = await Promise.all([
    getScanningSkills(),
    getSkimmingSkills(),
  ]);

  return {
    groups: [
      {
        id: "scanning",
        name: "Skanning",
        basePath: "/reading/scanning",
        skills: scanning.skills.map(({ slug, title }) => ({ slug, title })),
      },
      {
        id: "skimming",
        name: "Skimming",
        basePath: "/reading/skimming",
        skills: skimming.skills.map(({ slug, title }) => ({ slug, title })),
      },
    ],
    upcoming: skimming.upcoming.map(({ slug, title }) => ({ slug, title })),
  };
}
