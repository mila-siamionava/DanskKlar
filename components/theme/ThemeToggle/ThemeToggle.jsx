"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

import styles from "./ThemeToggle.module.css";

const STORAGE_KEY = "danskklar-appearance";

export default function ThemeToggle() {
  const [appearance, setAppearance] =
    useState("light");

  useEffect(() => {
    const savedAppearance =
      localStorage.getItem(STORAGE_KEY);

    const initialAppearance =
      savedAppearance === "dark"
        ? "dark"
        : "light";

    setAppearance(initialAppearance);

    document.documentElement.dataset.appearance =
      initialAppearance;
  }, []);

  function toggleAppearance() {
    const nextAppearance =
      appearance === "dark"
        ? "light"
        : "dark";

    setAppearance(nextAppearance);

    document.documentElement.dataset.appearance =
      nextAppearance;

    localStorage.setItem(
      STORAGE_KEY,
      nextAppearance
    );
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