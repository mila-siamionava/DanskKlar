"use client";

import { useEffect, useRef, useState } from "react";

import Button from "@/components/ui/Button/Button";
import {
  checkAnswer,
  formatCorrectAnswer,
} from "@/lib/reading/checkAnswer";

import ScanningDocument from "../ScanningDocument/ScanningDocument";
import ScanningQuestion from "../ScanningQuestion/ScanningQuestion";
import SplitReader from "@/components/reading/SplitReader/SplitReader";

import styles from "./QuestionStage.module.css";

export function formatSeconds(totalSeconds) {
  const seconds = Math.max(0, totalSeconds);
  const minutes = Math.floor(seconds / 60);

  return `${minutes}:${String(seconds % 60).padStart(2, "0")}`;
}

function formatGivenAnswer(question, answer) {
  if (answer === undefined || answer === null || answer === "") {
    return "Intet svar";
  }

  if (question.type === "true_false") {
    return answer ? "Sandt" : "Falsk";
  }

  if (question.type === "multiple_choice") {
    return question.options.find((option) => option.id === answer)?.text;
  }

  return answer;
}

function hasAnswer(answer) {
  return typeof answer === "string"
    ? answer.trim() !== ""
    : answer !== undefined;
}

/*
  feedbackMode "immediate": check each answer right away (prøv selv, øv med hjælp)
  feedbackMode "end": answer everything, then hand in (øv selv, test dig selv)
*/
export default function QuestionStage({
  stage,
  feedbackMode,
  withHints = false,
  useTimer = false,
  onComplete,
}) {
  const { document, questions } = stage;

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState({});
  const [hintLevels, setHintLevels] = useState({});

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(
    stage.timeLimitSeconds ?? 0,
  );
  const [shownEvidence, setShownEvidence] = useState([]);

  const startedAtRef = useRef(null);
  const counterRef = useRef(null);
  const isFirstQuestionRef = useRef(true);

  const isTimed = useTimer && Boolean(stage.timeLimitSeconds);
  const question = questions[index];
  const isLast = index === questions.length - 1;

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  // countdown; when it runs out the answers are handed in
  useEffect(() => {
    if (!isTimed || isSubmitted) return;

    const deadline =
      startedAtRef.current + stage.timeLimitSeconds * 1000;

    const timer = setInterval(() => {
      const left = Math.ceil((deadline - Date.now()) / 1000);

      if (left <= 0) {
        clearInterval(timer);
        setIsTimeUp(true);
        setElapsedSeconds(stage.timeLimitSeconds);
        setIsSubmitted(true);
        return;
      }

      setSecondsLeft(left);
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimed, isSubmitted, stage.timeLimitSeconds]);

  // move focus to the new question, but not on the first one
  useEffect(() => {
    if (isFirstQuestionRef.current) {
      isFirstQuestionRef.current = false;
      return;
    }

    counterRef.current?.focus();
  }, [index]);

  function secondsSinceStart() {
    return Math.round((Date.now() - startedAtRef.current) / 1000);
  }

  function buildResults() {
    return questions.map((item) => ({
      questionId: item.id,
      subskill: item.subskill,
      prompt: item.prompt,
      givenAnswer: formatGivenAnswer(item, answers[item.id]),
      correctAnswer: formatCorrectAnswer(item),
      explanation: item.explanation,
      isCorrect: checkAnswer(item, answers[item.id]),
      hintsUsed: hintLevels[item.id] ?? 0,
    }));
  }

  function finish() {
    onComplete({
      results: buildResults(),
      seconds: isSubmitted ? elapsedSeconds : secondsSinceStart(),
    });
  }

  function setAnswer(value) {
    setAnswers((current) => ({
      ...current,
      [question.id]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (feedbackMode === "immediate") {
      if (!checked[question.id] && hasAnswer(answers[question.id])) {
        setChecked((current) => ({ ...current, [question.id]: true }));
      }

      return;
    }

    if (!isLast) {
      setIndex(index + 1);
    }
  }

  function handIn() {
    setElapsedSeconds(secondsSinceStart());
    setIsSubmitted(true);
  }

  function goToNextQuestion() {
    if (isLast) {
      finish();
      return;
    }

    setIndex(index + 1);
  }

  function showNextHint() {
    setHintLevels((current) => ({
      ...current,
      [question.id]: (current[question.id] ?? 0) + 1,
    }));
  }

  // ---------- immediate feedback ----------

  if (feedbackMode === "immediate") {
    const isChecked = Boolean(checked[question.id]);
    const isCorrect = checkAnswer(question, answers[question.id]);
    const hintLevel = hintLevels[question.id] ?? 0;

    const highlight =
      isChecked || hintLevel >= 3 ? question.evidence : [];

    const panel = (
      <form className={styles.form} onSubmit={handleSubmit}>
        <p
          ref={counterRef}
          tabIndex={-1}
          className={styles.counter}
        >
          Spørgsmål {index + 1} af {questions.length}
        </p>

        <ScanningQuestion
          key={question.id}
          question={question}
          number={index + 1}
          answer={answers[question.id]}
          onAnswer={setAnswer}
          reveal={isChecked}
        />

        {withHints && question.hints && !isChecked && (
          <div className={styles.hints}>
            {hintLevel >= 1 && (
              <p className={styles.hint}>
                <strong>Tip 1:</strong> {question.hints.strategy}
              </p>
            )}

            {hintLevel >= 2 && (
              <p className={styles.hint}>
                <strong>Tip 2:</strong> {question.hints.location}
              </p>
            )}

            {hintLevel >= 3 && (
              <p className={styles.hint}>
                <strong>Tip 3:</strong> Svaret står i det markerede
                område i dokumentet.
              </p>
            )}

            {hintLevel < 3 && (
              <button
                type="button"
                className={styles.hintButton}
                onClick={showNextHint}
              >
                {hintLevel === 2
                  ? "Vis, hvor svaret står"
                  : `Få et tip (${hintLevel + 1} af 3)`}
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

              {!isCorrect && (
                <p>
                  Rigtigt svar:{" "}
                  <strong>{formatCorrectAnswer(question)}</strong>
                </p>
              )}

              <p>{question.explanation}</p>
            </div>
          )}
        </div>

        <div className={styles.actions}>
          {isChecked ? (
            <Button onClick={goToNextQuestion}>
              {isLast ? "Fortsæt" : "Næste spørgsmål"}
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={!hasAnswer(answers[question.id])}
            >
              Tjek svar
            </Button>
          )}
        </div>
      </form>
    );

    return (
      <SplitReader
        document={
          <ScanningDocument document={document} highlight={highlight} />
        }
        panel={panel}
        panelLabel="Spørgsmål"
        panelSummary={`Spørgsmål ${index + 1} af ${questions.length}`}
      />
    );
  }

  // ---------- results after handing in ----------

  if (isSubmitted) {
    const results = buildResults();
    const correctCount = results.filter((result) => result.isCorrect).length;

    const panel = (
      <div className={styles.results}>
        {isTimeUp && (
          <p className={styles.timeUp} role="status">
            Tiden er gået. Dine svar er afleveret.
          </p>
        )}

        <h3 className={styles.score}>
          {correctCount} af {results.length} rigtige
        </h3>

        <p className={styles.meta}>
          Tid: {formatSeconds(elapsedSeconds)}
        </p>

        <ol className={styles.resultList}>
          {results.map((result, resultIndex) => (
            <li
              key={result.questionId}
              className={[
                styles.resultItem,
                result.isCorrect ? styles.resultCorrect : styles.resultWrong,
              ].join(" ")}
            >
              <p className={styles.resultPrompt}>
                {resultIndex + 1}. {result.prompt}
              </p>

              <p>
                <strong>
                  {result.isCorrect ? "Rigtigt" : "Forkert"}
                </strong>
                {" · "}Dit svar: {result.givenAnswer}
              </p>

              {!result.isCorrect && (
                <p>Rigtigt svar: {result.correctAnswer}</p>
              )}

              <p className={styles.explanation}>{result.explanation}</p>

              <button
                type="button"
                className={styles.linkButton}
                onClick={() =>
                  setShownEvidence(questions[resultIndex].evidence)
                }
              >
                Vis i teksten
              </button>
            </li>
          ))}
        </ol>

        <div className={styles.actions}>
          <Button onClick={finish}>Fortsæt</Button>
        </div>
      </div>
    );

    return (
      <SplitReader
        document={
          <ScanningDocument document={document} highlight={shownEvidence} />
        }
        panel={panel}
        panelLabel="Resultat"
        panelSummary={`Resultat: ${correctCount} af ${results.length} rigtige`}
      />
    );
  }

  // ---------- answering, hand in at the end ----------

  const answeredCount = questions.filter((item) =>
    hasAnswer(answers[item.id]),
  ).length;

  const panel = (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.stageHeader}>
        <p ref={counterRef} tabIndex={-1} className={styles.counter}>
          Spørgsmål {index + 1} af {questions.length}
        </p>

        {isTimed && (
          <p className={styles.timer} role="timer">
            Tid tilbage: {formatSeconds(secondsLeft)}
          </p>
        )}
      </div>

      <nav className={styles.questionNav} aria-label="Spørgsmål">
        {questions.map((item, itemIndex) => (
          <button
            key={item.id}
            type="button"
            className={[
              styles.questionNavItem,
              hasAnswer(answers[item.id]) ? styles.answered : "",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-current={itemIndex === index ? "step" : undefined}
            aria-label={`Spørgsmål ${itemIndex + 1}${
              hasAnswer(answers[item.id]) ? ", besvaret" : ""
            }`}
            onClick={() => setIndex(itemIndex)}
          >
            {itemIndex + 1}
          </button>
        ))}
      </nav>

      <ScanningQuestion
        key={question.id}
        question={question}
        number={index + 1}
        answer={answers[question.id]}
        onAnswer={setAnswer}
      />

      <div className={styles.actions}>
        {index > 0 && (
          <Button variant="secondary" onClick={() => setIndex(index - 1)}>
            Forrige
          </Button>
        )}

        {!isLast && <Button type="submit">Næste</Button>}

        {isLast && <Button onClick={handIn}>Aflevér</Button>}
      </div>

      {isLast && answeredCount < questions.length && (
        <p className={styles.meta}>
          Du har besvaret {answeredCount} af {questions.length} spørgsmål.
        </p>
      )}
    </form>
  );

  return (
    <SplitReader
      document={<ScanningDocument document={document} />}
      panel={panel}
      panelLabel="Spørgsmål"
      panelSummary={
        isTimed
          ? `Spørgsmål ${index + 1} af ${questions.length} · ${formatSeconds(secondsLeft)}`
          : `Spørgsmål ${index + 1} af ${questions.length}`
      }
    />
  );
}
