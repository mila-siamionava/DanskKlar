// Word types are stored in English in the database; show them in Danish
const danishPartOfSpeech = {
  noun: "substantiv",
  verb: "verbum",
  adjective: "adjektiv",
  adverb: "adverbium",
  pronoun: "pronomen",
  preposition: "præposition",
  conjunction: "konjunktion",
  interjection: "interjektion",
  numeral: "talord",
  phrase: "udtryk",
  expression: "udtryk",
  idiom: "fast udtryk",
  "fixed expression": "fast udtryk",
};

export function formatPartOfSpeech(value) {
  if (!value) return "";

  return (
    danishPartOfSpeech[value.trim().toLowerCase()] ??
    value
  );
}
