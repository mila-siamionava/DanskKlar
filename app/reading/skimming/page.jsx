import BackLink from "@/components/navigation/BackLink/BackLink";
import { requireUser } from "@/lib/access/requireUser";
import { getSkimmingSkills } from "@/lib/reading/getSkimming";

import SkillList from "./_components/SkillList/SkillList";

import styles from "./Skimming.module.css";

export default async function SkimmingPage() {
  await requireUser();

  const { skills, upcoming } = await getSkimmingSkills();

  return (
    <main className={styles.page}>
      <BackLink
        href="/reading"
        label="Tilbage til læsning"
        title="Skimming"
      />

      <p className={styles.intro}>
        Når du skimmer, læser du hurtigt for at forstå helheden – emnet,
        hovedpointen og opbygningen – uden at gå i detaljer. Træn én teknik
        ad gangen.
      </p>

      <SkillList skills={skills} upcoming={upcoming} />
    </main>
  );
}
