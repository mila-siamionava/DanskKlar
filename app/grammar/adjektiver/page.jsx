import { ChartNoAxesColumnIncreasing, Palette } from "lucide-react";

import BackLink from "@/components/navigation/BackLink/BackLink";
import HomeNavigationCard from "@/components/navigation/HomeNavigationCard/HomeNavigationCard";
import { adjectiveParts, partHref } from "@/lib/grammar/adjectivePaths";

import styles from "./Adjectives.module.css";

const partIcons = {
  grundform: Palette,
  grad: ChartNoAxesColumnIncreasing,
};

export default function AdjectivesPage() {
  return (
    <main className={styles.page}>
      <BackLink
        href="/grammar"
        label="Tilbage til grammatik"
        title="Adjektiver"
      />

      <nav className={styles.list} aria-label="Adjektiver">
        {adjectiveParts.map((part) => (
          <HomeNavigationCard
            key={part.id}
            href={partHref(part.id)}
            icon={partIcons[part.id]}
            title={part.title}
            description={part.short}
          />
        ))}
      </nav>
    </main>
  );
}
