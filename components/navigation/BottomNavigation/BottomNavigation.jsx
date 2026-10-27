"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  House,
  RotateCcw,
  Dumbbell,
  ClipboardList,
} from "lucide-react";

import styles from "./BottomNavigation.module.css";

const icons = {
  home: House,
  reading: BookOpen,
  review: RotateCcw,
  train: Dumbbell,
  topics: ClipboardList,
};


  export default function BottomNavigation({
  items = [],
  className = "",
}) {
  const pathname = usePathname();

  // home has its own cards; scanning lessons need the whole screen
  if (
    pathname === "/" ||
    pathname.startsWith("/reading/scanning/")
  ) {
    return null;
  }

  const classes = [
    styles.navigation,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <nav
      className={classes}
      aria-label="Primary navigation"
    >
      {items.map((item) => {
        const isActive = item.exact
          ? pathname === item.href
          : pathname === item.href ||
            pathname.startsWith(
              `${item.href}/`
            );

        const Icon = icons[item.icon];

        return (
          <Link
            key={item.id}
            href={item.href}
            className={[
              styles.item,
              isActive
                ? styles.active
                : "",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-current={
              isActive
                ? "page"
                : undefined
            }
          >
            {Icon && (
              <span
                className={styles.icon}
                aria-hidden="true"
              >
                <Icon
                  size={20}
                  strokeWidth={1.8}
                />
              </span>
            )}

            <span
              className={styles.label}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}