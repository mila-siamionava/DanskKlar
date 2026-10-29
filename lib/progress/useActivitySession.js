"use client";

import { useEffect, useState } from "react";

import { recordSession, recordWordEncounter } from "./activityLog";

function createSessionId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/*
  Tracks one training session: time from the first render,
  each word answered, and the result when it ends.

  const session = useActivitySession({ area: "words", activity: "flashcards", title: "Huskekort" });
  session.recordWord(item, "gen", isCorrect);
  session.finish();   // safe to call more than once

  Pass finished: true when the activity ends and the hook saves it by itself.
*/
function createSession({ area, activity, title }) {
  const state = {
    id: createSessionId(),
    startedAt: Date.now(),
    points: 0,
    max: 0,
    words: new Set(),
  };

  return {
    recordWord(item, type, isCorrect) {
      recordWordEncounter(item, type, isCorrect);

      state.max += 1;
      state.points += isCorrect ? 1 : 0;

      if (item?.term) state.words.add(item.term);
    },

    // for activities that count their own score (lessons, texts)
    finish(result = {}) {
      const points = result.points ?? state.points;
      const max = result.max ?? state.max;

      if (max === 0) return;

      recordSession({
        id: state.id,
        at: new Date(state.startedAt).toISOString(),
        area,
        activity,
        title: result.title ?? title,
        points,
        max,
        seconds:
          result.seconds ??
          Math.round((Date.now() - state.startedAt) / 1000),
        words: [...state.words],
        ...(result.extra ?? {}),
      });
    },
  };
}

export function useActivitySession({ finished = false, ...options }) {
  // created once per mount, so the id and start time stay the same
  const [session] = useState(() => createSession(options));

  useEffect(() => {
    if (finished) session.finish();
  }, [finished, session]);

  return session;
}
