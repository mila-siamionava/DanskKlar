/*
  One practice exercise for each adjective rule (lesson):
  20 tasks from data/grammar/ruleTasks.js, with the reason for each
  answer in Danish, English and Russian.

  The exercise has the same id and part as its lesson, so it lives at
  /grammar/adjektiver/<part>/ovelser/<lesson id>.
*/

import { adjectiveLessons } from "./adjectives.js";
import { ruleTasks } from "./ruleTasks.js";

const CHOOSE = {
  da: "Vælg den form, der passer i sætningen.",
  en: "Choose the form that fits the sentence.",
  ru: "Выберите форму, которая подходит к предложению.",
};

/*
  The right answer is written first in the data. Show the options in
  a mixed order that is the same on every visit (and on the server),
  so the answer is not always in the same place.
*/
function orderOptions(options, sentence) {
  const seed = [...`${sentence}${options[0]}`].reduce(
    (sum, character) => sum + character.charCodeAt(0),
    0,
  );

  const shift = seed % options.length;

  return [...options.slice(shift), ...options.slice(0, shift)];
}

function buildExercise(lesson) {
  const { tasks, reasons, instructions = CHOOSE } = ruleTasks[lesson.id];

  return {
    id: lesson.id,
    part: lesson.part,
    kind: "rule",
    type: "choose",
    title: lesson.title,
    short: lesson.short,
    instructions: instructions.da,
    instructions_en: instructions.en,
    instructions_ru: instructions.ru,

    questions: tasks.map(([sentence, options, reason]) => ({
      sentence,
      options: orderOptions(options, sentence),
      answer: options[0],
      lesson: lesson.id,
      why: reasons[reason].da,
      why_en: reasons[reason].en,
      why_ru: reasons[reason].ru,
    })),
  };
}

export const ruleExercises = adjectiveLessons
  .filter((lesson) => ruleTasks[lesson.id])
  .map(buildExercise);

export function getRuleExercise(lessonId) {
  return ruleExercises.find((exercise) => exercise.id === lessonId) ?? null;
}
