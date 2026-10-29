"use client";

import { useEffect, useState } from "react";

import Button from "@/components/ui/Button/Button";

import SkimmingText from "../SkimmingText/SkimmingText";
import SplitReader from "@/components/reading/SplitReader/SplitReader";

import styles from "./SkimmingWalkthrough.module.css";

const STEP_DURATION_MS = 5000;

/*
  Shows how an efficient reader skims one text:
  each step marks the clues the eyes pick up and fades out the rest.
  Plays by itself, or step by step with the buttons.
*/
export default function SkimmingWalkthrough({ stage, onComplete }) {
  const { steps } = stage;

  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const step = steps[stepIndex];
  const isLastStep = stepIndex === steps.length - 1;

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      const next = stepIndex + 1;

      setStepIndex(next);

      if (next >= steps.length - 1) {
        setIsPlaying(false);
      }
    }, STEP_DURATION_MS);

    return () => clearTimeout(timer);
  }, [isPlaying, stepIndex, steps.length]);

  function restart() {
    setStepIndex(0);
    setIsPlaying(true);
  }

  const panel = (
    <div className={styles.walkthrough}>
      <div className={styles.questionBox}>
        <p className={styles.label}>Spørgsmål</p>
        <p className={styles.question}>{stage.question}</p>
      </div>

      <ol className={styles.dots} aria-hidden="true">
        {steps.map((item, index) => (
          <li
            key={index}
            className={index <= stepIndex ? styles.dotDone : ""}
          />
        ))}
      </ol>

      <div aria-live="polite" className={styles.step}>
        <p className={styles.label}>
          Trin {stepIndex + 1} af {steps.length}
        </p>

        <p className={styles.stepText}>{step.text}</p>
      </div>

      {isLastStep && (
        <p className={styles.answer}>
          <strong>Svar:</strong> {stage.answer}
        </p>
      )}

      <div className={styles.controls}>
        <Button
          variant="secondary"
          disabled={stepIndex === 0}
          onClick={() => {
            setIsPlaying(false);
            setStepIndex(stepIndex - 1);
          }}
        >
          Forrige
        </Button>

        {!isLastStep && (
          <Button
            variant="secondary"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? "Pause" : "Afspil"}
          </Button>
        )}

        {!isLastStep && (
          <Button
            onClick={() => {
              setIsPlaying(false);
              setStepIndex(stepIndex + 1);
            }}
          >
            Næste
          </Button>
        )}

        {isLastStep && (
          <Button variant="secondary" onClick={restart}>
            Se igen
          </Button>
        )}

        {isLastStep && (
          <Button onClick={onComplete}>Fortsæt</Button>
        )}
      </div>
    </div>
  );

  return (
    <SplitReader
      document={
        <SkimmingText text={stage.text} marks={step.marks} dimOthers />
      }
      panel={panel}
      panelLabel="Gennemgang"
      panelSummary={`Trin ${stepIndex + 1} af ${steps.length}`}
    />
  );
}
