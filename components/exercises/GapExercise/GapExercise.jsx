"use client";

import { Fragment, useEffect, useState } from "react";

import ExerciseHeader from "@/components/exercises/ExerciseHeader/ExerciseHeader";
import GapSelect from "@/components/exercises/GapSelect/GapSelect";
import AnswerFeedback from "@/components/exercises/AnswerFeedback/AnswerFeedback";
import ProgressBar from "@/components/ui/ProgressBar/ProgressBar";
import Button from "@/components/ui/Button/Button";

import { recordWordEncounter } from "@/lib/progress/activityLog";
import { useActivitySession } from "@/lib/progress/useActivitySession";
import { addReviewItem } from "@/lib/reviewStorage";

import styles from "./GapExercise.module.css";

export default function GapExercise({ exercise }) {
  const [answers, setAnswers] = useState({});

  const [activeFeedbackId, setActiveFeedbackId] = useState(null);

  const totalQuestions = exercise.questions.length;

  const answeredCount = Object.keys(answers).length;

  const score = exercise.questions.filter(
    (question) => answers[question.id]?.firstIsCorrect === true,
  ).length;

  const isComplete = answeredCount === totalQuestions;

  const session = useActivitySession({
    area: "texts",
    activity: exercise.exerciseType,
    title: exercise.title,
  });

  // saved once all gaps are answered; the score counts first attempts
  useEffect(() => {
    if (isComplete) {
      session.finish({ points: score, max: totalQuestions });
    }
  }, [isComplete, score, totalQuestions, session]);

  function getGapContext(questionId) {
    const placeholder = `{{${questionId}}}`;

    const paragraphs = exercise.content
      .split("\n")
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);

    const paragraph = paragraphs.find((paragraph) =>
      paragraph.includes(placeholder),
    );

    if (!paragraph) {
      return "";
    }

    return paragraph.replace(placeholder, "{{gap}}");
  }

  function addWrongVocabularyToReview(question, selectedOptionId) {
    const selectedOption = question.options.find(
      (option) => option.id === selectedOptionId,
    );

    if (!selectedOption?.vocabularyId) {
      return;
    }

    const gapContext = getGapContext(question.id);

    const correctOption = question.options.find(
      (option) => option.id === question.correctOptionId,
    );

    addReviewItem({
      id: selectedOption.vocabularyId,

      vocabularyId: selectedOption.vocabularyId,

      term: selectedOption.text?.toLowerCase() || "",

      exerciseTitle: exercise.title,

      exerciseId: exercise.id,

      questionId: question.id,

      sourceType: "text",

      sourceKey: exercise.slug,

      exerciseType: exercise.exerciseType,

      reason: "wrong_answer",

      gapSentence: gapContext,

      originalCorrectAnswer: correctOption?.text?.toLowerCase() || "",

      options: question.options,

      correctOptionId: question.correctOptionId,

      explanation: question.explanation,
    });
  }

  function handleAnswer(questionId, optionId) {
    const question = exercise.questions.find((item) => item.id === questionId);

    if (!question) {
      return;
    }

    const previousAnswer = answers[questionId];

    const isFirstAttempt = !previousAnswer;

    const isCorrect = optionId === question.correctOptionId;

    if (!isCorrect) {
      setActiveFeedbackId(questionId);
    } else {
      setActiveFeedbackId(null);
    }

    if (!isCorrect && exercise.exerciseType === "vocabulary_gap") {
      addWrongVocabularyToReview(question, optionId);
    }

    // choosing the right word in context counts as recognising it
    if (isFirstAttempt && exercise.exerciseType === "vocabulary_gap") {
      const correctOption = question.options.find(
        (option) => option.id === question.correctOptionId,
      );

      if (correctOption?.vocabularyId) {
        recordWordEncounter(
          {
            id: correctOption.vocabularyId,
            term: correctOption.text?.toLowerCase(),
          },
          "gen",
          isCorrect,
        );
      }
    }

    setAnswers((previousAnswers) => {
      const previousAnswer = previousAnswers[questionId];

      if (!previousAnswer) {
        return {
          ...previousAnswers,

          [questionId]: {
            selectedOptionId: optionId,

            firstOptionId: optionId,

            firstIsCorrect: isCorrect,
          },
        };
      }

      return {
        ...previousAnswers,

        [questionId]: {
          ...previousAnswer,

          selectedOptionId: optionId,
        },
      };
    });
  }

  function renderContent() {
    const parts = exercise.content.split(/(\{\{\d+\}\})/);

    return parts.map((part, index) => {
      const match = part.match(/\{\{(\d+)\}\}/);

      if (!match) {
        return <Fragment key={index}>{part}</Fragment>;
      }

      const questionId = Number(match[1]);

      const question = exercise.questions.find(
        (item) => item.id === questionId,
      );

      if (!question) {
        return <Fragment key={index}>{part}</Fragment>;
      }

      const answer = answers[questionId];

      const selectedOptionId = answer?.selectedOptionId || "";

      return (
        <span key={`${questionId}-${index}`} className={styles.gapWrapper}>
          <GapSelect
            question={question}
            value={selectedOptionId}
            checked={Boolean(selectedOptionId)}
            onChange={handleAnswer}
          />

          {activeFeedbackId === questionId && (
            <AnswerFeedback
              question={question}
              selectedOptionId={selectedOptionId}
            />
          )}
        </span>
      );
    });
  }

  return (
    <div className={styles.exercise}>
      <ExerciseHeader
        title={exercise.title}
        instructions={exercise.instructions}
      />

      <ProgressBar
        value={answeredCount}
        max={totalQuestions}
        label={`${answeredCount} af ${totalQuestions} besvaret`}
      />

      <section className={styles.content}>{renderContent()}</section>

      {answeredCount === totalQuestions && (
        <>
          <section className={styles.result} aria-live="polite">
            <div>
              <p className={styles.resultLabel}>Exercise complete</p>

              <p className={styles.resultScore}>
                {score} of {totalQuestions} correct on the first attempt
              </p>
            </div>

            <p className={styles.resultPercentage}>
              {Math.round((score / totalQuestions) * 100)}%
            </p>
          </section>

          <div className={styles.reviewActions}>
            <Button href="/review" variant="secondary" size="md">
              Gem forkerte svar og træn dem
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
