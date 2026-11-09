/*
  The practice comes in three levels for each part:
    1 common cases: the rules every adjective follows
    2 exceptions and difficult cases only
    3 everything mixed

  Each level has a one-line reminder, in Danish, English and Russian.
*/

export const levelOfLesson = {
  // 1. grad
  "hvad-er": 1,
  grundform: 1,
  "bestemt-form": 1,
  ejefald: 1,
  "efter-er": 1,
  skema: 1,
  "ig-som": 2,
  "sk-vis": 2,
  "en-el-er": 2,
  "dobbelt-l": 2,
  "t-et": 2,
  tillaegsform: 2,
  uboejelige: 2,
  komma: 2,

  // 2. og 3. grad
  grader: 1,
  komparativ: 1,
  superlativ: 1,
  sammenligning: 1,
  "grad-stavning": 2,
  "mere-mest": 2,
  uregelmaessige: 2,
};

// the mixed exercises: endelser mixes the exceptions only
export const levelOfMixedExercise = {
  "vaelg-formen": 3,
  "find-fejlen": 3,
  endelser: 2,
  "grad-vaelg": 3,
  "grad-fejl": 3,
};

export const levels = [
  {
    level: 1,
    title: "1. Almindelige tilfælde",
    reminder: {
      grundform: [
        "en gul bil · et gult hus · ellers + e",
        "en gul bil · et gult hus · otherwise + e",
        "en gul bil · et gult hus · в остальных случаях + e",
      ],
      grad: [
        "høj · højere · højest · den højeste",
        "høj · højere · højest · den højeste",
        "høj · højere · højest · den højeste",
      ],
    },
  },
  {
    level: 2,
    title: "2. Undtagelser og svære tilfælde",
    reminder: {
      grundform: [
        "Pas på enden af ordet: dansk, kort, gammel, moderne, lille …",
        "Watch the end of the word: dansk, kort, gammel, moderne, lille …",
        "Смотрите на конец слова: dansk, kort, gammel, moderne, lille …",
      ],
      grad: [
        "Stavning, mere/mest og uregelmæssige: bedre, større, ældre …",
        "Spelling, mere/mest and irregular forms: bedre, større, ældre …",
        "Правописание, mere/mest и неправильные формы: bedre, større, ældre …",
      ],
    },
  },
  {
    level: 3,
    title: "3. Blandet",
    reminder: {
      grundform: [
        "Alle regler blandet – som til prøven.",
        "All the rules mixed – like in the test.",
        "Все правила вперемешку — как на экзамене.",
      ],
      grad: [
        "Alle regler blandet – som til prøven.",
        "All the rules mixed – like in the test.",
        "Все правила вперемешку — как на экзамене.",
      ],
    },
  },
];
