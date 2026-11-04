"use client";

import { useMemo, useSyncExternalStore } from "react";

import {
  dayKey,
  readActivityLog,
  readActivitySnapshot,
  subscribeToActivity,
} from "@/lib/progress/activityLog";
import { getScanningProgress } from "@/lib/reading/scanningProgress";
import { getSkimmingProgress } from "@/lib/reading/skimmingProgress";
import { getReviewItems } from "@/lib/reviewStorage";

/*
  Everything the dashboards read, from the browser.
  Re-reads when the log changes in this tab or another one.
  isReady is false during the server render, so pages show no numbers
  until the browser data is there.
*/
export function useProgressData() {
  const snapshot = useSyncExternalStore(
    subscribeToActivity,
    readActivitySnapshot,
    () => null,
  );

  return useMemo(() => {
    if (snapshot === null) {
      return { isReady: false };
    }

    return {
      isReady: true,
      today: dayKey(),
      log: readActivityLog(),
      readingProgress: {
        scanning: getScanningProgress(),
        skimming: getSkimmingProgress(),
      },
      savedItems: getReviewItems(),
    };
  }, [snapshot]);
}
