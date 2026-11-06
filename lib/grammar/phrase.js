/*
  A tiny markup for animated phrases, so lesson data stays readable.

    "+den *grøn[ne] bil{en}"

    *word   the adjective: moves in at step 2
    +word   a new word (article, er …): moves in at step 2, marked
    [ne]    letters added at step 3, marked
    {en}    letters that disappear (step 2, or step 3 when new letters
            take their place in the same word: st{o}[ø]r[re] → større)
    <er>    letters that are marked but do not change (plural -er, genitive -s)

  Steps: 0 start, 1 the adjective is offered, 2 it moves in, 3 the ending.
*/

export const FINAL_STEP = 3;

export function parsePhrase(markup) {
  return markup.split(" ").map((token) => {
    const kind = token.startsWith("*")
      ? "adjective"
      : token.startsWith("+")
        ? "added"
        : "plain";

    const body = kind === "plain" ? token : token.slice(1);

    const parts = [...body.matchAll(/\[([^\]]+)\]|\{([^}]+)\}|<([^>]+)>|([^[{<]+)/g)].map(
      ([, add, remove, marked, text]) => {
        if (add) return { text: add, type: "add" };
        if (remove) return { text: remove, type: "remove" };
        if (marked) return { text: marked, type: "marked" };

        return { text, type: "base" };
      },
    );

    return { kind, parts };
  });
}

export function wordAppearsAt(word) {
  return word.kind === "plain" ? 0 : 2;
}

export function partIsShown(word, part, step) {
  if (part.type === "add") return step >= FINAL_STEP;

  // letters that are swapped for others (stor → større) go when the new ones come
  if (part.type === "remove") {
    const isSwap =
      word.kind === "adjective" ||
      word.parts.some((other) => other.type === "add");

    return step < (isSwap ? FINAL_STEP : 2);
  }

  return true;
}

// the phrase as plain text at a step, e.g. for screen readers
export function phraseText(markup, step = FINAL_STEP) {
  return parsePhrase(markup)
    .filter((word) => step >= wordAppearsAt(word))
    .map((word) =>
      word.parts
        .filter((part) => partIsShown(word, part, step))
        .map((part) => part.text)
        .join(""),
    )
    .join(" ");
}

// "grøn" for the "+ grøn" chip: the adjective as it moves in
export function adjectiveText(markup) {
  const adjective = parsePhrase(markup).find(
    (word) => word.kind === "adjective",
  );

  if (!adjective) return "";

  return adjective.parts
    .filter((part) => part.type !== "add")
    .map((part) => part.text)
    .join("");
}
