/*
  Skimming answers:
  multiple_choice → the chosen option id
  paragraph_functions → { [blockId]: functionId }, one per paragraph

  Points: a multiple-choice question is worth 1,
  a paragraph question 1 per paragraph, so partly right still counts.
*/

export function maxPoints(question) {
  return question.type === "paragraph_functions"
    ? question.items.length
    : 1;
}

export function scoreAnswer(question, answer) {
  if (answer === null || answer === undefined) {
    return 0;
  }

  if (question.type === "paragraph_functions") {
    return question.items.filter(
      (item) => answer[item.blockId] === item.correct,
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

  if (question.type === "paragraph_functions") {
    return question.items.every((item) => Boolean(answer[item.blockId]));
  }

  return true;
}

function choiceLabel(question, id) {
  return question.choices.find((choice) => choice.id === id)?.label;
}

export function formatCorrectAnswer(question) {
  if (question.type === "paragraph_functions") {
    return question.items
      .map((item) => choiceLabel(question, item.correct))
      .join(" → ");
  }

  return question.options.find(
    (option) => option.id === question.correctOptionId,
  )?.text;
}

export function formatGivenAnswer(question, answer) {
  if (answer === null || answer === undefined) {
    return "Intet svar";
  }

  if (question.type === "paragraph_functions") {
    return question.items
      .map((item) => choiceLabel(question, answer[item.blockId]) ?? "–")
      .join(" → ");
  }

  return question.options.find((option) => option.id === answer)?.text;
}
