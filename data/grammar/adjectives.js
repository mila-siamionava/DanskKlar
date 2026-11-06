/*
  Adjective lessons. Each scene is one phrase written in the markup
  from lib/grammar/phrase.js and plays in four steps:
  the start, "+ adjective", the adjective moves in, the ending grows.

  scene fields
    phrase    the markup
    group     small label above the phrase (en-ord, et-ord …)
    picture   optional, see pictures in AdjectiveAnimation   count: how many
    effect    what the picture does at the end: green | red | black | small
    table     optional: rows of the four forms (ental ubestemt, ental bestemt,
              flertal ubestemt, flertal bestemt), plain words with [marked] endings
    gloss     English before and after
    rule      caption on the last step
    start     caption on the first step (default: the group)
    chip      text of the chip (default: + the adjective)
    label     name on the scene button (default: the start phrase)

  summary rows show the finished phrases of the scenes they list.
*/

export const adjectiveLessons = [
  {
    id: "hvad-er",
    section: "Grundregler",
    title: "Hvad er et adjektiv?",
    short: "En rød bil, bilen er rød, at være smart",
    intro:
      "Et adjektiv (tillægsord) fortæller, hvordan noget er: farve, størrelse, form og følelser. Det står foran et navneord eller efter er. Test: kan du sætte at være foran ordet, er det et adjektiv.",
    middle: "Adjektivet kommer på plads",

    scenes: [
      {
        id: "en-roed-bil",
        group: "foran navneordet",
        phrase: "en *rød bil",
        picture: "car",
        count: 1,
        effect: "red",
        gloss: { before: "a car", after: "a red car" },
        rule: "Adjektivet står foran navneordet og beskriver det.",
      },
      {
        id: "bilen-er-roed",
        group: "efter er",
        phrase: "bilen er *rød",
        picture: "car",
        count: 1,
        effect: "red",
        gloss: { before: "the car is …", after: "the car is red" },
        start: "Sætningen: bilen er …",
        rule: "Adjektivet kan også stå efter er: bilen er rød, huset er gammelt.",
      },
      {
        id: "at-vaere-smart",
        group: "testen",
        phrase: "at være *smart",
        picture: "brain",
        count: 1,
        gloss: { before: "to be …", after: "to be smart" },
        start: "Testen: at være …",
        rule: "Kan du sige at være smart? Så er smart et adjektiv.",
      },
      {
        id: "rundt-bord",
        group: "egenskab",
        phrase: "et *rund[t] bord",
        picture: "table",
        count: 1,
        gloss: { before: "a table", after: "a round table" },
        rule: "Adjektiver fortæller om egenskaber: farve, størrelse, form, følelser.",
      },
    ],

    summary: [
      { group: "foran", ending: "en rød bil", examples: ["en-roed-bil", "rundt-bord"] },
      { group: "efter er", ending: "bilen er rød", examples: ["bilen-er-roed"] },
      { group: "testen", ending: "at være …", examples: ["at-vaere-smart"] },
    ],
  },
  {
    id: "grundform",
    section: "Grundregler",
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
    section: "Grundregler",
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
    section: "Grundregler",
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
    section: "Grundregler",
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
    id: "skema",
    section: "Grundregler",
    title: "Hele skemaet: ental og flertal",
    short: "Et rødt hus, det røde hus, røde huse, de røde huse",
    intro:
      "Adjektivet bøjes efter køn (en/et), tal (ental/flertal) og bestemthed (ubestemt/bestemt). Kun én form er anderledes: et-ord i ental ubestemt får -t. Alle andre former får -e.",
    middle: "Adjektivet kommer på plads",

    scenes: [
      {
        id: "et-roedt-hus",
        group: "ental ubestemt",
        phrase: "et *rød[t] hus",
        picture: "house",
        count: 1,
        effect: "red",
        gloss: { before: "a house", after: "a red house" },
        rule: "Ental ubestemt, et-ord: + t.",
      },
      {
        id: "det-roede-hus",
        group: "ental bestemt",
        phrase: "+det *rød[e] hus{et}",
        picture: "house",
        count: 1,
        effect: "red",
        gloss: { before: "the house", after: "the red house" },
        start: "Bestemt form: huset",
        rule: "Ental bestemt: det + adjektiv med -e.",
      },
      {
        id: "roede-huse",
        group: "flertal ubestemt",
        phrase: "*rød[e] hus<e>",
        picture: "house",
        count: 2,
        effect: "red",
        gloss: { before: "houses", after: "red houses" },
        rule: "Flertal ubestemt: + e.",
      },
      {
        id: "de-roede-huse",
        group: "flertal bestemt",
        phrase: "+de *rød[e] huse{ne}",
        picture: "house",
        count: 2,
        effect: "red",
        gloss: { before: "the houses", after: "the red houses" },
        start: "Bestemt form: husene",
        rule: "Flertal bestemt: de + adjektiv med -e.",
      },
    ],

    table: [
      ["en rød bil", "den rød[e] bil", "rød[e] biler", "de rød[e] biler"],
      ["et rød[t] hus", "det rød[e] hus", "rød[e] huse", "de rød[e] huse"],
    ],

    summary: [
      { group: "et-ord, ental", ending: "+ t", examples: ["et-roedt-hus"] },
      {
        group: "alle andre",
        ending: "+ e",
        examples: ["det-roede-hus", "roede-huse", "de-roede-huse"],
      },
    ],
  },

  {
    id: "ig-som",
    section: "Endelser og undtagelser",
    title: "Adjektiver på -ig og -som",
    short: "Et vigtigt møde, de langsomme tog",
    intro:
      "Adjektiver på -ig følger den normale regel: vigtig, vigtigt, vigtige. Adjektiver på -som får dobbelt m, når de får -e: langsom → langsomme.",
    middle: "Adjektivet kommer på plads",

    scenes: [
      {
        id: "vigtig-beslutning",
        group: "-ig, en-ord",
        phrase: "en *vigtig beslutning",
        picture: "lightbulb",
        count: 1,
        gloss: { before: "a decision", after: "an important decision" },
        rule: "en-ord: ingen endelse.",
      },
      {
        id: "vigtigt-moede",
        group: "-ig, et-ord",
        phrase: "et *vigtig[t] møde",
        picture: "users",
        count: 1,
        gloss: { before: "a meeting", after: "an important meeting" },
        rule: "et-ord: + t, som normalt.",
      },
      {
        id: "langsomt-tog",
        group: "-som, et-ord",
        phrase: "et *langsom[t] tog",
        picture: "train",
        count: 1,
        gloss: { before: "a train", after: "a slow train" },
        rule: "et-ord: + t. Ingen dobbelt m her.",
      },
      {
        id: "det-langsomme-tog",
        group: "-som, bestemt",
        phrase: "+det *langsom[me] tog{et}",
        picture: "train",
        count: 1,
        gloss: { before: "the train", after: "the slow train" },
        start: "Bestemt form: toget",
        rule: "Med -e: m bliver til mm. langsom → langsomme.",
      },
    ],

    table: [
      [
        "en vigtig beslutning",
        "den vigtig[e] beslutning",
        "vigtig[e] beslutninger",
        "de vigtig[e] beslutninger",
      ],
      [
        "et vigtig[t] møde",
        "det vigtig[e] møde",
        "vigtig[e] møder",
        "de vigtig[e] møder",
      ],
      [
        "en langsom bil",
        "den langsom[me] bil",
        "langsom[me] biler",
        "de langsom[me] biler",
      ],
      [
        "et langsom[t] tog",
        "det langsom[me] tog",
        "langsom[me] tog",
        "de langsom[me] tog",
      ],
    ],

    summary: [
      {
        group: "-ig",
        ending: "+ t / + e",
        examples: ["vigtigt-moede"],
      },
      {
        group: "-som",
        ending: "+ t / + me",
        examples: ["langsomt-tog", "det-langsomme-tog"],
      },
    ],
  },

  {
    id: "sk-vis",
    section: "Endelser og undtagelser",
    title: "Adjektiver på -sk og -vis",
    short: "Et dansk flag, et typisk eksempel",
    intro:
      "Adjektiver på -sk og -vis får ikke -t i ental ubestemt. I de andre former får de -e som normalt. Ved barsk og delvis må man både skrive med og uden -t.",
    middle: "Adjektivet kommer på plads",

    scenes: [
      {
        id: "dansk-flag",
        group: "-sk, et-ord",
        phrase: "et *dansk flag",
        picture: "flag",
        count: 1,
        effect: "red",
        gloss: { before: "a flag", after: "a Danish flag" },
        rule: "-sk: intet -t. et dansk flag, et typisk eksempel.",
      },
      {
        id: "danske-flag",
        group: "-sk, flertal",
        phrase: "*dansk[e] flag",
        picture: "flag",
        count: 2,
        effect: "red",
        gloss: { before: "flags", after: "Danish flags" },
        rule: "Flertal og bestemt form: + e som normalt.",
      },
      {
        id: "barsk-vejr",
        group: "-sk, et-ord",
        phrase: "et *barsk[(t)] vejr",
        picture: "storm",
        count: 1,
        gloss: { before: "weather", after: "harsh weather" },
        rule: "barsk og delvis: -t må gerne stå, men behøver ikke.",
      },
    ],

    table: [
      ["et dansk flag", "det dansk[e] flag", "dansk[e] flag", "de dansk[e] flag"],
      [
        "et typisk eksempel",
        "det typisk[e] eksempel",
        "typisk[e] eksempler",
        "de typisk[e] eksempler",
      ],
      ["et barsk[(t)] vejr", "det barsk[e] vejr", "barsk[e] vejr", "de barsk[e] vejr"],
      [
        "et delvis[(t)] nederlag",
        "det delvis[e] nederlag",
        "delvis[e] nederlag",
        "de delvis[e] nederlag",
      ],
    ],

    summary: [
      { group: "-sk, -vis", ending: "intet -t", examples: ["dansk-flag"] },
      { group: "ellers", ending: "+ e", examples: ["danske-flag"] },
    ],
  },

  {
    id: "en-el-er",
    section: "Endelser og undtagelser",
    title: "Adjektiver på -en, -el og -er",
    short: "Den lækre kage, dovne mænd, gamle huse",
    intro:
      "Når adjektiver på -en, -el og -er får -e, forsvinder e'et i den sidste stavelse: lækker → lækre, doven → dovne, gammel → gamle. Med -t sker det ikke: et lækkert måltid.",
    middle: "Adjektivet kommer på plads",

    scenes: [
      {
        id: "den-laekre-kage",
        group: "-er",
        phrase: "+den *læk{ke}r[e] kage{n}",
        picture: "cake",
        count: 1,
        gloss: { before: "the cake", after: "the delicious cake" },
        start: "Bestemt form: kagen",
        rule: "lækker → lækre: e'et forsvinder (og kk bliver til k).",
      },
      {
        id: "dovne-maend",
        group: "-en",
        phrase: "*dov{e}n[e] mænd",
        picture: "user",
        count: 2,
        gloss: { before: "men", after: "lazy men" },
        rule: "doven → dovne: e'et forsvinder.",
      },
      {
        id: "gamle-huse",
        group: "-el",
        phrase: "*gam{me}l[e] hus<e>",
        picture: "house",
        count: 2,
        gloss: { before: "houses", after: "old houses" },
        rule: "gammel → gamle: e'et forsvinder (og mm bliver til m).",
      },
      {
        id: "laekkert-maaltid",
        group: "et-ord, ental",
        phrase: "et *lækker[t] måltid",
        picture: "meal",
        count: 1,
        gloss: { before: "a meal", after: "a delicious meal" },
        rule: "Med -t forsvinder e'et ikke: et lækkert måltid, et gammelt hus.",
      },
    ],

    table: [
      ["en lækker kage", "den lækr[e] kage", "lækr[e] kager", "de lækr[e] kager"],
      ["et lækker[t] måltid", "det lækr[e] måltid", "lækr[e] måltider", "de lækr[e] måltider"],
      ["en doven mand", "den dovn[e] mand", "dovn[e] mænd", "de dovn[e] mænd"],
      ["en gammel kone", "den gaml[e] kone", "gaml[e] koner", "de gaml[e] koner"],
    ],

    summary: [
      {
        group: "+ e",
        ending: "e'et forsvinder",
        examples: ["den-laekre-kage", "dovne-maend", "gamle-huse"],
      },
      { group: "+ t", ending: "ingen ændring", examples: ["laekkert-maaltid"] },
    ],
  },

  {
    id: "dobbelt-l",
    section: "Endelser og undtagelser",
    title: "Aktuel, ideel, kriminel: dobbelt l",
    short: "Aktuelle nyheder, den ideelle løsning",
    intro:
      "En gruppe adjektiver på -el har tryk på den sidste stavelse: aktuel, ideel, kriminel, generel. Her bliver l til ll, når der kommer -e på. Med -t er der kun ét l.",
    middle: "Adjektivet kommer på plads",

    scenes: [
      {
        id: "aktuelle-nyheder",
        group: "flertal",
        phrase: "*aktuel[le] nyhed<er>",
        picture: "news",
        count: 2,
        gloss: { before: "news", after: "current news" },
        rule: "aktuel → aktuelle: l bliver til ll.",
      },
      {
        id: "den-ideelle-loesning",
        group: "ental bestemt",
        phrase: "+den *ideel[le] løsning{en}",
        picture: "lightbulb",
        count: 1,
        gloss: { before: "the solution", after: "the ideal solution" },
        start: "Bestemt form: løsningen",
        rule: "ideel → ideelle: l bliver til ll.",
      },
      {
        id: "aktuelt-emne",
        group: "et-ord, ental",
        phrase: "et *aktuel[t] emne",
        picture: "news",
        count: 1,
        gloss: { before: "a topic", after: "a current topic" },
        rule: "Med -t: kun ét l. et aktuelt emne.",
      },
    ],

    table: [
      ["en aktuel nyhed", "den aktuel[le] nyhed", "aktuel[le] nyheder", "de aktuel[le] nyheder"],
      ["en ideel løsning", "den ideel[le] løsning", "ideel[le] løsninger", "de ideel[le] løsninger"],
      [
        "en kriminel handling",
        "den kriminel[le] handling",
        "kriminel[le] handlinger",
        "de kriminel[le] handlinger",
      ],
    ],

    summary: [
      {
        group: "+ e",
        ending: "ll",
        examples: ["aktuelle-nyheder", "den-ideelle-loesning"],
      },
      { group: "+ t", ending: "ét l", examples: ["aktuelt-emne"] },
    ],
  },

  {
    id: "t-et",
    section: "Endelser og undtagelser",
    title: "Adjektiver på -t og -et",
    short: "Et kort møde, den malede bænk",
    intro:
      "Ender adjektivet på -t (kort, glat, let, købt), får det ikke et ekstra -t. Ender det på -et (malet, snavset, stribet, forkølet), bliver -et til -ede, når der skal -e på: den malede bænk.",
    middle: "Adjektivet kommer på plads",

    scenes: [
      {
        id: "kort-moede",
        group: "-t, et-ord",
        phrase: "et *kort møde",
        picture: "users",
        count: 1,
        gloss: { before: "a meeting", after: "a short meeting" },
        rule: "Ender ordet på -t: intet ekstra -t. et kort møde.",
      },
      {
        id: "korte-film",
        group: "-t, flertal",
        phrase: "*kort[e] film",
        picture: "film",
        count: 2,
        gloss: { before: "films", after: "short films" },
        rule: "Flertal og bestemt form: + e som normalt.",
      },
      {
        id: "den-malede-baenk",
        group: "-et",
        phrase: "+den *male{t}[de] bænk{en}",
        picture: "bench",
        count: 1,
        gloss: { before: "the bench", after: "the painted bench" },
        start: "Bestemt form: bænken",
        rule: "malet → malede: -et bliver til -ede.",
      },
      {
        id: "snavset-glas",
        group: "-et, et-ord",
        phrase: "et *snavset glas",
        picture: "glass",
        count: 1,
        gloss: { before: "a glass", after: "a dirty glass" },
        rule: "Ender ordet på -et: intet ekstra -t. et snavset glas.",
      },
    ],

    table: [
      ["en kort film", "den kort[e] film", "kort[e] film", "de kort[e] film"],
      ["et kort møde", "det kort[e] møde", "kort[e] møder", "de kort[e] møder"],
      ["en købt cykel", "den købt[e] cykel", "købt[e] cykler", "de købt[e] cykler"],
      ["en malet bænk", "den male[de] bænk", "male[de] bænke", "de male[de] bænke"],
      ["et snavset glas", "det snavse[de] glas", "snavse[de] glas", "de snavse[de] glas"],
    ],

    summary: [
      { group: "-t", ending: "intet ekstra -t", examples: ["kort-moede"] },
      { group: "-et", ending: "-ede", examples: ["den-malede-baenk"] },
    ],
  },

  {
    id: "tillaegsform",
    section: "Endelser og undtagelser",
    title: "Tillægsform: stjålen, stjålet, stjålne",
    short: "En stjålen cykel, det ankomne tog",
    intro:
      "Mange adjektiver kommer fra verber (tillægsform). Regelmæssige verber: -et bliver til -ede (krævet → de krævede papirer). Uregelmæssige verber: -en/-et bliver til -ne (stjålen → den stjålne cykel). Nogle bøjes som almindelige adjektiver: en åben dør, et åbent vindue.",
    middle: "Adjektivet kommer på plads",

    scenes: [
      {
        id: "stjaalen-cykel",
        group: "en-ord",
        phrase: "en *stjålen cykel",
        picture: "bike",
        count: 1,
        gloss: { before: "a bike", after: "a stolen bike" },
        rule: "en-ord: stjålen.",
      },
      {
        id: "stjaalet-ur",
        group: "et-ord",
        phrase: "et *stjål{en}[et] ur",
        picture: "watch",
        count: 1,
        chip: "+ stjålen",
        gloss: { before: "a watch", after: "a stolen watch" },
        rule: "et-ord: -en bliver til -et. et stjålet ur.",
      },
      {
        id: "den-stjaalne-cykel",
        group: "bestemt",
        phrase: "+den *stjål{e}n[e] cykel{en}",
        picture: "bike",
        count: 1,
        gloss: { before: "the bike", after: "the stolen bike" },
        start: "Bestemt form: cyklen",
        rule: "Med -e: stjålne. Det samme med frossen → det frosne kød.",
      },
      {
        id: "det-ankomne-tog",
        group: "-ne",
        phrase: "+det *ankom{met}[ne] tog{et}",
        picture: "train",
        count: 1,
        chip: "+ ankommet",
        gloss: { before: "the train", after: "the train that has arrived" },
        start: "Bestemt form: toget",
        rule: "-ne: det er sket. det ankomne tog = toget, der var ankommet.",
      },
      {
        id: "det-ankommende-tog",
        group: "-ende",
        phrase: "+det *ankomm[ende] tog{et}",
        picture: "train",
        count: 1,
        chip: "+ ankomme",
        gloss: { before: "the train", after: "the arriving train" },
        start: "Bestemt form: toget",
        rule: "-ende: det sker nu. det ankommende tog = toget, der ankommer.",
      },
      {
        id: "aabent-brev",
        group: "almindelig bøjning",
        phrase: "et *åben[t] brev",
        picture: "letter",
        count: 1,
        gloss: { before: "a letter", after: "an open letter" },
        rule: "åben bøjes som et almindeligt adjektiv: et åbent brev, den åbne dør.",
      },
    ],

    table: [
      ["en stjålen cykel", "den stjåln[e] cykel", "stjåln[e] cykler", "de stjåln[e] cykler"],
      ["et stjål[et] ur", "det stjåln[e] ur", "stjåln[e] ure", "de stjåln[e] ure"],
      ["en åben dør", "den åbn[e] dør", "åbn[e] døre", "de åbn[e] døre"],
      ["et åben[t] brev", "det åbn[e] brev", "åbn[e] breve", "de åbn[e] breve"],
    ],

    summary: [
      {
        group: "stjålen",
        ending: "-et / -ne",
        examples: ["stjaalet-ur", "den-stjaalne-cykel"],
      },
      {
        group: "-ne / -ende",
        ending: "sket / sker nu",
        examples: ["det-ankomne-tog", "det-ankommende-tog"],
      },
      { group: "åben", ending: "+ t / + e", examples: ["aabent-brev"] },
    ],
  },

  {
    id: "uboejelige",
    section: "Endelser og undtagelser",
    title: "Adjektiver, der ikke ændrer sig",
    short: "Et moderne hus, det blå kort, små biler",
    intro:
      "Nogle adjektiver bøjes aldrig: ord på -e (moderne, stille, bange, ringe), ord på -ende (spændende), nogle ord på vokal (lilla, ru, ædru) og stakkels. blå og grå får kun -t. ny og fri bøjes, men med ét t. lille hedder små i flertal.",
    middle: "Adjektivet kommer på plads",

    scenes: [
      {
        id: "moderne-hus",
        group: "-e",
        phrase: "et *moderne hus",
        picture: "house",
        count: 1,
        gloss: { before: "a house", after: "a modern house" },
        rule: "Ender ordet på -e, ændrer det sig aldrig: moderne, stille, bange.",
      },
      {
        id: "spaendende-moeder",
        group: "-ende",
        phrase: "*spændende møde<r>",
        picture: "users",
        count: 2,
        gloss: { before: "meetings", after: "exciting meetings" },
        rule: "-ende ændrer sig aldrig: et spændende møde, spændende møder.",
      },
      {
        id: "blaat-kort",
        group: "blå, grå",
        phrase: "et *blå[t] kort",
        picture: "card",
        count: 1,
        gloss: { before: "a card", after: "a blue card" },
        rule: "blå og grå får -t: et blåt kort.",
      },
      {
        id: "det-blaa-kort",
        group: "blå, grå",
        phrase: "+det *blå kort{et}",
        picture: "card",
        count: 1,
        gloss: { before: "the card", after: "the blue card" },
        start: "Bestemt form: kortet",
        rule: "Men intet -e: det blå kort, blå kort.",
      },
      {
        id: "nyt-tag",
        group: "ny, fri",
        phrase: "et *ny[t] tag",
        picture: "house",
        count: 1,
        gloss: { before: "a roof", after: "a new roof" },
        rule: "ny og fri: nyt, frit, nye, frie. Kun ét t.",
      },
      {
        id: "smaa-biler",
        group: "lille → små",
        phrase: "*små bil<er>",
        picture: "car",
        count: 2,
        effect: "small",
        chip: "+ lille",
        gloss: { before: "cars", after: "small cars" },
        rule: "lille hedder små i flertal: en lille bil, små biler. Men: den lille bil.",
      },
      {
        id: "stakkels-barn",
        group: "stakkels",
        phrase: "et *stakkels barn",
        picture: "baby",
        count: 1,
        gloss: { before: "a child", after: "a poor child" },
        rule: "stakkels ændrer sig aldrig: det stakkels barn, stakkels børn.",
      },
    ],

    table: [
      [
        "et moderne menneske",
        "det moderne menneske",
        "moderne mennesker",
        "de moderne mennesker",
      ],
      [
        "et spændende møde",
        "det spændende møde",
        "spændende møder",
        "de spændende møder",
      ],
      ["et blå[t] kort", "det blå kort", "blå kort", "de blå kort"],
      ["et ny[t] tag", "det ny[e] tag", "ny[e] tage", "de ny[e] tage"],
      ["en lille bil", "den lille bil", "[små] biler", "de [små] biler"],
      ["et stakkels barn", "det stakkels barn", "stakkels børn", "de stakkels børn"],
    ],

    summary: [
      {
        group: "aldrig ændring",
        ending: "-e, -ende, stakkels",
        examples: ["moderne-hus", "spaendende-moeder", "stakkels-barn"],
      },
      { group: "blå, grå", ending: "kun -t", examples: ["blaat-kort", "det-blaa-kort"] },
      { group: "ny, fri", ending: "ét t", examples: ["nyt-tag"] },
      { group: "lille", ending: "små i flertal", examples: ["smaa-biler"] },
    ],
  },

  {
    id: "komma",
    section: "Tegnsætning",
    title: "Komma mellem adjektiver",
    short: "En kold, frostklar morgen",
    intro:
      "Står to adjektiver ved siden af hinanden, og kan du sætte og imellem, skal der komma: en kold, frostklar morgen (kold og frostklar). Hører det sidste adjektiv tæt sammen med navneordet, skal der ikke komma: sprøde franske kartofler.",
    middle: "Det nye adjektiv kommer foran",

    scenes: [
      {
        id: "kold-frostklar",
        group: "komma",
        phrase: "en *kold[,] frostklar morgen",
        picture: "sunrise",
        count: 1,
        gloss: { before: "a frosty morning", after: "a cold, frosty morning" },
        start: "en frostklar morgen",
        rule: "kold og frostklar: begge beskriver morgenen. Sæt komma.",
      },
      {
        id: "splinterny-roed",
        group: "komma",
        phrase: "en *splinterny[,] rød cykel",
        picture: "bike",
        count: 1,
        effect: "red",
        gloss: { before: "a red bike", after: "a brand-new, red bike" },
        start: "en rød cykel",
        rule: "splinterny og rød: sæt komma.",
      },
      {
        id: "sproede-franske",
        group: "intet komma",
        phrase: "*sprød[e] franske kartofler",
        gloss: { before: "French fries", after: "crispy French fries" },
        start: "franske kartofler",
        rule: "franske kartofler hører sammen. Man kan ikke sige 'sprøde og franske'. Intet komma.",
      },
    ],

    summary: [
      {
        group: "og passer",
        ending: "komma",
        examples: ["kold-frostklar", "splinterny-roed"],
      },
      { group: "og passer ikke", ending: "intet komma", examples: ["sproede-franske"] },
    ],
  },
];

export function getAdjectiveLesson(id) {
  return adjectiveLessons.find((lesson) => lesson.id === id) ?? null;
}
