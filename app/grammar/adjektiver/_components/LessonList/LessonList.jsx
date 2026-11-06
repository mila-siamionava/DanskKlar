import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { lessonHref } from "@/lib/grammar/adjectivePaths";

import styles from "./LessonList.module.css";

// a short numbered list of lessons: number, title, one example
export default function LessonList({ lessons, numberOf }) {
  return (
    <ol className={styles.list}>
      {lessons.map((lesson) => (
        <li key={lesson.id}>
          <Link href={lessonHref(lesson)} className={styles.row}>
            <span className={styles.number} aria-hidden="true">
              {numberOf(lesson)}
            </span>

            <span className={styles.text}>
              <span className={styles.title}>{lesson.title}</span>
              <span className={styles.example} lang="da">
                {lesson.short}
              </span>
            </span>

            <ChevronRight
              className={styles.arrow}
              size={18}
              aria-hidden="true"
            />
          </Link>
        </li>
      ))}
    </ol>
  );
}
