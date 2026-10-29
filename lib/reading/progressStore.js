/*
  Lesson results per slug, kept in the browser until
  reading_attempts and reading_progress exist in Supabase.
  Scanning and skimming each get their own key.
*/
export const MASTERY_SCORE = 85;

export function createProgressStore(storageKey) {
  function getProgress() {
    if (typeof window === "undefined") return {};

    try {
      const stored = localStorage.getItem(storageKey);

      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  }

  function saveResult(slug, score) {
    if (typeof window === "undefined") return;

    const progress = getProgress();
    const previous = progress[slug];

    progress[slug] = {
      firstScore: previous?.firstScore ?? score,
      lastScore: score,
      bestScore: Math.max(score, previous?.bestScore ?? 0),
      updatedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem(storageKey, JSON.stringify(progress));
    } catch {
      // storage full or blocked: the lesson still works
    }
  }

  return { getProgress, saveResult };
}
