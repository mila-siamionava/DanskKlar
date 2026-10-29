import { createProgressStore } from "./progressStore";

export { MASTERY_SCORE } from "./progressStore";

const store = createProgressStore("danskKlarSkimmingProgress");

export const getSkimmingProgress = store.getProgress;
export const saveSkimmingResult = store.saveResult;
