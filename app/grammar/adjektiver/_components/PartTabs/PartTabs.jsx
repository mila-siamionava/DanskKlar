import Link from "next/link";

import { partHref } from "@/lib/grammar/adjectivePaths";

import styles from "./PartTabs.module.css";

const tabs = [
  { id: "regler", label: "Regler" },
  { id: "ovelser", label: "Øvelser" },
];

// Regler | Øvelser for one part of the adjectives
export default function PartTabs({ part, current }) {
  return (
    <nav className={styles.tabs} aria-label={part.title}>
      {tabs.map((tab) => (
        <Link
          key={tab.id}
          href={partHref(part.id, tab.id)}
          className={styles.tab}
          aria-current={tab.id === current ? "page" : undefined}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}
