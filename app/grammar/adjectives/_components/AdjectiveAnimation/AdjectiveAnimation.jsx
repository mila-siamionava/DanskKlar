"use client";

import { useEffect, useState } from "react";
import { Car, House, Pause, Play } from "lucide-react";

import NounPhrase from "../NounPhrase/NounPhrase";

import styles from "./AdjectiveAnimation.module.css";

const pictures = { car: Car, house: House };

/*
  One scene plays in four phases, like a short gif:
  0 the noun alone, 1 "+ grøn" appears, 2 grøn moves in, 3 the ending grows.
  After the last scene a rule card shows, then everything loops.
*/
const PHASE_MS = [1400, 1300, 1300, 2800];
const SUMMARY_MS = 6000;
const LAST_PHASE = PHASE_MS.length - 1;

const captions = [
  (scene) => `Navneordet: ${scene.group}`,
  (scene) => `Vi tilføjer adjektivet ${scene.adjective.stem}`,
  () => "Adjektivet står foran navneordet",
  (scene) => scene.rule,
];

export default function AdjectiveAnimation({ lesson }) {
  const { scenes, summary } = lesson;
  const frameCount = scenes.length + 1; // + the rule card

  const [frame, setFrame] = useState(0);
  const [phase, setPhase] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);

  // without motion: no autoplay, every scene shows its result
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");

    function update() {
      setReduceMotion(query.matches);

      if (query.matches) setIsPlaying(false);
    }

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  const isSummary = frame === scenes.length;
  const shownPhase = reduceMotion ? LAST_PHASE : phase;

  useEffect(() => {
    if (!isPlaying) return;

    const delay = isSummary ? SUMMARY_MS : PHASE_MS[phase];

    const timer = setTimeout(() => {
      if (!isSummary && phase < LAST_PHASE) {
        setPhase(phase + 1);
        return;
      }

      setFrame((frame + 1) % frameCount);
      setPhase(0);
    }, delay);

    return () => clearTimeout(timer);
  }, [isPlaying, isSummary, phase, frame, frameCount]);

  function goTo(index) {
    setFrame(index);
    setPhase(0);
  }

  function togglePlaying() {
    // a finished scene starts over instead of jumping straight on
    if (!isPlaying && !isSummary && phase === LAST_PHASE) setPhase(0);

    setIsPlaying(!isPlaying);
  }

  const scene = scenes[frame];

  return (
    <figure className={styles.player}>
      <div className={styles.screen}>
        <div className={styles.stage} aria-hidden="true">
          {isSummary ? (
            <RuleCard
              key="summary"
              scenes={scenes}
              summary={summary}
            />
          ) : (
            // key: a new scene starts closed, without animating shut
            <Scene key={scene.id} scene={scene} phase={shownPhase} />
          )}
        </div>

        {!reduceMotion && (
          <button
            type="button"
            className={styles.playButton}
            onClick={togglePlaying}
            aria-label={isPlaying ? "Pause animationen" : "Afspil animationen"}
          >
            {isPlaying ? (
              <Pause size={20} aria-hidden="true" />
            ) : (
              <Play size={20} aria-hidden="true" />
            )}
          </button>
        )}
      </div>

      <figcaption className={styles.caption}>
        {isSummary
          ? "Reglen"
          : captions[shownPhase](scene)}
      </figcaption>

      <nav aria-label="Scener">
        <ol className={styles.frames}>
          {[...scenes, null].map((item, index) => {
            const label = item
              ? `${item.article ?? ""} ${item.noun.stem}${item.noun.ending}`.trim()
              : "Reglen";

            return (
              <li key={item?.id ?? "summary"}>
                <button
                  type="button"
                  className={styles.frameButton}
                  aria-current={index === frame ? "step" : undefined}
                  onClick={() => goTo(index)}
                  lang={item ? "da" : undefined}
                >
                  {label}
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* the stage is visual only; this says the same in words */}
      <ul className="u-visually-hidden">
        {scenes.map((item) => (
          <li key={item.id} lang="da">
            {item.article} {item.noun.stem}
            {item.noun.ending} + {item.adjective.stem} ={" "}
            {item.article} {item.adjective.stem}
            {item.adjective.ending} {item.noun.stem}
            {item.noun.ending}. {item.rule}
          </li>
        ))}
      </ul>
    </figure>
  );
}

function Scene({ scene, phase }) {
  const Picture = pictures[scene.picture];
  const isDone = phase === LAST_PHASE;

  return (
    <div className={styles.scene}>
      <span className={styles.group}>{scene.group}</span>

      <div className={styles.phraseArea}>
        <span
          className={styles.chip}
          data-phase={phase}
          lang="da"
        >
          + {scene.adjective.stem}
        </span>

        <NounPhrase
          scene={scene}
          withAdjective={phase >= 2}
          withEnding={phase >= 3}
        />
      </div>

      <div className={styles.picture} data-done={isDone}>
        {Array.from({ length: scene.count }, (_, index) => (
          <Picture
            key={index}
            className={styles.icon}
            strokeWidth={1.6}
          />
        ))}
      </div>

      <p className={styles.gloss} lang="en">
        {isDone ? scene.gloss.after : scene.gloss.before}
      </p>
    </div>
  );
}

function RuleCard({ scenes, summary }) {
  const byId = Object.fromEntries(scenes.map((scene) => [scene.id, scene]));

  return (
    <div className={styles.rules}>
      {summary.map((row) => (
        <div key={row.group} className={styles.ruleRow}>
          <span className={styles.ruleGroup}>{row.group}</span>

          <span className={styles.ruleEnding}>{row.ending}</span>

          <span className={styles.ruleExamples}>
            {row.examples.map((id) => (
              <NounPhrase key={id} scene={byId[id]} size="small" />
            ))}
          </span>
        </div>
      ))}
    </div>
  );
}
