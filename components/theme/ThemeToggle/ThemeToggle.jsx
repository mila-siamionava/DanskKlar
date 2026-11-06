"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";

import { applyAppearance } from "@/lib/theme/preferences";

import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  // only rendered inside the open account menu, so document exists;
  // the head script has already applied the saved appearance
  const [appearance, setAppearance] = useState(() =>
    typeof document !== "undefined" &&
    document.documentElement.dataset.appearance === "dark"
      ? "dark"
      : "light",
  );

  function toggleAppearance() {
    const nextAppearance =
      appearance === "dark"
        ? "light"
        : "dark";

    setAppearance(nextAppearance);
    applyAppearance(nextAppearance);
  }

  const isDark = appearance === "dark";

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggleAppearance}
      aria-pressed={isDark}
      aria-label={
        isDark
          ? "Skift til lyst tema"
          : "Skift til mørkt tema"
      }
    >
      <span className={styles.content}>
        {isDark ? (
          <Moon
            size={17}
            strokeWidth={1.7}
            aria-hidden="true"
          />
        ) : (
          <Sun
            size={17}
            strokeWidth={1.7}
            aria-hidden="true"
          />
        )}

        <span>Dark theme</span>
      </span>

      <span
        className={[
          styles.switch,
          isDark ? styles.switchActive : "",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-hidden="true"
      >
        <span className={styles.thumb} />
      </span>
    </button>
  );
}