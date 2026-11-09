"use client";

import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";

import ExerciseQuestionCard from "@/components/exercises/ExerciseQuestionCard/ExerciseQuestionCard";
import ExerciseShell from "@/components/exercises/ExerciseShell/ExerciseShell";
import HelpText from "@/components/i18n/HelpText/HelpText";
import Button from "@/components/ui/Button/Button";
import { useActivitySession } from "@/lib/progress/useActivitySession";

import styles from "./GrammarQuiz.module.css";

const LETTERS = ["A", "B", "C", "D"];

/*
  Multiple choice with four options, for both grammar exercise types:
  choose  pick the form that fills the gap
  error   pick the part of the sentence that is wrong
  Every answer shows why, with a link to the lesson that explains it.
*/
export default function GrammarQuiz({
  exercise,
  lessonLinks,
  backHref,
  backLabel,
}) {
  const { questions } = exercise;

  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  const session = useActivitySession({
    area: "grammar",
    activity:
      exercise.kind === "rule" ? `regel-${exercise.id}` : exercise.id,
    title: `Adjektiver: ${exercise.title}`,
  });

  const questionRef = useRef(null);
  const isFirstRender = useRef(true);

  // a new question: bring keyboard and screen reader users to it
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    questionRef.current?.focus();
  }, [index]);

  const question = questions[index];
  const correctOption =
    exercise.type === "choose" ? question.answer : question.error;
  const isAnswered = chosen !== null;
  const isCorrect = chosen === correctOption;
  const score = answers.filter((answer) => answer.isCorrect).length;

  function choose(option) {
    if (isAnswered) return;

    setChosen(option);
    setAnswers([
      ...answers,
      { index, isCorrect: option === correctOption },
    ]);
  }

  function next() {
    if (index === questions.length - 1) {
      session.finish({ points: score, max: questions.length });
      setIsFinished(true);
      return;
    }

    setIndex(index + 1);
    setChosen(null);
  }

  function restart() {
    setIndex(0);
    setChosen(null);
    setAnswers([]);
    setIsFinished(false);
  }

  const shellProps = { eyebrow: "Adjektiver", backHref, backLabel };

  if (isFinished) {
    const mistakes = answers.filter((answer) => !answer.isCorrect);

    return (
      <ExerciseShell {...shellProps} title={exercise.title}>
        <ExerciseQuestionCard>
          <div className={styles.result}>
            <p className={styles.resultLabel}>Dit resultat</p>

            <p className={styles.resultScore}>
              {score} af {questions.length}
            </p>

            {mistakes.length > 0 ? (
              <>
                <h2 className={styles.mistakesTitle}>Øv dem igen</h2>

                <ul className={styles.mistakes}>
                  {mistakes.map((mistake) => (
                    <li key={mistake.index} lang="da">
                      <CorrectSentence
                        exercise={exercise}
                        question={questions[mistake.index]}
                      />
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className={styles.resultMessage}>Alle rigtige. Flot!</p>
            )}

            <div className={styles.resultActions}>
              <Button onClick={restart} fullWidth>
                Prøv igen
              </Button>

              <Button href={backHref} variant="secondary" fullWidth>
                Til øvelserne
              </Button>
            </div>
          </div>
        </ExerciseQuestionCard>
      </ExerciseShell>
    );
  }

  const lesson = lessonLinks[question.lesson];

  const options =
    exercise.type === "choose" ? question.options : [0, 1, 2, 3];

  return (
    <ExerciseShell
      {...shellProps}
      title={exercise.instructions}
      current={index + 1}
      total={questions.length}
      taskHelp={
        <HelpText
          en={exercise.instructions_en}
          ru={exercise.instructions_ru}
        />
      }
    >
      <ExerciseQuestionCard>
        <h2
          ref={questionRef}
          tabIndex={-1}
          className={styles.sentence}
          lang="da"
        >
          <span className="u-visually-hidden">
            Spørgsmål {index + 1}:{" "}
          </span>

          {exercise.type === "choose" ? (
            <GapSentence
              question={question}
              filled={isAnswered ? question.answer : null}
            />
          ) : (
            <PartsSentence question={question} />
          )}
        </h2>

        {/* short words side by side; sentence parts and long phrases in a list */}
        <div
          className={
            exercise.type === "choose" &&
            options.every((option) => option.length <= 14)
              ? styles.optionGrid
              : styles.optionList
          }
        >
          {options.map((option, optionIndex) => {
            const state = !isAnswered
              ? ""
              : option === correctOption
                ? styles.correct
                : option === chosen
                  ? styles.wrong
                  : styles.faded;

            return (
              <button
                key={option}
                type="button"
                className={`${styles.option} ${state}`}
                onClick={() => choose(option)}
                disabled={isAnswered}
                lang="da"
              >
                {exercise.type === "error" && (
                  <span className={styles.letter} aria-hidden="true">
                    {LETTERS[optionIndex]}
                  </span>
                )}

                <span>
                  {exercise.type === "choose"
                    ? option
                    : question.parts[option]}
                </span>
              </button>
            );
          })}
        </div>

        <div aria-live="polite">
          {isAnswered && (
            <div
              className={`${styles.feedback} ${
                isCorrect ? styles.feedbackCorrect : styles.feedbackWrong
              }`}
            >
              <p className={styles.status}>
                {isCorrect ? "✓ Rigtigt" : "Ikke helt"}
              </p>

              <p className={styles.fixed} lang="da">
                <CorrectSentence exercise={exercise} question={question} />
              </p>

              <div>
                <p className={styles.why}>{question.why}</p>
                <HelpText en={question.why_en} ru={question.why_ru} />
              </div>

              {lesson && (
                <Link href={lesson.href} className={styles.lessonLink}>
                  Se forklaringen: {lesson.title}
                </Link>
              )}

              <Button onClick={next} fullWidth>
                {index === questions.length - 1 ? "Se resultat" : "Næste →"}
              </Button>
            </div>
          )}
        </div>
      </ExerciseQuestionCard>
    </ExerciseShell>
  );
}

// "Vi har en stor have." with stor marked (tasks without a gap)
function markWord(sentence, word) {
  const match = new RegExp(`(^|[^\\p{L}])(${word})(?![\\p{L}])`, "iu").exec(
    sentence,
  );

  if (!match) return sentence;

  const start = match.index + match[1].length;
  const end = start + match[2].length;

  return (
    <>
      {sentence.slice(0, start)}
      <mark className={styles.fix}>{sentence.slice(start, end)}</mark>
      {sentence.slice(end)}
    </>
  );
}

function GapSentence({ question, filled }) {
  // no gap: the learner picks a word from the sentence itself
  if (!question.sentence.includes("___")) {
    return filled ? markWord(question.sentence, filled) : question.sentence;
  }

  const [before, after] = question.sentence.split("___");

  return (
    <>
      {before}
      <span className={filled ? styles.gapFilled : styles.gap}>
        {filled ?? <span className="u-visually-hidden">hul</span>}
      </span>
      {after}
    </>
  );
}

function PartsSentence({ question }) {
  return question.parts.map((part, index) => (
    <Fragment key={index}>
      <span className={styles.part}>
        {part}
        <span className={styles.partLetter} aria-hidden="true">
          {LETTERS[index]}
        </span>
      </span>
      {index < question.parts.length - 1 ? " " : ""}
    </Fragment>
  ));
}

// the sentence with the right answer marked
function CorrectSentence({ exercise, question }) {
  if (exercise.type === "choose") {
    if (!question.sentence.includes("___")) {
      return markWord(question.sentence, question.answer);
    }

    const [before, after] = question.sentence.split("___");

    return (
      <>
        {before}
        <mark className={styles.fix}>{question.answer}</mark>
        {after}
      </>
    );
  }

  return question.parts.map((part, index) => (
    <span key={index}>
      {index === question.error ? (
        <mark className={styles.fix}>{question.fix}</mark>
      ) : (
        part
      )}
      {index < question.parts.length - 1 ? " " : ""}
    </span>
  ));
}
