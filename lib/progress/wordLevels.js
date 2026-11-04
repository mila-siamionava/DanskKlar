/*
  How well a word is known, from the ways the learner has met it.
  Teachers say a word needs many varied meetings, spread over days:
  seeing it, recognising it, writing it and using it.

  set: seen (flashcards, texts)
  gen: recognised (multiple choice, true/false, pairs, definition, fill the gap)
  skr: written (first letter, typed gap)
  bru: used (build the sentence)
*/

export const ENCOUNTER_TYPES = [
  { id: "set", label: "Set" },
  { id: "gen", label: "Genkendt" },
  { id: "skr", label: "Skrevet" },
  { id: "bru", label: "Brugt" },
];

export const LEVELS = ["Ny", "Set", "Genkendt", "Kan skrive", "Lært"];

// the rule for "Lært"
export const LEARNED_RULE = {
  encounters: 10,
  written: 3,
  days: 2,
};

export function emptyWordStats(term) {
  return {
    term,
    counts: { set: 0, gen: 0, skr: 0, bru: 0 },
    correct: { set: 0, gen: 0, skr: 0, bru: 0 },
    days: [],
    correctDays: [],
    levelUps: [],
    lastAt: null,
  };
}

export function totalEncounters(stats) {
  if (!stats) return 0;

  return Object.values(stats.counts).reduce((sum, count) => sum + count, 0);
}

export function writtenCount(stats) {
  if (!stats) return 0;

  return stats.correct.skr + stats.correct.bru;
}

export function learnedChecks(stats) {
  return [
    {
      id: "encounters",
      ok: totalEncounters(stats) >= LEARNED_RULE.encounters,
      text: `Mindst ${LEARNED_RULE.encounters} møder (${totalEncounters(stats)})`,
    },
    {
      id: "written",
      ok: writtenCount(stats) >= LEARNED_RULE.written,
      text: `Skrevet eller brugt rigtigt mindst ${LEARNED_RULE.written} gange (${writtenCount(stats)})`,
    },
    {
      id: "days",
      ok: (stats?.correctDays.length ?? 0) >= LEARNED_RULE.days,
      text: `Rigtigt på mindst ${LEARNED_RULE.days} forskellige dage (${stats?.correctDays.length ?? 0})`,
    },
  ];
}

export function wordLevel(stats) {
  if (!stats || totalEncounters(stats) === 0) return "Ny";

  if (learnedChecks(stats).every((check) => check.ok)) return "Lært";
  if (writtenCount(stats) >= 1) return "Kan skrive";
  if (stats.correct.gen >= 1) return "Genkendt";

  return "Set";
}

// one concrete suggestion for what the word needs next
export function nextStepForWord(stats) {
  const level = wordLevel(stats);

  if (level === "Lært") {
    return "Ordet er lært. Øv det igen om et par uger, så du ikke glemmer det.";
  }

  if (level === "Ny" || level === "Set") {
    return "Genkend ordet – prøv »Multiple choice« eller »Find par«.";
  }

  const missingWritten = LEARNED_RULE.written - writtenCount(stats);

  if (missingWritten > 0) {
    return `Skriv ordet ${missingWritten} ${
      missingWritten === 1 ? "gang" : "gange"
    } mere – prøv »Første bogstav« eller »Skriv ordet«.`;
  }

  if (stats.correctDays.length < LEARNED_RULE.days) {
    return "Øv ordet igen i morgen. Gentagelse på flere dage hjælper hukommelsen.";
  }

  return `Mød ordet ${
    LEARNED_RULE.encounters - totalEncounters(stats)
  } gange mere i tekster og øvelser.`;
}
