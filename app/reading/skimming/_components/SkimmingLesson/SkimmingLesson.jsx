"use client";

import Link from "next/link";
import { useState } from "react";

import { BookMark } from "@/components/brand/Logo/Logo";
import BackLink from "@/components/navigation/BackLink/BackLink";
import Button from "@/components/ui/Button/Button";

import LessonReview from "../LessonReview/LessonReview";
import SkimmingWalkthrough from "../SkimmingWalkthrough/SkimmingWalkthrough";
import TextStage from "../TextStage/TextStage";

import styles from "./SkimmingLesson.module.css";

const STAGE_INFO = {
  walkthrough: {
    label: "Se hvordan",
    intro: "Se, hvordan en god læser får overblik over en tekst uden at gå i detaljer.",
  },
  practice: {
    label: "Øv med hjælp",
    intro: "Skim teksten, og svar på spørgsmålet. Du får feedback med det samme og kan få et tip.",
  },
  check: {
    label: "Test dig selv",
    intro: "Nye tekster uden tips. Du ser svarene i gennemgangen. Målet er mindst 85 % rigtige.",
  },
  review: {
    label: "Gennemgang",
  },
};

/*
  Runs one lesson: see how → practise → test → review.
  Each stage starts with a short intro, so the learner knows what comes next.
*/
export default function SkimmingLesson({ lesson }) {
  const [stageIndex, setStageIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [stageResults, setStageResults] = useState({});
  const [attempt, setAttempt] = useState(0);

  const stage = lesson.stages[stageIndex];
  const info = STAGE_INFO[stage.kind];

  function completeStage(result) {
    if (result) {
      setStageResults((current) => ({
        ...current,
        [stage.kind]: result,
      }));
    }

    setStageIndex(stageIndex + 1);
    setIsStarted(false);
  }

  function restart() {
    setStageIndex(0);
    setIsStarted(false);
    setStageResults({});
    setAttempt(attempt + 1);
  }

  function renderStage() {
    if (stage.kind === "review") {
      return (
        <LessonReview
          lesson={lesson}
          stageResults={stageResults}
          onRestart={restart}
        />
      );
    }

    if (!isStarted) {
      return (
        <div className={styles.intro}>
          <p className={styles.introStep}>
            Trin {stageIndex + 1} af {lesson.stages.length}
          </p>

          <h2 className={styles.introTitle}>{info.label}</h2>

          <p className={styles.introText}>{info.intro}</p>

          {stage.items && (
            <p className={styles.introMeta}>
              {stage.items.length} korte tekster
            </p>
          )}

          <div className={styles.introActions}>
            <Button onClick={() => setIsStarted(true)}>Start</Button>
          </div>
        </div>
      );
    }

    if (stage.kind === "walkthrough") {
      return (
        <SkimmingWalkthrough
          stage={stage}
          onComplete={() => completeStage()}
        />
      );
    }

    return (
      <TextStage
        stage={stage}
        mode={stage.kind}
        onComplete={completeStage}
      />
    );
  }

  return (
    <main className={styles.page}>
      <header className={styles.topBar}>
        <Link
          href="/"
          className={styles.home}
          aria-label="DanskKlar – til forsiden"
        >
          <BookMark />
        </Link>

        <BackLink
          href="/reading/skimming"
          label="Tilbage til skimming"
        />

        <div className={styles.heading}>
          <h1 className={styles.title}>{lesson.title}</h1>

          <p className={styles.stageLabel}>
            {info.label} · trin {stageIndex + 1} af {lesson.stages.length}
          </p>
        </div>
      </header>

      <div
        className={styles.progress}
        role="progressbar"
        aria-label="Fremskridt i lektionen"
        aria-valuemin={0}
        aria-valuemax={lesson.stages.length}
        aria-valuenow={stageIndex + 1}
      >
        <div
          className={styles.progressFill}
          style={{
            width: `${((stageIndex + 1) / lesson.stages.length) * 100}%`,
          }}
        />
      </div>

      <div
        key={`${attempt}-${stageIndex}`}
        className={styles.stage}
      >
        {renderStage()}
      </div>
    </main>
  );
}
