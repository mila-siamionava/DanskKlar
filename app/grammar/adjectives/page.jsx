import BackLink from "@/components/navigation/BackLink/BackLink";
import { positiveForm } from "@/data/grammar/adjectives";

import AdjectiveAnimation from "./_components/AdjectiveAnimation/AdjectiveAnimation";

import styles from "./Adjectives.module.css";

export default function AdjectivesPage() {
  return (
    <main className={styles.page}>
      <BackLink
        href="/grammar"
        label="Tilbage til grammatik"
        title="Adjektiver"
      />

      <section
        className={styles.lesson}
        aria-labelledby={`${positiveForm.id}-heading`}
      >
        <h2 id={`${positiveForm.id}-heading`} className={styles.heading}>
          {positiveForm.title}
        </h2>

        <p className={styles.intro}>{positiveForm.intro}</p>

        <AdjectiveAnimation lesson={positiveForm} />
      </section>
    </main>
  );
}
