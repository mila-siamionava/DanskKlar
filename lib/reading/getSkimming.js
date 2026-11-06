import * as samples from "./skimmingSamples";
import { createStrategyContent } from "./strategyContent";

const content = createStrategyContent("skimming", {
  ...samples,
  choiceLabels: samples.paragraphFunctions,
});

export const getSkimmingSkills = content.getSkills;
export const getSkimmingLesson = content.getLesson;
