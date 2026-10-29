"use client";

import { useEffect, useRef, useState } from "react";

import SplitReader from "@/components/reading/SplitReader/SplitReader";
import Button from "@/components/ui/Button/Button";
import {
  formatCorrectAnswer,
  formatGivenAnswer,
  isAnswerComplete,
  isAnswerCorrect,
  maxPoints,
  scoreAnswer,
} from "@/lib/reading/skimmingAnswer";

import SkimmingQuestion from "../SkimmingQuestion/SkimmingQuestion";
import SkimmingText from "../SkimmingText/SkimmingText";

import styles from "./TextStage.module.css";

const EXCERPT_WORDS = 7;

export function formatSeconds(totalSeconds) {
  const seconds = Math.max(0, totalSeconds);
  const minutes = Math.floor(seconds / 60);

  return `${minutes}:${String(seconds % 60).padStart(2, "0")}`;
}

// "Afsnit 2 · En vigtig grund er, at mange køber…" for paragraph questions
function describeParagraphs(text) {
  const paragraphs = {};
  let number = 0;

  for (const block of text.blocks) {
    if (block.type !== "paragraph") continue;

    number += 1;

    const words = block.text.split(" ");

    paragraphs[block.id] = {
      number,
      excerpt:
        words.length > EXCERPT_WORDS
          ? `${words.slice(0, EXCERPT_WORDS).join(" ")} …`
          : block.text,
    };
  }

  return paragraphs;
}

