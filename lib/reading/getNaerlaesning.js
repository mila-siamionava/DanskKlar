import * as samples from "./naerlaesningSamples";
import { createStrategyContent } from "./strategyContent";

const content = createStrategyContent("naerlaesning", samples);

export const getNaerlaesningSkills = content.getSkills;
export const getNaerlaesningLesson = content.getLesson;
