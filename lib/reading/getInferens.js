import * as samples from "./inferensSamples";
import { createStrategyContent } from "./strategyContent";

const content = createStrategyContent("inferens", samples);

export const getInferensSkills = content.getSkills;
export const getInferensLesson = content.getLesson;