/*
  One text: preview (optional) → quick reading → questions.
  mode "practice": each answer is checked right away, with strategy feedback
  mode "check": answer, move on; the results come in the review
*/
function TextItem({ item, mode, itemNumber, itemCount, isLast, onDone }) {
  const { text, questions } = item;

  const [phase, setPhase] = useState(item.preview ? "preview" : "read");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState({});
  const [hintShown, setHintShown] = useState({});
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [readSeconds, setReadSeconds] = useState(null);

  const readStartRef = useRef(null);
  const headingRef = useRef(null);
  const isFirstRenderRef = useRef(true);

  const question = questions[questionIndex];
  const isLastQuestion = questionIndex === questions.length - 1;
  const isPractice = mode === "practice";

  // count up while reading; the target guides, it never stops the learner
  useEffect(() => {
    if (phase !== "read") return;

    readStartRef.current = Date.now();

    const timer = setInterval(() => {
      setElapsedSeconds(
        Math.round((Date.now() - readStartRef.current) / 1000),
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [phase]);

  // move focus to the panel heading when the step changes
  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }

    headingRef.current?.focus();
  }, [phase, questionIndex]);

  function finishReading() {
    setReadSeconds(
      Math.round((Date.now() - readStartRef.current) / 1000),
    );
    setPhase("questions");
  }

  function setAnswer(value) {
    setAnswers((current) => ({ ...current, [question.id]: value }));
  }

  function buildResults() {
    return questions.map((entry) => ({
      questionId: entry.id,
      subskill: entry.subskill,
      prompt: entry.prompt,
      textSlug: text.slug,
      textTitle: text.title,
      givenAnswer: formatGivenAnswer(entry, answers[entry.id]),
      correctAnswer: formatCorrectAnswer(entry),
      explanation: entry.explanation,
      isCorrect: isAnswerCorrect(entry, answers[entry.id]),
      points: scoreAnswer(entry, answers[entry.id]),
      maxPoints: maxPoints(entry),
      hintUsed: Boolean(hintShown[entry.id]),
      readSeconds,
      targetSeconds: text.targetSeconds,
    }));
  }

  function goOn() {
    if (isLastQuestion) {
      onDone(buildResults());
      return;
    }

    setQuestionIndex(questionIndex + 1);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!isAnswerComplete(question, answers[question.id])) return;

    if (isPractice && !checked[question.id]) {
      setChecked((current) => ({ ...current, [question.id]: true }));
      return;
    }

    goOn();
  }

  const isChecked = isPractice && Boolean(checked[question.id]);
  const isCorrect = isAnswerCorrect(question, answers[question.id]);
  const textLabel = `Tekst ${itemNumber} af ${itemCount}`;

  let panel;
  let panelSummary;

  if (phase === "preview") {
    panelSummary = `${textLabel} · Forhåndsvisning`;

    panel = (
      <div className={styles.panel}>
        <p className={styles.step}>{textLabel} · Forhåndsvisning</p>

        <h2 ref={headingRef} tabIndex={-1} className={styles.title}>
          Kig kun på titlen
        </h2>

        <p className={styles.text}>
          Titlen fortæller meget, før du læser brødteksten. Hvad tror du,
          teksten handler om? Hvilke slags afsnit forventer du?
        </p>

        <div className={styles.actions}>
          <Button onClick={() => setPhase("read")}>Start læsningen</Button>
        </div>
      </div>
    );
  } else if (phase === "read") {
    const target = text.targetSeconds;
    const isOverTarget = elapsedSeconds > target;

    panelSummary = `${textLabel} · Hurtig læsning · ${formatSeconds(elapsedSeconds)}`;

    panel = (
      <div className={styles.panel}>
        <p className={styles.step}>{textLabel} · Hurtig læsning</p>

        <h2 ref={headingRef} tabIndex={-1} className={styles.title}>
          Skim teksten for helheden
        </h2>

        <div className={styles.timerCard}>
          <div className={styles.timerRow}>
            <p className={styles.timer} role="timer">
              {formatSeconds(elapsedSeconds)}
            </p>

            <p className={styles.meta}>Mål: ca. {target} sek.</p>
          </div>

          <div className={styles.track} aria-hidden="true">
            <div
              className={styles.fill}
              style={{
                width: `${Math.min(100, (elapsedSeconds / target) * 100)}%`,
              }}
            />
          </div>

          <p className={styles.meta}>
            {isOverTarget
              ? "Over målet – det er helt i orden. Næste gang kan du prøve at læse færre detaljer."
              : "Målet er en vejledning, ikke en tidsgrænse. Teksten forsvinder ikke."}
          </p>
        </div>

        <ul className={styles.tips}>
          <li>Læs første sætning i hvert afsnit.</li>
          <li>Spring tal, navne og eksempler over.</li>
          <li>Hold øje med ord som »men«, »til gengæld« og »derfor«.</li>
        </ul>

        <div className={styles.actions}>
          <Button onClick={finishReading}>Jeg har skimmet teksten</Button>
        </div>
      </div>
    );
  } else {
    const counter =
      questions.length > 1
        ? `${textLabel} · Spørgsmål ${questionIndex + 1} af ${questions.length}`
        : textLabel;

    panelSummary = counter;

    const nextLabel = !isLastQuestion
      ? "Næste spørgsmål"
      : isLast
        ? "Fortsæt"
        : "Næste tekst";

    panel = (
      <form className={styles.panel} onSubmit={handleSubmit}>
        <p ref={headingRef} tabIndex={-1} className={styles.step}>
          {counter}
        </p>

        <SkimmingQuestion
          key={question.id}
          question={question}
          paragraphs={describeParagraphs(text)}
          answer={answers[question.id]}
          onAnswer={setAnswer}
          reveal={isChecked}
        />

        {isPractice && question.hint && !isChecked && (
          <div className={styles.hintArea}>
            {hintShown[question.id] ? (
              <p className={styles.hint}>
                <strong>Tip:</strong> {question.hint}
              </p>
            ) : (
              <button
                type="button"
                className={styles.linkButton}
                onClick={() =>
                  setHintShown((current) => ({
                    ...current,
                    [question.id]: true,
                  }))
                }
              >
                Få et tip
              </button>
            )}
          </div>
        )}

        <div role="status" className={styles.status}>
          {isChecked && (
            <div
              className={[
                styles.feedback,
                isCorrect ? styles.feedbackCorrect : styles.feedbackWrong,
              ].join(" ")}
            >
              <p className={styles.feedbackTitle}>
                {isCorrect ? "Rigtigt!" : "Ikke helt"}
              </p>

              {question.type === "paragraph_functions" && (
                <p>
                  {scoreAnswer(question, answers[question.id])} af{" "}
                  {maxPoints(question)} afsnit rigtige.
                </p>
              )}

              <p>
                <strong>Sådan kunne du se det:</strong>{" "}
                {question.explanation}
              </p>

              <p className={styles.legend}>
                I teksten er signalordene markeret
                {question.marks.some((mark) => mark.kind === "detail") &&
                  ", og detaljerne er understreget"}
                .
              </p>
            </div>
          )}
        </div>

        {readSeconds !== null && isChecked && isLastQuestion && (
          <p className={styles.meta}>
            Læsetid: {formatSeconds(readSeconds)} (mål ca.{" "}
            {text.targetSeconds} sek.)
          </p>
        )}

        <div className={styles.actions}>
          <Button
            type="submit"
            disabled={!isAnswerComplete(question, answers[question.id])}
          >
            {isPractice && !isChecked ? "Tjek svar" : nextLabel}
          </Button>
        </div>
      </form>
    );
  }

  return (
    <SplitReader
      document={
        <SkimmingText
          text={text}
          preview={phase === "preview"}
          marks={isChecked ? question.marks : []}
        />
      }
      panel={panel}
      panelLabel={phase === "questions" ? "Spørgsmål" : "Opgave"}
      panelSummary={panelSummary}
    />
  );
}

export default function TextStage({ stage, mode, onComplete }) {
  const [itemIndex, setItemIndex] = useState(0);
  const [results, setResults] = useState([]);

  const startedAtRef = useRef(null);

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  const isLast = itemIndex === stage.items.length - 1;

  function handleItemDone(itemResults) {
    const allResults = [...results, ...itemResults];

    if (isLast) {
      onComplete({
        results: allResults,
        seconds: Math.round((Date.now() - startedAtRef.current) / 1000),
      });
      return;
    }

    setResults(allResults);
    setItemIndex(itemIndex + 1);
  }

  return (
    <TextItem
      key={itemIndex}
      item={stage.items[itemIndex]}
      mode={mode}
      itemNumber={itemIndex + 1}
      itemCount={stage.items.length}
      isLast={isLast}
      onDone={handleItemDone}
    />
  );
}
