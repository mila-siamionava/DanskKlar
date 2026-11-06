/*
  Adjective exercises, A1–B1 vocabulary.

  vaelg-formen: pick the right form for the gap (___).
  find-fejlen: the sentence is split in four parts, one has the error.
    error is the index of the wrong part, fix replaces it.

  lesson points to the explanation in data/grammar/adjectives.js.
*/

export const adjectiveExercises = [
  {
    id: "vaelg-formen",
    type: "choose",
    title: "Vælg den rigtige form",
    short: "Hvilken form passer i hullet?",
    instructions: "Vælg den form af adjektivet, der passer i sætningen.",

    questions: [
      {
        sentence: "Vi har en ___ hund.",
        options: ["store", "stor", "stort", "storre"],
        answer: "stor",
        lesson: "grundform",
        why: "en hund er et en-ord i ubestemt form: ingen endelse.",
      },
      {
        sentence: "De bor i et ___ hus.",
        options: ["gul", "gule", "gulte", "gult"],
        answer: "gult",
        lesson: "grundform",
        why: "et hus er et et-ord i ubestemt form: adjektivet får -t.",
      },
      {
        sentence: "Der er mange ___ huse i byen.",
        options: ["smukke", "smuk", "smukt", "smuke"],
        answer: "smukke",
        lesson: "grundform",
        why: "Flertal: adjektivet får -e. Kort vokal: k bliver til kk.",
      },
      {
        sentence: "Den ___ lejlighed ligger tæt på stationen.",
        options: ["billig", "billigt", "billige", "billiget"],
        answer: "billige",
        lesson: "bestemt-form",
        why: "Efter den, det og de får adjektivet altid -e.",
      },
      {
        sentence: "Min ___ kollega hedder Sara.",
        options: ["ny", "nye", "nyt", "nyen"],
        answer: "nye",
        lesson: "ejefald",
        why: "Efter min, din, hans … får adjektivet -e.",
      },
      {
        sentence: "Huset er meget ___.",
        options: ["gamle", "gammel", "gamlet", "gammelt"],
        answer: "gammelt",
        lesson: "efter-er",
        why: "Efter er: huset er et et-ord, så adjektivet får -t.",
      },
      {
        sentence: "Børnene er ___ i dag.",
        options: ["træt", "trætte", "trætt", "træte"],
        answer: "trætte",
        lesson: "efter-er",
        why: "Efter er: børnene er flertal, så adjektivet får -e.",
      },
      {
        sentence: "Hans ___ datter går i skole.",
        options: ["sødt", "sød", "søde", "sødde"],
        answer: "søde",
        lesson: "ejefald",
        why: "Efter hans får adjektivet -e.",
      },
      {
        sentence: "Det er et ___ problem.",
        options: ["stort", "stor", "store", "storet"],
        answer: "stort",
        lesson: "grundform",
        why: "et problem er et et-ord i ubestemt form: + t.",
      },
      {
        sentence: "Jeg kan godt lide det ___ køkken.",
        options: ["nyt", "ny", "nyet", "nye"],
        answer: "nye",
        lesson: "bestemt-form",
        why: "Efter det (bestemt form) får adjektivet -e – ikke -t.",
      },
      {
        sentence: "Det er et ___ ord.",
        options: ["danskt", "dansk", "danske", "dansket"],
        answer: "dansk",
        lesson: "undtagelser",
        why: "Adjektiver på -sk får ikke -t: et dansk ord.",
      },
      {
        sentence: "Vi bor i et ___ område.",
        options: ["stillet", "stilt", "stille", "stilles"],
        answer: "stille",
        lesson: "undtagelser",
        why: "Adjektiver på -e ændrer sig aldrig.",
      },
      {
        sentence: "Peters ___ bil er rød.",
        options: ["gammel", "gamle", "gammelt", "gammele"],
        answer: "gamle",
        lesson: "ejefald",
        why: "Efter ejefald (Peters) får adjektivet -e, og gammel bliver til gamle.",
      },
      {
        sentence: "To ___ børn leger i haven.",
        options: ["lille", "lilles", "små", "småe"],
        answer: "små",
        lesson: "undtagelser",
        why: "lille hedder små i flertal.",
      },
      {
        sentence: "Det er et ___ hotel.",
        options: ["modernt", "moderne", "moderner", "modernet"],
        answer: "moderne",
        lesson: "undtagelser",
        why: "moderne ender på -e og ændrer sig aldrig.",
      },
      {
        sentence: "Lægen siger, at mit blodtryk er ___.",
        options: ["høj", "høje", "højt", "højtt"],
        answer: "højt",
        lesson: "efter-er",
        why: "Efter er: blodtryk er et et-ord, så adjektivet får -t.",
      },
      {
        sentence: "Vi fik et ___ måltid på restauranten.",
        options: ["gode", "godt", "god", "gods"],
        answer: "godt",
        lesson: "grundform",
        why: "et måltid er et et-ord i ubestemt form: + t.",
      },
      {
        sentence: "Kaffen er ___.",
        options: ["varme", "varmt", "varmet", "varm"],
        answer: "varm",
        lesson: "efter-er",
        why: "Efter er: kaffen er et en-ord, så ingen endelse – heller ikke i bestemt form.",
      },
      {
        sentence: "Jeg har et ___ spørgsmål.",
        options: ["kortt", "korte", "kort", "kortet"],
        answer: "kort",
        lesson: "undtagelser",
        why: "kort ender allerede på -t: ingen ekstra -t.",
      },
      {
        sentence: "Disse ___ sko er for små.",
        options: ["nyes", "ny", "nyt", "nye"],
        answer: "nye",
        lesson: "ejefald",
        why: "Efter denne, dette og disse får adjektivet -e.",
      },
    ],
  },

  {
    id: "find-fejlen",
    type: "error",
    title: "Find fejlen",
    short: "Hvor i sætningen er fejlen?",
    instructions: "Én del af sætningen er forkert. Vælg den del, der har fejlen.",

    questions: [
      {
        parts: ["Vi har", "et stor", "hus", "i Aarhus."],
        error: 1,
        fix: "et stort",
        lesson: "grundform",
        why: "hus er et et-ord: et stort hus.",
      },
      {
        parts: ["Min nye", "kollega", "er meget", "søde."],
        error: 3,
        fix: "sød.",
        lesson: "efter-er",
        why: "Efter er: kollega er et en-ord i ental, så ingen endelse.",
      },
      {
        parts: ["Den", "gamle", "bilen", "kører stadig."],
        error: 2,
        fix: "bil",
        lesson: "bestemt-form",
        why: "Med den + adjektiv mister navneordet endelsen: den gamle bil.",
      },
      {
        parts: ["Børnene", "er", "træt", "efter skolen."],
        error: 2,
        fix: "trætte",
        lesson: "efter-er",
        why: "Efter er: børnene er flertal, så adjektivet får -e.",
      },
      {
        parts: ["Jeg har", "købt", "en nyt", "telefon."],
        error: 2,
        fix: "en ny",
        lesson: "grundform",
        why: "telefon er et en-ord: en ny telefon.",
      },
      {
        parts: ["Huset", "er", "meget", "gammel."],
        error: 3,
        fix: "gammelt.",
        lesson: "efter-er",
        why: "Efter er: huset er et et-ord, så adjektivet får -t.",
      },
      {
        parts: ["Hun har", "et danskt", "pas", "nu."],
        error: 1,
        fix: "et dansk",
        lesson: "undtagelser",
        why: "Adjektiver på -sk får ikke -t: et dansk pas.",
      },
      {
        parts: ["Det nyt", "hus", "er", "dyrt."],
        error: 0,
        fix: "Det nye",
        lesson: "bestemt-form",
        why: "Efter det (bestemt form) får adjektivet -e: det nye hus.",
      },
      {
        parts: ["Mange unge", "mennesker", "har en", "små lejlighed."],
        error: 3,
        fix: "lille lejlighed.",
        lesson: "undtagelser",
        why: "små er kun flertal. I ental hedder det lille: en lille lejlighed.",
      },
      {
        parts: ["Peters gammel", "cykel", "er blevet", "stjålet."],
        error: 0,
        fix: "Peters gamle",
        lesson: "ejefald",
        why: "Efter ejefald (Peters) får adjektivet -e: Peters gamle cykel.",
      },
      {
        parts: ["Vi har", "to", "lille", "børn."],
        error: 2,
        fix: "små",
        lesson: "undtagelser",
        why: "lille hedder små i flertal: to små børn.",
      },
      {
        parts: ["Mit nyt", "job", "starter", "i morgen."],
        error: 0,
        fix: "Mit nye",
        lesson: "ejefald",
        why: "Efter mit får adjektivet -e: mit nye job.",
      },
      {
        parts: ["Lejligheden", "er", "lys", "og billige."],
        error: 3,
        fix: "og billig.",
        lesson: "efter-er",
        why: "Efter er: lejligheden er et en-ord i ental, så ingen endelse.",
      },
      {
        parts: ["Vejret", "er", "kold", "og vådt i dag."],
        error: 2,
        fix: "koldt",
        lesson: "efter-er",
        why: "Efter er: vejret er et et-ord, så adjektivet får -t.",
      },
      {
        parts: ["Disse", "sko", "er", "for stor."],
        error: 3,
        fix: "for store.",
        lesson: "efter-er",
        why: "Efter er: disse sko er flertal, så adjektivet får -e.",
      },
      {
        parts: ["Det er", "en god idé,", "men et", "dårlig tidspunkt."],
        error: 3,
        fix: "dårligt tidspunkt.",
        lesson: "grundform",
        why: "tidspunkt er et et-ord: et dårligt tidspunkt.",
      },
      {
        parts: ["Vi har", "et", "sortt", "tag på huset."],
        error: 2,
        fix: "sort",
        lesson: "undtagelser",
        why: "sort ender allerede på -t: et sort tag.",
      },
      {
        parts: ["Min datter", "har", "lange", "hår."],
        error: 2,
        fix: "langt",
        lesson: "grundform",
        why: "hår er et et-ord, og her er det ental: langt hår.",
      },
      {
        parts: ["Tak for", "en", "dejlige", "middag."],
        error: 2,
        fix: "dejlig",
        lesson: "grundform",
        why: "middag er et en-ord i ubestemt form: en dejlig middag.",
      },
      {
        parts: ["Deres nye", "lejlighed", "er meget", "stort."],
        error: 3,
        fix: "stor.",
        lesson: "efter-er",
        why: "Efter er: lejlighed er et en-ord, så ingen endelse.",
      },
    ],
  },
];

export function getAdjectiveExercise(id) {
  return adjectiveExercises.find((exercise) => exercise.id === id) ?? null;
}
