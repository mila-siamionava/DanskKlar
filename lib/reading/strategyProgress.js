import { createProgressStore } from "./progressStore";

export { MASTERY_SCORE } from "./progressStore";

/*
  One progress store per strategy that uses the shared lesson components.
  Skimming keeps its old key, so earlier results are not lost.
*/
const stores = {
  skimming: createProgressStore("danskKlarSkimmingProgress"),
  naerlaesning: createProgressStore("danskKlarNaerlaesningProgress"),
  inferens: createProgressStore("danskKlarInferensProgress"),
};

export function getStrategyProgress(strategyId) {
  return stores[strategyId].getProgress();
}

export function saveStrategyResult(strategyId, slug, score) {
  stores[strategyId].saveResult(slug, score);
}
