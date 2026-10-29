import { createProgressStore } from "./progressStore";

export { MASTERY_SCORE } from "./progressStore";

const store = createProgressStore("danskKlarScanningProgress");

export const getScanningProgress = store.getProgress;
export const saveScanningResult = store.saveResult;
