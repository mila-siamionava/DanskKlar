"use client";

import { hasItems, itemKey } from "@/lib/reading/lessonAnswer";

import styles from "./LessonQuestion.module.css";

function classNames(...names) {
  return names.filter(Boolean).join(" ");
}

function optionState(isChosen, isCorrect, reveal) {
  if (!reveal) return "";
  if (isCorrect) return styles.correct;
  if (isChosen) return styles.wrong;
  return "";
}

function MultipleChoice({ question, answer, onAnswer, reveal }) {
  const name = `answer-${question.id}`;

  return (
    <fieldset className={styles.question}>
      <legend className={styles.prompt}>{question.prompt}</legend>

      <div className={styles.options}>
        {question.options.map((option) => {
          const isChosen = answer === option.id;
          const isCorrect = option.id === question.correctOptionId;

          return (
            <label
              key={option.id}
              className={classNames(
                styles.option,
                isChosen && styles.chosen,
                optionState(isChosen, isCorrect, reveal),
              )}
            >
              <input
                type="radio"
                name={name}
                className={styles.radio}
                checked={isChosen}
                disabled={reveal}
                onChange={() => onAnswer(option.id)}
              />

              <span className={styles.optionText}>
                {option.text}

                {/* why a tempting answer is wrong: too strong, one side, a detail */}
                {reveal && option.feedback && (
                  <span className={styles.optionFeedback}>
                    {option.feedback}
                  </span>
                )}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

/*
  A list of items, each answered with one chip:
  paragraph_functions → one chip per paragraph (what does it do?)
  statements → one chip per statement (rigtigt / forkert / står ikke i teksten)
*/
function ChoiceItems({
  question,
  paragraphs,
  answer = {},
  onAnswer,
  reveal,
}) {
  const isStatements = question.type === "statements";

  function choose(key, choiceId) {
    onAnswer({ ...answer, [key]: choiceId });
  }

  function itemLabel(item, index) {
    if (isStatements) {
      return { title: `Udsagn ${index + 1}`, text: item.text };
    }

    const paragraph = paragraphs[item.blockId];

    return { title: `Afsnit ${paragraph.number}`, text: paragraph.excerpt };
  }

  return (
    <div className={styles.question}>
      <p className={styles.prompt}>{question.prompt}</p>

      <ol className={styles.paragraphList}>
        {question.items.map((item, index) => {
          const key = itemKey(item);
          const label = itemLabel(item, index);
          const chosen = answer[key];
          const isWrong = reveal && chosen !== item.correct;

          return (
            <li key={key}>
              <fieldset className={styles.paragraphItem}>
                <legend className={styles.paragraphLabel}>
                  <strong>{label.title}</strong>
                  <span
                    className={
                      isStatements ? styles.statement : styles.excerpt
                    }
                  >
                    {label.text}
                  </span>
                </legend>

                <div className={styles.chips}>
                  {question.choices.map((choice) => {
                    const isChosen = chosen === choice.id;
                    const isCorrect = choice.id === item.correct;

                    return (
                      <label
                        key={choice.id}
                        className={classNames(
                          styles.chip,
                          isChosen && styles.chipChosen,
                          optionState(isChosen, isCorrect, reveal),
                        )}
                      >
                        <input
                          type="radio"
                          name={`answer-${question.id}-${key}`}
                          className="u-visually-hidden"
                          checked={isChosen}
                          disabled={reveal}
                          onChange={() => choose(key, choice.id)}
                        />
                        {choice.label}
                      </label>
                    );
                  })}
                </div>

                {isWrong && (
                  <p className={styles.itemFeedback}>
                    Rigtigt svar:{" "}
                    {
                      question.choices.find(
                        (choice) => choice.id === item.correct,
                      )?.label
                    }
                  </p>
                )}

                {/* statements explain each answer, right or wrong */}
                {reveal && item.explanation && (
                  <p className={styles.itemExplanation}>{item.explanation}</p>
                )}
              </fieldset>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/*
  One lesson question.
  reveal: answer is checked, so mark the right options and lock the input.
  paragraphs: { [blockId]: { number, excerpt } } for paragraph questions
*/
export default function LessonQuestion(props) {
  if (hasItems(props.question)) {
    return <ChoiceItems {...props} />;
  }

  return <MultipleChoice {...props} />;
}
