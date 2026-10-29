import BackLink from "@/components/navigation/BackLink/BackLink";

import ProgressTabs from "./_components/ProgressTabs";

import styles from "./_components/Progress.module.css";

export const metadata = {
  title: "Fremskridt",
};

export default function ProgressLayout({ children }) {
  return (
    <main className={styles.page}>
      <BackLink href="/" label="Tilbage til forsiden" title="Fremskridt" />

      <ProgressTabs />

      {children}
    </main>
  );
}
