/*
  Adjective lessons. Each scene is one phrase written in the markup
  from lib/grammar/phrase.js and plays in four steps:
  the start, "+ adjective", the adjective moves in, the ending grows.

  scene fields
    phrase    the markup
    group     small label above the phrase (en-ord, et-ord …)
    picture   car | house | flag   count: how many
    effect    what the picture does at the end: green | black | small
    gloss     English before and after
    rule      caption on the last step
    start     caption on the first step (default: the group)
    chip      text of the chip (default: + the adjective)
    label     name on the scene button (default: the start phrase)

  summary rows show the finished phrases of the scenes they list.
*/

export const adjectiveLessons = [
  {
    id: "grundform",
    title: "Grundform: en, et og flertal",
    short: "En grøn bil, et grønt hus, grønne huse",
    intro:
      "Et adjektiv beskriver et navneord. Det står foran navneordet og får en endelse, der passer til navneordet.",
    middle: "Adjektivet står foran navneordet",

    scenes: [
      {
        id: "en-bil",
        group: "en-ord",
        phrase: "en *grøn bil",
        picture: "car",
        count: 1,
        effect: "green",
        gloss: { before: "a car", after: "a green car" },
        rule: "en-ord: adjektivet får ingen endelse.",
      },
      {
        id: "et-hus",
        group: "et-ord",
        phrase: "et *grøn[t] hus",
        picture: "house",
        count: 1,
        effect: "green",
        gloss: { before: "a house", after: "a green house" },
        rule: "et-ord: adjektivet får -t.",
      },
      {
        id: "biler",
        group: "flertal",
        phrase: "*grøn[ne] bil<er>",
        picture: "car",
        count: 2,
        effect: "green",
        gloss: { before: "cars", after: "green cars" },
        rule: "Flertal: adjektivet får -e. Kort vokal: n bliver til nn.",
      },
      {
        id: "huse",
        group: "flertal",
        phrase: "*grøn[ne] hus<e>",
        picture: "house",
        count: 2,
        effect: "green",
        gloss: { before: "houses", after: "green houses" },
        rule: "Flertal: det er det samme for en-ord og et-ord.",
      },
    ],

    summary: [
      { group: "en-ord", ending: "ingen endelse", examples: ["en-bil"] },
      { group: "et-ord", ending: "+ t", examples: ["et-hus"] },
      { group: "flertal", ending: "+ e", examples: ["biler", "huse"] },
    ],
  },

  {
    id: "bestemt-form",
    title: "Bestemt form: den, det, de",
    short: "Bilen → den grønne bil",
    intro:
      "Bilen, huset og bilerne er bestemt form. Når der kommer et adjektiv foran, flytter endelsen væk fra navneordet. I stedet står den, det eller de foran, og adjektivet får altid -e.",
    middle: "den / det / de kommer foran, og navneordet mister endelsen",

    scenes: [
      {
        id: "bilen",
        group: "en-ord, bestemt",
        phrase: "+den *grøn[ne] bil{en}",
        picture: "car",
        count: 1,
        effect: "green",
        gloss: { before: "the car", after: "the green car" },
        start: "Bestemt form: bilen",
        rule: "en-ord: den + adjektiv med -e. Bil uden -en.",
      },
      {
        id: "huset",
        group: "et-ord, bestemt",
        phrase: "+det *grøn[ne] hus{et}",
        picture: "house",
        count: 1,
        effect: "green",
        gloss: { before: "the house", after: "the green house" },
        start: "Bestemt form: huset",
        rule: "et-ord: det + adjektiv med -e. Ingen -t her!",
      },
      {
        id: "bilerne",
        group: "flertal, bestemt",
        phrase: "+de *grøn[ne] biler{ne}",
        picture: "car",
        count: 2,
        effect: "green",
        gloss: { before: "the cars", after: "the green cars" },
        start: "Bestemt form: bilerne",
        rule: "Flertal: de + adjektiv med -e. Biler uden -ne.",
      },
      {
        id: "husene",
        group: "flertal, bestemt",
        phrase: "+de *grøn[ne] huse{ne}",
        picture: "house",
        count: 2,
        effect: "green",
        gloss: { before: "the houses", after: "the green houses" },
        start: "Bestemt form: husene",
        rule: "de bruges for både en-ord og et-ord i flertal.",
      },
    ],

    summary: [
      { group: "den", ending: "+ e", examples: ["bilen"] },
      { group: "det", ending: "+ e", examples: ["huset"] },
      { group: "de", ending: "+ e", examples: ["bilerne", "husene"] },
    ],
  },

  {
    id: "ejefald",
    title: "Efter min, Peters og denne",
    short: "Min grønne bil, Peters grønne hus",
    intro:
      "Efter ejestedord (min, mit, mine, din, hans, hendes, vores, jeres, deres), efter ejefald med -s (Peters, firmaets) og efter denne, dette, disse får adjektivet altid -e. Navneordet står i grundform.",
    middle: "Adjektivet står mellem ordet og navneordet",

    scenes: [
      {
        id: "min-bil",
        group: "ejestedord",
        phrase: "min *grøn[ne] bil",
        picture: "car",
        count: 1,
        effect: "green",
        gloss: { before: "my car", after: "my green car" },
        start: "Ejestedord: min bil",
        rule: "Efter min, din, hans … får adjektivet -e – også ved en-ord.",
      },
      {
        id: "mit-hus",
        group: "ejestedord",
        phrase: "mit *grøn[ne] hus",
        picture: "house",
        count: 1,
        effect: "green",
        gloss: { before: "my house", after: "my green house" },
        start: "Ejestedord: mit hus",
        rule: "Efter mit får adjektivet -e, ikke -t.",
      },
      {
        id: "peters-bil",
        group: "ejefald",
        phrase: "Peter<s> *grøn[ne] bil",
        picture: "car",
        count: 1,
        effect: "green",
        gloss: { before: "Peter's car", after: "Peter's green car" },
        start: "Ejefald: Peters bil (-s viser, hvem der ejer)",
        rule: "Efter ejefald med -s får adjektivet -e.",
      },
      {
        id: "dette-hus",
        group: "denne / dette / disse",
        phrase: "dette *grøn[ne] hus",
        picture: "house",
        count: 1,
        effect: "green",
        gloss: { before: "this house", after: "this green house" },
        start: "dette hus",
        rule: "Efter denne, dette og disse får adjektivet -e.",
      },
    ],

    summary: [
      {
        group: "min, mit, mine …",
        ending: "+ e",
        examples: ["min-bil", "mit-hus"],
      },
      { group: "ejefald -s", ending: "+ e", examples: ["peters-bil"] },
      {
        group: "denne, dette, disse",
        ending: "+ e",
        examples: ["dette-hus"],
      },
    ],
  },

  {
    id: "efter-er",
    title: "Efter er og bliver",
    short: "Bilen er grøn, huset er grønt",
    intro:
      "Adjektivet kan også stå efter er eller bliver. Så passer det til navneordet: ingen endelse for en-ord, -t for et-ord og -e i flertal. Det gælder også, når navneordet er i bestemt form.",
    middle: "Adjektivet står efter verbet",

    scenes: [
      {
        id: "bilen-er",
        group: "en-ord",
        phrase: "bilen er *grøn",
        picture: "car",
        count: 1,
        effect: "green",
        gloss: { before: "the car is …", after: "the car is green" },
        start: "Sætningen: bilen er …",
        rule: "en-ord: ingen endelse – heller ikke efter bilen.",
      },
      {
        id: "huset-er",
        group: "et-ord",
        phrase: "huset er *grøn[t]",
        picture: "house",
        count: 1,
        effect: "green",
        gloss: { before: "the house is …", after: "the house is green" },
        start: "Sætningen: huset er …",
        rule: "et-ord: adjektivet får -t.",
      },
      {
        id: "bilerne-er",
        group: "flertal",
        phrase: "bilerne er *grøn[ne]",
        picture: "car",
        count: 2,
        effect: "green",
        gloss: { before: "the cars are …", after: "the cars are green" },
        start: "Sætningen: bilerne er …",
        rule: "Flertal: adjektivet får -e.",
      },
      {
        id: "huset-bliver",
        group: "et-ord",
        phrase: "huset bliver *grøn[t]",
        picture: "house",
        count: 1,
        effect: "green",
        gloss: {
          before: "the house becomes …",
          after: "the house becomes green",
        },
        start: "Sætningen: huset bliver …",
        rule: "Efter bliver gælder den samme regel som efter er.",
      },
    ],

    summary: [
      { group: "en-ord", ending: "ingen endelse", examples: ["bilen-er"] },
      { group: "et-ord", ending: "+ t", examples: ["huset-er"] },
      { group: "flertal", ending: "+ e", examples: ["bilerne-er"] },
    ],
  },

  {
    id: "undtagelser",
    title: "Undtagelser",
    short: "Et sort hus, små biler, gamle huse",
    intro:
      "Nogle adjektiver følger ikke helt reglen. Det handler mest om, hvordan ordet ender.",
    middle: "Se godt på enden af adjektivet",

    scenes: [
      {
        id: "sort",
        group: "ender på -t",
        phrase: "et *sort hus",
        picture: "house",
        count: 1,
        effect: "black",
        gloss: { before: "a house", after: "a black house" },
        label: "sort",
        rule: "Ender ordet på -t, kommer der ikke et ekstra -t: et sort hus, et kort møde.",
      },
      {
        id: "dansk",
        group: "ender på -sk",
        phrase: "et *dansk flag",
        picture: "flag",
        count: 1,
        gloss: { before: "a flag", after: "a Danish flag" },
        label: "dansk",
        rule: "Ender ordet på -sk, får det ikke -t: et dansk flag, et typisk eksempel.",
      },
      {
        id: "nyt",
        group: "ender på vokal",
        phrase: "et *ny[t] hus",
        picture: "house",
        count: 1,
        gloss: { before: "a house", after: "a new house" },
        label: "ny",
        rule: "ny får -t som normalt: et nyt hus, nye huse. Men kun ét t.",
      },
      {
        id: "moderne",
        group: "ender på -e",
        phrase: "et *moderne hus",
        picture: "house",
        count: 1,
        gloss: { before: "a house", after: "a modern house" },
        label: "moderne",
        rule: "Ender ordet på -e, ændrer det sig aldrig: moderne, stille, ægte.",
      },
      {
        id: "lilla",
        group: "ændrer sig aldrig",
        phrase: "et *lilla hus",
        picture: "house",
        count: 1,
        gloss: { before: "a house", after: "a purple house" },
        label: "lilla",
        rule: "Nogle ord ændrer sig aldrig: lilla, orange, gratis, ekstra, fælles.",
      },
      {
        id: "gamle",
        group: "ender på -el, -en, -er",
        phrase: "*gam{me}l[e] bil<er>",
        picture: "car",
        count: 2,
        gloss: { before: "cars", after: "old cars" },
        label: "gammel",
        rule: "gammel → gamle, sikker → sikre: e'et forsvinder, når der kommer -e på.",
      },
      {
        id: "smaa",
        group: "lille → små",
        phrase: "*små bil<er>",
        picture: "car",
        count: 2,
        effect: "small",
        chip: "+ lille",
        gloss: { before: "cars", after: "small cars" },
        label: "lille",
        rule: "lille hedder små i flertal: en lille bil, små biler. Men: den lille bil.",
      },
    ],

    summary: [
      { group: "-t", ending: "ingen ekstra t", examples: ["sort"] },
      { group: "-sk", ending: "ingen t", examples: ["dansk"] },
      { group: "-e, lilla", ending: "ingen ændring", examples: ["moderne", "lilla"] },
      { group: "-el, -en, -er", ending: "e forsvinder", examples: ["gamle"] },
      { group: "lille", ending: "små i flertal", examples: ["smaa"] },
    ],
  },
];

export function getAdjectiveLesson(id) {
  return adjectiveLessons.find((lesson) => lesson.id === id) ?? null;
}
