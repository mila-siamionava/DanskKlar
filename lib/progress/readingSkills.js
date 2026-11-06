import { getInferensSkills } from "@/lib/reading/getInferens";
import { getNaerlaesningSkills } from "@/lib/reading/getNaerlaesning";
import { getScanningSkills } from "@/lib/reading/getScanning";
import { getSkimmingSkills } from "@/lib/reading/getSkimming";

/*
  The reading techniques the dashboards track, grouped by strategy.
  id matches the progress store and the activity name ("skimming/emne").
*/
export async function getReadingSkillGroups() {
  const [scanning, skimming, naerlaesning, inferens] = await Promise.all([
    getScanningSkills(),
    getSkimmingSkills(),
    getNaerlaesningSkills(),
    getInferensSkills(),
  ]);

  const pick = (skills) => skills.map(({ slug, title }) => ({ slug, title }));

  return {
    groups: [
      {
        id: "scanning",
        name: "Skanning",
        basePath: "/reading/scanning",
        skills: pick(scanning.skills),
      },
      {
        id: "skimming",
        name: "Skimming",
        basePath: "/reading/skimming",
        skills: pick(skimming.skills),
      },
      {
        id: "naerlaesning",
        name: "Nærlæsning",
        basePath: "/reading/naerlaesning",
        skills: pick(naerlaesning.skills),
      },
      {
        id: "inferens",
        name: "Læs mellem linjerne",
        basePath: "/reading/inferens",
        skills: pick(inferens.skills),
      },
    ],
    upcoming: pick(skimming.upcoming),
  };
}
