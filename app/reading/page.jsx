import {
  Eye,
  FileText,
  Lightbulb,
  Microscope,
  ScanSearch,
} from "lucide-react";

import BackLink from "@/components/navigation/BackLink/BackLink";
import HomeNavigationCard from "@/components/navigation/HomeNavigationCard/HomeNavigationCard";
import { createClient } from "@/lib/supabase/server";

import styles from "./Reading.module.css";

export default async function ReadingPage() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getClaims();

  const isSignedIn = Boolean(data?.claims?.sub);

  return (
    <main className={styles.page}>
      <BackLink
        href="/"
        label="Tilbage til forsiden"
        title="Læsning"
      />

      <nav className={styles.navigation} aria-label="Læsning">
        <HomeNavigationCard
          href={isSignedIn ? "/reading/scanning" : "/login"}
          icon={ScanSearch}
          title="Læsestrategier: Skanning"
          description={
            isSignedIn
              ? "Find tal, nøgleord og regler hurtigt"
              : "Log ind for at træne læsestrategier"
          }
        />

        <HomeNavigationCard
          href={isSignedIn ? "/reading/skimming" : "/login"}
          icon={Eye}
          title="Læsestrategier: Skimming"
          description={
            isSignedIn
              ? "Forstå emne, hovedpointe og opbygning hurtigt"
              : "Log ind for at træne læsestrategier"
          }
        />

        <HomeNavigationCard
          href={isSignedIn ? "/reading/naerlaesning" : "/login"}
          icon={Microscope}
          title="Læsestrategier: Nærlæsning"
          description={
            isSignedIn
              ? "Læs præcist: rigtigt/forkert, ord og henvisninger"
              : "Log ind for at træne læsestrategier"
          }
        />

        <HomeNavigationCard
          href={isSignedIn ? "/reading/inferens" : "/login"}
          icon={Lightbulb}
          title="Læsestrategier: Læs mellem linjerne"
          description={
            isSignedIn
              ? "Forstå det, der ikke står direkte – holdninger og hensigter"
              : "Log ind for at træne læsestrategier"
          }
        />

        <HomeNavigationCard
          href="/exercises"
          icon={FileText}
          title="Tekstøvelser"
          description="Ord og bindeord i PD3-tekster"
        />
      </nav>
    </main>
  );
}
