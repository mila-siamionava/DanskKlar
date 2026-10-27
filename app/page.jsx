import Link from "next/link";

import {
  BookOpen,
  Languages,
  ClipboardList,
} from "lucide-react";

import HomeNavigationCard from "@/components/navigation/HomeNavigationCard/HomeNavigationCard";
import AarhusSketch from "@/components/ui/AarhusSketch/AarhusSketch";
import AccountMenu from "@/components/auth/AccountMenu/AccountMenu";
import { createClient } from "@/lib/supabase/server";

import styles from "./Home.module.css";

export default async function Home() {
  const supabase = await createClient();

  const { data } =
    await supabase.auth.getClaims();

  const user = data?.claims ?? null;

  return (
    <main className={styles.page}>
      <div className={styles.topBar}>
        <span
          className={styles.logo}
          aria-label="DanskKlar"
        >
          DK
        </span>

        <div className={styles.authActions}>
          {user ? (
            <AccountMenu email={user.email} />
          ) : (
            <Link
              href="/login"
              className={styles.authButton}
            >
              Log ind
            </Link>
          )}
        </div>
      </div>

      <header className={styles.header}>
        <h1>DanskKlar</h1>

        <p className={styles.tagline}>
          Bliv klar til PD3
        </p>

        <p className={styles.description}>
          Træn læsestrategier, læs danske tekster
          og øv dine ord.
        </p>
      </header>

      {/* Writing, grammar, mock tests and progress get their own cards once they have content */}
      <section
        className={styles.section}
        aria-labelledby="practise-heading"
      >
        <h2
          id="practise-heading"
          className={styles.sectionTitle}
        >
          Øv dig
        </h2>

        <nav
          className={styles.navigation}
          aria-label="Øv dig"
        >
          <HomeNavigationCard
            href="/reading"
            icon={BookOpen}
            title="Læsning"
            description="Læsestrategier og tekstøvelser"
          />

          <HomeNavigationCard
            href="/review"
            icon={Languages}
            title="Ordforråd"
            description="Dine gemte ord og træning"
          />

          <HomeNavigationCard
            href="/topics"
            icon={ClipboardList}
            title="Emner"
            description="Arbejde, sundhed og miljø"
          />
        </nav>
      </section>

      <div className={styles.illustration}>
        <AarhusSketch
          className={styles.aarhusSketch}
          title="Aarhus sketch"
        />
      </div>
    </main>
  );
}