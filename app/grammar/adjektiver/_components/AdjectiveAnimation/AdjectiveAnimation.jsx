"use client";

import { useEffect, useState } from "react";
import {
  Armchair,
  Baby,
  Bike,
  Brain,
  Cake,
  Car,
  Clapperboard,
  CloudLightning,
  CreditCard,
  Flag,
  GlassWater,
  House,
  Lightbulb,
  Mail,
  Newspaper,
  Pause,
  Play,
  Sunrise,
  Table2,
  Train,
  User,
  Users,
  UtensilsCrossed,
  Watch,
} from "lucide-react";

import HelpText from "@/components/i18n/HelpText/HelpText";
import { adjectiveText, phraseText } from "@/lib/grammar/phrase";

import NounPhrase from "../NounPhrase/NounPhrase";

import styles from "./AdjectiveAnimation.module.css";

// scene.picture names an icon; scenes without one show no picture
const pictures = {
  baby: Baby,
  bench: Armchair,
  bike: Bike,
  brain: Brain,
  cake: Cake,
  car: Car,
  card: CreditCard,
  film: Clapperboard,
  flag: Flag,
  glass: GlassWater,
  house: House,
  letter: Mail,
  lightbulb: Lightbulb,
  meal: UtensilsCrossed,
  news: Newspaper,
  storm: CloudLightning,
  sunrise: Sunrise,
  table: Table2,
  train: Train,
  user: User,
  users: Users,
  watch: Watch,
};

/*
  One scene plays in four phases, like a short gif:
  0 the noun alone, 1 "+ grøn" appears, 2 grøn moves in, 3 the ending grows.
  After the last scene a rule card shows, then everything loops.
*/
const PHASE_MS = [1400, 1300, 1300, 2800];
const SUMMARY_MS = 6000;
const LAST_PHASE = PHASE_MS.length - 1;

function caption(lesson, scene, phase) {
  if (phase === 0) {
    return scene.start ?? `Navneordet: ${phraseText(scene.phrase, 0)}`;
  }

  if (phase === 1) {
    return (
      scene.offer ??
      `Vi tilføjer adjektivet ${chipText(scene).replace("+ ", "")}`
    );
  }

  if (phase === 2) return scene.middle ?? lesson.middle;

  return scene.rule;
}

function chipText(scene) {
  return scene.chip ?? `+ ${adjectiveText(scene.phrase)}`;
}

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
          : caption(lesson, scene, shownPhase)}

        {/* the rule in the help language, once the rule is shown */}
        {!isSummary && shownPhase === LAST_PHASE && (
          <HelpText
            className={styles.captionHelp}
            en={scene.rule_en}
            ru={scene.rule_ru}
          />
        )}
      </figcaption>

      <nav aria-label="Scener">
        <ol className={styles.frames}>
          {[...scenes, null].map((item, index) => {
            const label = item
              ? (item.label ?? phraseText(item.phrase, 0))
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
            {phraseText(item.phrase, 0)} {chipText(item)} ={" "}
            {phraseText(item.phrase)}. {item.rule}
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
          {chipText(scene)}
        </span>

        <NounPhrase phrase={scene.phrase} step={phase} />
      </div>

      {Picture && (
        <div
          className={styles.picture}
          data-done={isDone}
          data-effect={scene.effect ?? "plain"}
        >
          {Array.from({ length: scene.count ?? 1 }, (_, index) => (
            <Picture
              key={index}
              className={styles.icon}
              strokeWidth={1.6}
            />
          ))}
        </div>
      )}

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
              <NounPhrase key={id} phrase={byId[id].phrase} size="small" />
            ))}
          </span>
        </div>
      ))}
    </div>
  );
}
