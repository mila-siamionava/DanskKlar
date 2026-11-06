import {
  FINAL_STEP,
  parsePhrase,
  partIsShown,
  wordAppearsAt,
} from "@/lib/grammar/phrase";

import styles from "./NounPhrase.module.css";

/*
  Draws a phrase written in the markup from lib/grammar/phrase.js
  at one step of its animation. Words and letters that come or go
  open and close smoothly; letters that change are marked.
*/
export default function NounPhrase({
  phrase,
  step = FINAL_STEP,
  size = "large",
}) {
  const words = parsePhrase(phrase);

  return (
    <span
      className={`${styles.phrase} ${styles[size]}`}
      lang="da"
    >
      {words.map((word, wordIndex) => {
        const content = (
          <span
            key={wordIndex}
            className={[
              styles.word,
              wordIndex < words.length - 1 ? styles.spaced : "",
              word.kind === "added" ? styles.addedWord : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {word.parts.map((part, partIndex) => (
              <Part
                key={partIndex}
                part={part}
                isShown={partIsShown(word, part, step)}
                isStruck={part.type === "remove" && step >= 1}
              />
            ))}
          </span>
        );

        if (word.kind === "plain") return content;

        return (
          <Slot key={wordIndex} isOpen={step >= wordAppearsAt(word)}>
            {content}
          </Slot>
        );
      })}
    </span>
  );
}

function Part({ part, isShown, isStruck }) {
  if (part.type === "base") return part.text;

  const mark = (
    <mark
      className={[
        styles.added,
        isStruck ? styles.struck : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {part.text}
    </mark>
  );

  if (part.type === "marked") return mark;

  return <Slot isOpen={isShown}>{mark}</Slot>;
}

function Slot({ isOpen, children }) {
  return (
    <span className={styles.slot} data-open={isOpen}>
      <span className={styles.slotInner}>{children}</span>
    </span>
  );
}
