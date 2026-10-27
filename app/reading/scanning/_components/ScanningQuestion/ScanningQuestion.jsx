"use client";

import styles from "./ScanningQuestion.module.css";

const TRUE_FALSE_OPTIONS = [
  { id: true, text: "Sandt" },
  { id: false, text: "Falsk" },
];

/*
  One question, in any of the three types.
  reveal: answer is checked, so mark the right option and lock the input.
*/
export default function ScanningQuestion({
  question,
  number,
  answer,
  onAnswer,
  reveal = false,
}) {
  const inputId = `answer-${question.id}`;

  if (question.type === "short_answer") {
    return (
      <div className={styles.question}>
        <label htmlFor={inputId} className={styles.prompt}>
          <span className={styles.number}>{number}.</span>{" "}
          {question.prompt}
        </label>

        <input
          id={inputId}
          className={styles.input}
          type="text"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          value={answer ?? ""}
          disabled={reveal}
          onChange={(event) => onAnswer(event.target.value)}
        />
      </div>
    );
  }

  const options =
    question.type === "true_false"
      ? TRUE_FALSE_OPTIONS
      : question.options;

  const correctId =
    question.type === "true_false"
      ? question.correctValue
      : question.correctOptionId;

  return (
    <fieldset className={styles.question}>
      <legend className={styles.prompt}>
        <span className={styles.number}>{number}.</span>{" "}
        {question.prompt}
      </legend>

      <div
        className={
          question.type === "true_false"
            ? styles.trueFalse
            : styles.options
        }
      >
        {options.map((option) => {
          const isChosen = answer === option.id;
          const isCorrect = option.id === correctId;

          const state = !reveal
            ? ""
            : isCorrect
              ? styles.correct
              : isChosen
                ? styles.wrong
                : "";

          return (
            <label
              key={String(option.id)}
              className={[
                styles.option,
                isChosen ? styles.chosen : "",
                state,
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <input
                type="radio"
                name={inputId}
                className={styles.radio}
                checked={isChosen}
                disabled={reveal}
                onChange={() => onAnswer(option.id)}
              />

              <span>{option.text}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
