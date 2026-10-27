/*
  Makes typed answers comparable:
  "Kl. 14:30" → "14.30", "1.150 kr." → "1150", "Park Alle" → "park alle"
*/
export function normalizeAnswer(value = "") {
  return value
    .normalize("NFD")
    // é → e, but keep å (a + ring) intact
    .replace(/\u0301/g, "")
    .normalize("NFC")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^(klokken|kl\.?|den|d\.)\s*/, "")
    .replace(/\s*(kr\.?|kroner)$/, "")
    .replace(/(\d):(\d)/g, "$1.$2")
    // thousands separator: 1.150 → 1150
    .replace(/(\d)\.(\d{3})\b/g, "$1$2")
    .replace(/[.,!?]$/, "")
    .trim();
}

export function checkAnswer(question, answer) {
  if (answer === null || answer === undefined) {
    return false;
  }

  if (question.type === "true_false") {
    return answer === question.correctValue;
  }

  if (question.type === "multiple_choice") {
    return answer === question.correctOptionId;
  }

  const given = normalizeAnswer(String(answer));

  if (!given) {
    return false;
  }

  return question.acceptedAnswers.some(
    (accepted) =>
      normalizeAnswer(accepted) === given,
  );
}

export function formatCorrectAnswer(question) {
  if (question.type === "true_false") {
    return question.correctValue
      ? "Sandt"
      : "Falsk";
  }

  if (question.type === "multiple_choice") {
    return question.options.find(
      (option) =>
        option.id === question.correctOptionId,
    )?.text;
  }

  return question.acceptedAnswers[0];
}
