"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./Progress.module.css";

const TABS = [
  { href: "/progress", label: "Overblik" },
  { href: "/progress/today", label: "I dag" },
  { href: "/progress/history", label: "Historik" },
  { href: "/progress/skills", label: "Færdigheder" },
  { href: "/progress/words", label: "Ord" },
];

export default function ProgressTabs() {
  const pathname = usePathname();

  return (
    <nav className={styles.tabs} aria-label="Fremskridt">
      {TABS.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={styles.tab}
          aria-current={pathname === tab.href ? "page" : undefined}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}
