"use client";

import styles from "./SkimmingQuestion.module.css";

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

function ParagraphFunctions({
  question,
  paragraphs,
  answer = {},
  onAnswer,
  reveal,
}) {
  function choose(blockId, choiceId) {
    onAnswer({ ...answer, [blockId]: choiceId });
  }

  return (
    <div className={styles.question}>
      <p className={styles.prompt}>{question.prompt}</p>

      <ol className={styles.paragraphList}>
        {question.items.map((item) => {
          const paragraph = paragraphs[item.blockId];
          const chosen = answer[item.blockId];
          const isWrong = reveal && chosen !== item.correct;

          return (
            <li key={item.blockId}>
              <fieldset className={styles.paragraphItem}>
                <legend className={styles.paragraphLabel}>
                  <strong>Afsnit {paragraph.number}</strong>
                  <span className={styles.excerpt}>
                    {paragraph.excerpt}
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
                          name={`answer-${question.id}-${item.blockId}`}
                          className="u-visually-hidden"
                          checked={isChosen}
                          disabled={reveal}
                          onChange={() => choose(item.blockId, choice.id)}
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
              </fieldset>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/*
  One skimming question.
  reveal: answer is checked, so mark the right options and lock the input.
  paragraphs: { [blockId]: { number, excerpt } } for paragraph questions
*/
export default function SkimmingQuestion(props) {
  if (props.question.type === "paragraph_functions") {
    return <ParagraphFunctions {...props} />;
  }

  return <MultipleChoice {...props} />;
}
