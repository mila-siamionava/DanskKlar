import BackLink from "@/components/navigation/BackLink/BackLink";
import { adjectiveParts, partHref } from "@/lib/grammar/adjectivePaths";

import LessonList from "./_components/LessonList/LessonList";

import styles from "./Adjectives.module.css";

export default function AdjectivesPage() {
  return (
    <main className={styles.page}>
      <BackLink
        href="/grammar"
        label="Tilbage til grammatik"
        title="Adjektiver"
      />

      <nav aria-label="Adjektiver">
        <LessonList
          lessons={adjectiveParts}
          numberOf={(part) => (part.id === "grad" ? "2·3" : "1")}
          hrefOf={(part) => partHref(part.id)}
        />
      </nav>
    </main>
  );
}
