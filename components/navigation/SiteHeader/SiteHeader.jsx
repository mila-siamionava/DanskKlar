"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "@/components/brand/Logo/Logo";

import { isReadingLessonPath } from "@/lib/reading/lessonPaths";

import styles from "./SiteHeader.module.css";

export default function SiteHeader() {
  const pathname = usePathname();

  // home shows the large logo; lessons have their own top bar
  if (
    pathname === "/" ||
    isReadingLessonPath(pathname)
  ) {
    return null;
  }

  return (
    <header className={styles.header}>
      <Link
        href="/"
        className={styles.home}
        aria-label="DanskKlar – til forsiden"
      >
        <Logo />
      </Link>
    </header>
  );
}
