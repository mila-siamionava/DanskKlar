"use client";

import { helpLanguages, useHelpLanguage } from "@/lib/preferences/helpLanguage";

import styles from "./HelpText.module.css";

/*
  The translation of a Danish text in the learner's help language,
  shown under the Danish. Nothing when no help language is chosen
  or the text has no translation yet.

  <HelpText en={lesson.intro_en} ru={lesson.intro_ru} />
*/
export default function HelpText({
  as: Tag = "p",
  className = "",
  ...translations
}) {
  const language = useHelpLanguage();
  const text = language ? translations[language] : null;

  if (!text) return null;

  const { label } = helpLanguages.find((item) => item.id === language);

  return (
    <Tag className={`${styles.help} ${className}`.trim()} lang={language}>
      <span className={styles.label} aria-hidden="true">
        {label}
      </span>

      <span>{text}</span>
    </Tag>
  );
}
