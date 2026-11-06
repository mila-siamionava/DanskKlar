import BackLink from "@/components/navigation/BackLink/BackLink";
import SkillList from "@/components/reading/strategy/SkillList/SkillList";
import { requireUser } from "@/lib/access/requireUser";
import { getNaerlaesningSkills } from "@/lib/reading/getNaerlaesning";

import styles from "./Naerlaesning.module.css";

export default async function NaerlaesningPage() {
  await requireUser();

  const { skills, upcoming } = await getNaerlaesningSkills();

  return (
    <main className={styles.page}>
      <BackLink
        href="/reading"
        label="Tilbage til læsning"
        title="Nærlæsning"
      />

      <p className={styles.intro}>
        Når du nærlæser, læser du langsomt og præcist. Du finder det sted i
        teksten, spørgsmålet handler om, og læser det ord for ord – for små
        ord som »ikke«, »kun« og »alle« kan ændre hele betydningen. Træn én
        teknik ad gangen.
      </p>

      <SkillList
        strategyId="naerlaesning"
        skills={skills}
        upcoming={upcoming}
      />
    </main>
  );
}
