"use client";

import { useEffect, useRef, useState } from "react";
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
  RotateCcw,
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
  A carousel of examples. Each example plays once, in four steps,
  like a short gif: 0 the noun alone, 1 "+ grøn" appears,
  2 grøn moves in, 3 the ending grows and the rule shows.
  The learner moves on with the arrows, the dots or a swipe.
*/
const PHASE_MS = [1200, 1100, 1100];
const LAST_PHASE = PHASE_MS.length;
const SWIPE_PX = 40;

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
  const [reduceMotion, setReduceMotion] = useState(false);
  const swipeStart = useRef(null);

  // without motion: every example shows its result straight away
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");

    function update() {
      setReduceMotion(query.matches);
    }

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  const shownPhase = reduceMotion ? LAST_PHASE : phase;
  const isDone = shownPhase === LAST_PHASE;

  // play the example once, then wait for the learner
  useEffect(() => {
    if (reduceMotion || phase >= LAST_PHASE) return;

    const timer = setTimeout(() => setPhase(phase + 1), PHASE_MS[phase]);

    return () => clearTimeout(timer);
  }, [phase, reduceMotion]);

  function goTo(index) {
    if (index < 0 || index >= scenes.length || index === frame) return;

    setFrame(index);
    setPhase(0);
  }

  function handlePointerDown(event) {
    swipeStart.current = event.clientX;
  }

  function handlePointerUp(event) {
    if (swipeStart.current === null) return;

    const distance = event.clientX - swipeStart.current;
    swipeStart.current = null;

    if (distance > SWIPE_PX) goTo(frame - 1);
    if (distance < -SWIPE_PX) goTo(frame + 1);
  }

  const scene = scenes[frame];
  const isFirst = frame === 0;
  const isLast = frame === scenes.length - 1;

  return (
    <figure
      className={styles.player}
      aria-roledescription="karrusel"
      aria-label="Eksempler"
    >
      <div className={styles.carousel}>
        <div
          className={styles.stage}
          aria-hidden="true"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => (swipeStart.current = null)}
        >
          {/* key: a new example starts closed, without animating shut */}
          <Scene key={scene.id} scene={scene} phase={shownPhase} />
        </div>

        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowPrevious}`}
          onClick={() => goTo(frame - 1)}
          disabled={isFirst}
          aria-label="Forrige eksempel"
        >
          <ChevronLeft size={24} aria-hidden="true" />
        </button>

        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowNext}`}
          onClick={() => goTo(frame + 1)}
          disabled={isLast}
          aria-label="Næste eksempel"
        >
          <ChevronRight size={24} aria-hidden="true" />
        </button>
      </div>

      {/* what happens now; the rule itself stands out at the end */}
      <figcaption
        className={isDone ? styles.captionRule : styles.caption}
        aria-live="polite"
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
        <ol className={styles.dots}>
          {scenes.map((item, index) => (
            <li key={item.id}>
              <button
                type="button"
                className={styles.dot}
                onClick={() => goTo(index)}
                aria-label={`Eksempel ${index + 1} af ${scenes.length}`}
                aria-current={index === frame ? "step" : undefined}
              />
            </li>
          ))}
        </ol>

        {!reduceMotion && (
          <button
            type="button"
            className={styles.replay}
            onClick={() => setPhase(0)}
            disabled={!isDone}
            aria-label="Se eksemplet igen"
          >
            <RotateCcw size={16} aria-hidden="true" />
          </button>
        )}
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
