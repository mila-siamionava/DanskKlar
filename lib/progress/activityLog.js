import { emptyWordStats, LEVELS, wordLevel } from "./wordLevels";

/*
  Everything the learner does, kept in the browser for now.
  Later this becomes a Supabase table (learning_events) with the same
  fields, so the dashboards only change where they read from.

  sessions: one entry per finished activity
    { id, at, area, activity, title, points, max, seconds, words }
    area: "reading" | "words" | "texts"
  words: per word, how it has been met (see wordLevels.js)
  goalMinutes: the learner's daily goal
*/

const STORAGE_KEY = "danskKlarActivity";
const CHANGE_EVENT = "danskklar-activity";
const MAX_SESSIONS = 2000;

export const DEFAULT_GOAL_MINUTES = 15;

function emptyLog() {
  return { sessions: [], words: {}, goalMinutes: DEFAULT_GOAL_MINUTES };
}

// "2026-10-29" in the learner's own time zone
export function dayKey(date = new Date()) {
  const value = new Date(date);

  return [
    value.getFullYear(),
    String(value.getMonth() + 1).padStart(2, "0"),
    String(value.getDate()).padStart(2, "0"),
  ].join("-");
}

export function readActivityLog() {
  if (typeof window === "undefined") return emptyLog();

  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    return stored ? { ...emptyLog(), ...JSON.parse(stored) } : emptyLog();
  } catch {
    return emptyLog();
  }
}

function writeActivityLog(log) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(log));
  } catch {
    // storage full or blocked: training still works
  }

  window.dispatchEvent(new Event(CHANGE_EVENT));
}

// for useSyncExternalStore: other tabs send "storage", this tab our own event
export function subscribeToActivity(onChange) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);

  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

export function readActivitySnapshot() {
  if (typeof window === "undefined") return "";

  try {
    return localStorage.getItem(STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

/*
  Saves a finished activity. The id makes it safe to call twice:
  the second call replaces the first.
*/
export function recordSession(session) {
  if (typeof window === "undefined") return;

  const log = readActivityLog();

  const sessions = log.sessions.filter((item) => item.id !== session.id);

  sessions.push(session);

  writeActivityLog({
    ...log,
    sessions: sessions.slice(-MAX_SESSIONS),
  });
}

export function wordKey(item) {
  return String(item.vocabularyId ?? item.id ?? item.term).toLowerCase();
}

// one meeting with a word: type is set, gen, skr or bru
export function recordWordEncounter(item, type, isCorrect) {
  if (typeof window === "undefined" || !item) return;

  const term = item.term ?? item.target;

  if (!term) return;

  const log = readActivityLog();
  const key = wordKey(item);
  const today = dayKey();

  const previous = log.words[key] ?? emptyWordStats(term);
  const levelBefore = wordLevel(previous);

  const stats = {
    ...previous,
    term,
    counts: { ...previous.counts, [type]: previous.counts[type] + 1 },
    correct: {
      ...previous.correct,
      [type]: previous.correct[type] + (isCorrect ? 1 : 0),
    },
    days: previous.days.includes(today)
      ? previous.days
      : [...previous.days, today],
    correctDays:
      isCorrect && !previous.correctDays.includes(today)
        ? [...previous.correctDays, today]
        : previous.correctDays,
    lastAt: new Date().toISOString(),
  };

  const levelAfter = wordLevel(stats);

  if (LEVELS.indexOf(levelAfter) > LEVELS.indexOf(levelBefore)) {
    stats.levelUps = [
      ...previous.levelUps,
      { day: today, from: levelBefore, to: levelAfter },
    ];
  }

  writeActivityLog({
    ...log,
    words: { ...log.words, [key]: stats },
  });
}

export function setGoalMinutes(minutes) {
  if (typeof window === "undefined") return;

  writeActivityLog({ ...readActivityLog(), goalMinutes: minutes });
}
