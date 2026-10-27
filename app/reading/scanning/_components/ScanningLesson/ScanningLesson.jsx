"use client";

import Link from "next/link";
import { useState } from "react";

import { BookMark } from "@/components/brand/Logo/Logo";
import BackLink from "@/components/navigation/BackLink/BackLink";
import Button from "@/components/ui/Button/Button";

import LessonReview from "../LessonReview/LessonReview";
import QuestionStage from "../QuestionStage/QuestionStage";
import Walkthrough from "../Walkthrough/Walkthrough";

import styles from "./ScanningLesson.module.css";

const STAGE_INFO = {
  try: {
    label: "Prøv selv",
    intro: "Løs et par små opgaver i dokumentet. Du får ingen hjælp endnu – bare prøv.",
  },
  walkthrough: {
    label: "Se hvordan",
    intro: "Se, hvordan en god læser finder svaret hurtigt uden at læse hele teksten.",
  },
  guided: {
    label: "Øv med hjælp",
    intro: "Nu bruger du teknikken. Sidder du fast, kan du få op til tre tips.",
  },
  independent: {
    label: "Øv selv",
    intro: "Et længere dokument med flere spørgsmål og ingen tips. Du ser svarene, når du afleverer.",
  },
  check: {
    label: "Test dig selv",
    intro: "Et nyt dokument. Målet er mindst 85 % rigtige.",
  },
  review: {
    label: "Gennemgang",
  },
};

const MIXED_INTRO =
  "Ét dokument med spørgsmål om tal, nøgleord og regler. Brug den teknik, der passer til hvert spørgsmål.";

/*
  Runs one lesson: test → teach → test.
  Each stage starts with a short intro, so the learner knows what comes next
  and can choose to practise with or without a timer.
*/
export default function ScanningLesson({ lesson }) {
  const [stageIndex, setStageIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [useTimer, setUseTimer] = useState(false);
  const [stageResults, setStageResults] = useState({});
  const [attempt, setAttempt] = useState(0);

  const stage = lesson.stages[stageIndex];
  const info = STAGE_INFO[stage.kind];
  const isTimedStage = Boolean(stage.timeLimitSeconds);

  function goToNextStage() {
    setStageIndex(stageIndex + 1);
    setIsStarted(false);
  }

  function completeStage(result) {
    if (result) {
      setStageResults((current) => ({
        ...current,
        [stage.kind]: result,
      }));
    }

    goToNextStage();
  }

  function start(withTimer) {
    setUseTimer(withTimer);
    setIsStarted(true);
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
      const intro =
        lesson.isMixed && stage.kind === "check"
          ? MIXED_INTRO
          : info.intro;

      return (
        <div className={styles.intro}>
          <p className={styles.introStep}>
            Trin {stageIndex + 1} af {lesson.stages.length}
          </p>

          <h2 className={styles.introTitle}>{info.label}</h2>

          <p className={styles.introText}>{intro}</p>

          {stage.questions && (
            <p className={styles.introMeta}>
              {stage.document.title} · {stage.questions.length} spørgsmål
            </p>
          )}

          <div className={styles.introActions}>
            {isTimedStage ? (
              <>
                <Button onClick={() => start(true)}>
                  Med tid ({Math.round(stage.timeLimitSeconds / 60)} min)
                </Button>

                <Button variant="secondary" onClick={() => start(false)}>
                  Uden tid
                </Button>
              </>
            ) : (
              <Button onClick={() => start(false)}>Start</Button>
            )}
          </div>
        </div>
      );
    }

    if (stage.kind === "walkthrough") {
      return (
        <Walkthrough stage={stage} onComplete={() => completeStage()} />
      );
    }

    return (
      <QuestionStage
        stage={stage}
        feedbackMode={
          stage.kind === "try" || stage.kind === "guided"
            ? "immediate"
            : "end"
        }
        withHints={stage.kind === "guided"}
        useTimer={useTimer}
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
          href="/reading/scanning"
          label="Tilbage til skanning"
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
