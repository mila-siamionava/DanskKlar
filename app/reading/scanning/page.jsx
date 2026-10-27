import BackLink from "@/components/navigation/BackLink/BackLink";
import { requireUser } from "@/lib/access/requireUser";
import { getScanningSkills } from "@/lib/reading/getScanning";

import SkillList from "./_components/SkillList/SkillList";

import styles from "./Scanning.module.css";

export default async function ScanningPage() {
  await requireUser();

  const { skills, mixed } = await getScanningSkills();

  return (
    <main className={styles.page}>
      <BackLink
        href="/reading"
        label="Tilbage til læsning"
        title="Skanning"
      />

      <p className={styles.intro}>
        Når du skanner, leder du efter én bestemt oplysning – et tal, et
        navn eller en regel – uden at læse hele teksten. Vælg en teknik,
        eller træn dem alle på én gang.
      </p>

      <SkillList skills={skills} mixed={mixed} />
    </main>
  );
}
