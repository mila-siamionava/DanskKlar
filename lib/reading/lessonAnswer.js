/*
  Answers in the shared strategy lessons (skimming, nærlæsning, inferens):
  multiple_choice → the chosen option id
  paragraph_functions → { [blockId]: choiceId }, one per paragraph
  statements → { [itemId]: choiceId }, one per statement
    (rigtigt / forkert / står ikke i teksten)

  Points: a multiple-choice question is worth 1,
  the item questions 1 per item, so partly right still counts.
*/

const ITEM_TYPES = ["paragraph_functions", "statements"];

export function hasItems(question) {
  return ITEM_TYPES.includes(question.type);
}

// paragraph items point at a block, statements have their own id
export function itemKey(item) {
  return item.blockId ?? item.id;
}

export function maxPoints(question) {
  return hasItems(question) ? question.items.length : 1;
}

export function scoreAnswer(question, answer) {
  if (answer === null || answer === undefined) {
    return 0;
  }

  if (hasItems(question)) {
    return question.items.filter(
      (item) => answer[itemKey(item)] === item.correct,
    ).length;
  }

  return answer === question.correctOptionId ? 1 : 0;
}

export function isAnswerCorrect(question, answer) {
  return scoreAnswer(question, answer) === maxPoints(question);
}

export function isAnswerComplete(question, answer) {
  if (answer === null || answer === undefined) {
    return false;
  }

  if (hasItems(question)) {
    return question.items.every((item) => Boolean(answer[itemKey(item)]));
  }

  return true;
}

function choiceLabel(question, id) {
  return question.choices.find((choice) => choice.id === id)?.label;
}

// "Afsnit → afsnit" reads as a sequence; statements are numbered
function joinItems(question, labelFor) {
  if (question.type === "statements") {
    return question.items
      .map((item, index) => `${index + 1}: ${labelFor(item) ?? "–"}`)
      .join(" · ");
  }

  return question.items.map((item) => labelFor(item) ?? "–").join(" → ");
}

export function formatCorrectAnswer(question) {
  if (hasItems(question)) {
    return joinItems(question, (item) => choiceLabel(question, item.correct));
  }

  return question.options.find(
    (option) => option.id === question.correctOptionId,
  )?.text;
}

export function formatGivenAnswer(question, answer) {
  if (answer === null || answer === undefined) {
    return "Intet svar";
  }

  if (hasItems(question)) {
    return joinItems(question, (item) =>
      choiceLabel(question, answer[itemKey(item)]),
    );
  }

  return question.options.find((option) => option.id === answer)?.text;
}
