import { MASTERY_SCORE } from "@/lib/reading/progressStore";

import { dayKey, wordKey } from "./activityLog";
import {
  LEVELS,
  totalEncounters,
  wordLevel,
  writtenCount,
} from "./wordLevels";

/*
  Turns the activity log into what the dashboards show.
  Pure functions: they read the log, they never write it.
*/

export const WEEKDAYS = ["Man", "Tir", "Ons", "Tor", "Fre", "Lør", "Søn"];

const WEEKDAY_NAMES = [
  "søndag",
  "mandag",
  "tirsdag",
  "onsdag",
  "torsdag",
  "fredag",
  "lørdag",
];

const MONTH_NAMES = [
  "januar",
  "februar",
  "marts",
  "april",
  "maj",
  "juni",
  "juli",
  "august",
  "september",
  "oktober",
  "november",
  "december",
];

export function parseDay(key) {
  const [year, month, day] = key.split("-").map(Number);

  return new Date(year, month - 1, day);
}

function addDays(date, days) {
  const next = new Date(date);

  next.setDate(next.getDate() + days);

  return next;
}

// "torsdag 29. oktober"
export function formatDayLong(key) {
  const date = parseDay(key);

  return `${WEEKDAY_NAMES[date.getDay()]} ${date.getDate()}. ${
    MONTH_NAMES[date.getMonth()]
  }`;
}

export function formatMonth(year, month) {
  const name = MONTH_NAMES[month];

  return `${name.charAt(0).toUpperCase()}${name.slice(1)} ${year}`;
}

// "1 t 32 min", "18 min"
export function formatMinutes(minutes) {
  if (minutes < 60) return `${minutes} min`;

  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;

  return rest ? `${hours} t ${rest} min` : `${hours} t`;
}

export function formatTime(iso) {
  const date = new Date(iso);

  return `${String(date.getHours()).padStart(2, "0")}.${String(
    date.getMinutes(),
  ).padStart(2, "0")}`;
}

// ---------- days ----------

export function sessionsOnDay(log, key) {
  return log.sessions
    .filter((session) => dayKey(session.at) === key)
    .sort((a, b) => a.at.localeCompare(b.at));
}

function secondsByDay(log) {
  const seconds = {};

  for (const session of log.sessions) {
    const key = dayKey(session.at);

    seconds[key] = (seconds[key] ?? 0) + session.seconds;
  }

  return seconds;
}

// a day with any activity counts at least 1 minute
function toMinutes(seconds) {
  return seconds > 0 ? Math.max(1, Math.round(seconds / 60)) : 0;
}

export function minutesByDay(log) {
  const minutes = {};

  for (const [key, seconds] of Object.entries(secondsByDay(log))) {
    minutes[key] = toMinutes(seconds);
  }

  return minutes;
}

function hasActivity(minutes, key) {
  return (minutes[key] ?? 0) > 0;
}

// days in a row up to today; today still counts as "open" until it ends
export function currentStreak(log, today = dayKey()) {
  const minutes = minutesByDay(log);

  let date = parseDay(today);

  if (!hasActivity(minutes, today)) {
    date = addDays(date, -1);
  }

  let streak = 0;

  while (hasActivity(minutes, dayKey(date))) {
    streak += 1;
    date = addDays(date, -1);
  }

  return streak;
}

export function daySummary(log, key) {
  const sessions = sessionsOnDay(log, key);

  const words = Object.values(log.words);

  const levelUps = words.flatMap((stats) =>
    stats.levelUps
      .filter((levelUp) => levelUp.day === key)
      .map((levelUp) => ({ term: stats.term, ...levelUp })),
  );

  // only the last step per word, so "Ny → Set → Genkendt" shows once
  const lastUpByWord = new Map();

  for (const levelUp of levelUps) {
    const earlier = lastUpByWord.get(levelUp.term);

    lastUpByWord.set(levelUp.term, {
      ...levelUp,
      from: earlier?.from ?? levelUp.from,
    });
  }

  return {
    key,
    sessions,
    minutes: toMinutes(
      sessions.reduce((total, session) => total + session.seconds, 0),
    ),
    wordsPractised: words
      .filter((stats) => stats.days.includes(key))
      .map((stats) => stats.term),
    newWords: words.filter((stats) => stats.days[0] === key).length,
    levelUps: [...lastUpByWord.values()],
  };
}

// Monday to Sunday of the week that holds `today`
export function weekSummary(log, today = dayKey()) {
  const minutes = minutesByDay(log);
  const date = parseDay(today);
  const monday = addDays(date, -((date.getDay() + 6) % 7));

  return WEEKDAYS.map((label, index) => {
    const key = dayKey(addDays(monday, index));

    return {
      key,
      label,
      minutes: minutes[key] ?? 0,
      isToday: key === today,
      isFuture: key > today,
    };
  });
}

