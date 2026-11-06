import BackLink from "@/components/navigation/BackLink/BackLink";
import SkillList from "@/components/reading/strategy/SkillList/SkillList";
import { requireUser } from "@/lib/access/requireUser";
import { getInferensSkills } from "@/lib/reading/getInferens";

import styles from "./Inferens.module.css";

export default async function InferensPage() {
  await requireUser();

  const { skills, upcoming } = await getInferensSkills();

  return (
    <main className={styles.page}>
      <BackLink
        href="/reading"
        label="Tilbage til læsning"
        title="Læs mellem linjerne"
      />

      <p className={styles.intro}>
        Ikke alt står direkte i en tekst. Når du læser mellem linjerne, samler
        du spor – ord, handlinger og citater – og forstår, hvad skribenten og
        personerne mener. Dit svar skal altid kunne begrundes med noget i
        teksten. Træn én teknik ad gangen.
      </p>

      <SkillList strategyId="inferens" skills={skills} upcoming={upcoming} />
    </main>
  );
}
