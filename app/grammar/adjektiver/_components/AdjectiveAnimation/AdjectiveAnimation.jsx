"use client";

import { useEffect, useState } from "react";
import {
  Armchair,
  Baby,
  Bike,
  Brain,
  Cake,
  Car,
  ChevronLeft,
  ChevronRight,
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
import { helpFor } from "@/data/grammar/textHelp";
import { useHelpLanguage } from "@/lib/preferences/helpLanguage";
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
  The scenes loop; the rule itself is shown above the animation (KeyRules).
*/
const PHASE_MS = [1400, 1300, 1300, 2800];
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
  const { scenes } = lesson;

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

  const shownPhase = reduceMotion ? LAST_PHASE : phase;
  const isDone = shownPhase === LAST_PHASE;

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      if (phase < LAST_PHASE) {
        setPhase(phase + 1);
        return;
      }

      setFrame((frame + 1) % scenes.length);
      setPhase(0);
    }, PHASE_MS[phase]);

    return () => clearTimeout(timer);
  }, [isPlaying, phase, frame, scenes.length]);

  function goTo(index) {
    setFrame((index + scenes.length) % scenes.length);
    setPhase(0);
  }

  function togglePlaying() {
    // a finished scene starts over instead of jumping straight on
    if (!isPlaying && phase === LAST_PHASE) setPhase(0);

    setIsPlaying(!isPlaying);
  }

  const scene = scenes[frame];

  return (
    <figure className={styles.player}>
      <div className={styles.stage} aria-hidden="true">
        {/* key: a new scene starts closed, without animating shut */}
        <Scene key={scene.id} scene={scene} phase={shownPhase} />
      </div>

      {/* what happens now; the rule itself stands out at the end */}
      <figcaption
        className={isDone ? styles.captionRule : styles.caption}
      >
        {caption(lesson, scene, shownPhase)}

        {/* the same caption in the help language, right under it */}
        <HelpText
          className={styles.captionHelp}
          {...(isDone
            ? { en: scene.rule_en, ru: scene.rule_ru }
            : helpFor(caption(lesson, scene, shownPhase)))}
        />
      </figcaption>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.controlButton}
          onClick={() => goTo(frame - 1)}
          aria-label="Forrige eksempel"
        >
          <ChevronLeft size={20} aria-hidden="true" />
        </button>

        {!reduceMotion && (
          <button
            type="button"
            className={styles.controlButton}
            onClick={togglePlaying}
            aria-label={isPlaying ? "Pause animationen" : "Afspil animationen"}
          >
            {isPlaying ? (
              <Pause size={18} aria-hidden="true" />
            ) : (
              <Play size={18} aria-hidden="true" />
            )}
          </button>
        )}

        <span className={styles.counter} aria-live="polite">
          Eksempel {frame + 1} af {scenes.length}
        </span>

        <button
          type="button"
          className={styles.controlButton}
          onClick={() => goTo(frame + 1)}
          aria-label="Næste eksempel"
        >
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>

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

  // the English meaning only for learners who chose English as help
  const showGloss = useHelpLanguage() === "en";

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

      {showGloss && scene.gloss && (
        <p className={styles.gloss} lang="en">
          {isDone ? scene.gloss.after : scene.gloss.before}
        </p>
      )}
    </div>
  );
}