// calendar cells for one month, weeks start on Monday
export function monthCells(log, year, month, today = dayKey()) {
  const minutes = minutesByDay(log);
  const first = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const blanks = (first.getDay() + 6) % 7;

  const cells = Array.from({ length: blanks }, (_, index) => ({
    blank: true,
    key: `blank-${index}`,
  }));

  for (let day = 1; day <= daysInMonth; day += 1) {
    const key = dayKey(new Date(year, month, day));

    cells.push({
      key,
      day,
      minutes: minutes[key] ?? 0,
      isToday: key === today,
      isFuture: key > today,
    });
  }

  return cells;
}

export function monthTotals(log, year, month) {
  const minutes = minutesByDay(log);
  const prefix = `${year}-${String(month + 1).padStart(2, "0")}`;

  const days = Object.entries(minutes).filter(([key]) =>
    key.startsWith(prefix),
  );

  return {
    days: days.filter(([key]) => hasActivity(minutes, key)).length,
    minutes: days.reduce((total, [, value]) => total + value, 0),
  };
}

// ---------- reading skills ----------

/*
  groups: [{ name, basePath, skills: [{ slug, title }] }]
  progress: { scanning: {...}, skimming: {...} } from the progress stores
*/
export function skillReadiness(log, groups, progress) {
  return groups.map((group) => {
    const skills = group.skills.map((skill) => {
      const result = progress[group.id]?.[skill.slug];

      const sessions = log.sessions.filter(
        (session) => session.activity === `${group.id}/${skill.slug}`,
      );

      return {
        ...skill,
        href: `${group.basePath}/${skill.slug}`,
        bestScore: result?.bestScore ?? null,
        firstScore: result?.firstScore ?? null,
        isMastered: (result?.bestScore ?? 0) >= MASTERY_SCORE,
        texts: sessions.reduce(
          (total, session) => total + (session.texts ?? 0),
          0,
        ),
      };
    });

    return {
      ...group,
      skills,
      mastered: skills.filter((skill) => skill.isMastered).length,
    };
  });
}

// ---------- words ----------

/*
  Every saved word plus every word met in training,
  each with its stats and level.
*/
export function wordList(log, savedItems) {
  const words = new Map();

  for (const item of savedItems) {
    const key = wordKey(item);

    if (!words.has(key)) {
      words.set(key, { key, term: item.term, stats: null });
    }
  }

  for (const [key, stats] of Object.entries(log.words)) {
    words.set(key, { key, term: stats.term, stats });
  }

  return [...words.values()]
    .map((word) => ({
      ...word,
      level: wordLevel(word.stats),
      encounters: totalEncounters(word.stats),
      written: writtenCount(word.stats),
    }))
    .sort(
      (a, b) =>
        LEVELS.indexOf(b.level) - LEVELS.indexOf(a.level) ||
        b.encounters - a.encounters ||
        a.term.localeCompare(b.term, "da"),
    );
}

export function levelCounts(words) {
  return LEVELS.map((level) => ({
    level,
    count: words.filter((word) => word.level === level).length,
  }));
}

export function encounterTotals(log) {
  const totals = { set: 0, gen: 0, skr: 0, bru: 0 };

  for (const stats of Object.values(log.words)) {
    for (const type of Object.keys(totals)) {
      totals[type] += stats.counts[type];
    }
  }

  return totals;
}

// words that are close to the next level and only need writing
export function wordsToWrite(words) {
  return words.filter(
    (word) =>
      word.level === "Kan skrive" ||
      (word.level === "Genkendt" && word.encounters >= 5),
  );
}

// ---------- next step ----------

export function nextStep({ words, readiness, today }) {
  const toWrite = wordsToWrite(words);

  if (toWrite.length >= 3) {
    return {
      title: `Skriv ${Math.min(toWrite.length, 10)} ord, der næsten er lært`,
      detail: toWrite
        .slice(0, 3)
        .map((word) => word.term)
        .join(" · "),
      href: "/review/train/first-letter",
    };
  }

  const nextSkill = readiness
    .flatMap((group) =>
      group.skills.map((skill) => ({ ...skill, group: group.name })),
    )
    .find((skill) => !skill.isMastered);

  if (nextSkill) {
    return {
      title:
        nextSkill.bestScore === null
          ? `Prøv ${nextSkill.group.toLowerCase()}: ${nextSkill.title}`
          : `Tag ${nextSkill.title} igen – målet er ${MASTERY_SCORE} %`,
      detail:
        nextSkill.bestScore === null
          ? "En ny læseteknik"
          : `Bedste resultat indtil nu: ${nextSkill.bestScore} %`,
      href: nextSkill.href,
    };
  }

  if (today.minutes === 0) {
    return {
      title: "Træn dine ord i dag",
      detail: "Et par minutter hver dag hjælper hukommelsen mest",
      href: "/review/train",
    };
  }

  return {
    title: "Læs en tekst",
    detail: "Øv ord og bindeord i en PD3-tekst",
    href: "/exercises",
  };
}
