/*
  Adjectives, lesson 1: the indefinite form (grundform).
  Each scene is one noun phrase. The animation starts with the noun,
  adds the adjective, and then grows the ending.

  noun.stem + noun.ending: the ending is marked as added letters
  (plural -er / -e). adjective.ending is what the adjective gets.
*/

export const positiveForm = {
  id: "grundform",
  title: "Grundform: en, et og flertal",
  intro:
    "Et adjektiv beskriver et navneord. Det står foran navneordet og får en endelse, der passer til navneordet.",

  scenes: [
    {
      id: "en-bil",
      group: "en-ord",
      article: "en",
      noun: { stem: "bil", ending: "" },
      adjective: { stem: "grøn", ending: "" },
      picture: "car",
      count: 1,
      gloss: { before: "a car", after: "a green car" },
      rule: "en-ord: adjektivet får ingen endelse.",
    },
    {
      id: "et-hus",
      group: "et-ord",
      article: "et",
      noun: { stem: "hus", ending: "" },
      adjective: { stem: "grøn", ending: "t" },
      picture: "house",
      count: 1,
      gloss: { before: "a house", after: "a green house" },
      rule: "et-ord: adjektivet får -t.",
    },
    {
      id: "biler",
      group: "flertal",
      article: null,
      noun: { stem: "bil", ending: "er" },
      adjective: { stem: "grøn", ending: "ne" },
      picture: "car",
      count: 2,
      gloss: { before: "cars", after: "green cars" },
      rule: "Flertal: adjektivet får -e. Kort vokal: n bliver til nn.",
    },
    {
      id: "huse",
      group: "flertal",
      article: null,
      noun: { stem: "hus", ending: "e" },
      adjective: { stem: "grøn", ending: "ne" },
      picture: "house",
      count: 2,
      gloss: { before: "houses", after: "green houses" },
      rule: "Flertal: det er det samme for en-ord og et-ord.",
    },
  ],

  // the rule card at the end; examples are scene ids
  summary: [
    { group: "en-ord", ending: "ingen endelse", examples: ["en-bil"] },
    { group: "et-ord", ending: "+ t", examples: ["et-hus"] },
    { group: "flertal", ending: "+ e", examples: ["biler", "huse"] },
  ],
};
