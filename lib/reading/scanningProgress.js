/*
  Scanning results, kept in the browser until
  reading_attempts and reading_progress exist in Supabase.
*/
const PROGRESS_KEY = "danskKlarScanningProgress";

export const MASTERY_SCORE = 85;

export function getScanningProgress() {
  if (typeof window === "undefined") return {};

  try {
    const stored = localStorage.getItem(PROGRESS_KEY);

    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

export function saveScanningResult(slug, score) {
  if (typeof window === "undefined") return;

  const progress = getScanningProgress();
  const previous = progress[slug];

  progress[slug] = {
    lastScore: score,
    bestScore: Math.max(score, previous?.bestScore ?? 0),
    updatedAt: new Date().toISOString(),
  };

  try {
    localStorage.setItem(
      PROGRESS_KEY,
      JSON.stringify(progress),
    );
  } catch {
    // storage full or blocked: the lesson still works
  }
}
