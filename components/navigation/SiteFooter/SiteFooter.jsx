"use client";

import { Heart } from "lucide-react";
import { usePathname } from "next/navigation";

import { isReadingLessonPath } from "@/lib/reading/lessonPaths";

import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  const pathname = usePathname();

  // lessons fill the screen and have their own top bar
  if (isReadingLessonPath(pathname)) {
    return null;
  }

  return (
    <footer className={styles.footer}>
      <p className={styles.text}>
        © {new Date().getFullYear()} DanskKlar
        <span aria-hidden="true"> · </span>
        <span className={styles.madeWith}>
          Lavet med
          <Heart
            className={styles.heart}
            size={14}
            strokeWidth={2}
            role="img"
            aria-label="kærlighed"
          />
          af Mila S.
        </span>
      </p>
    </footer>
  );
}
