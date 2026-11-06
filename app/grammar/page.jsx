import { Palette } from "lucide-react";

import BackLink from "@/components/navigation/BackLink/BackLink";
import HomeNavigationCard from "@/components/navigation/HomeNavigationCard/HomeNavigationCard";

import styles from "./Grammar.module.css";

export default function GrammarPage() {
  return (
    <main className={styles.page}>
      <BackLink
        href="/"
        label="Tilbage til forsiden"
        title="Grammatik"
      />

      <nav className={styles.navigation} aria-label="Grammatik">
        <HomeNavigationCard
          href="/grammar/adjectives"
          icon={Palette}
          title="Adjektiver"
          description="Grundform og gradbøjning: en grøn bil, det grønne hus, højere end"
        />
      </nav>
    </main>
  );
}
