/*
  Sample skimming content, shaped like the future Supabase tables
  (reading_subskills, reading_documents, reading_questions).
  getSkimming.js is the only file that reads this, so moving to the
  database later only changes that file.

  Texts are short articles: an optional title and lead, then headings
  and paragraphs. "title" and "lead" can be marked like any block id.

  A mark points at a whole block, or at a phrase inside it:
    { blockId: "p1", text: "til gengæld", kind: "clue" }
  kind "clue": a signal that leads to the answer
  kind "detail": an example or fact that is not the main message
*/

export const subskills = [
  {
    slug: "emne",
    title: "Find emnet",
    description: "Hvad handler teksten om? Se efter ord, der går igen.",
    level: "A2–B1",
    order: 1,
  },
  {
    slug: "hovedpointe",
    title: "Find hovedpointen",
    description:
      "Vælg den sætning, der dækker hele teksten – ikke kun ét eksempel.",
    level: "B1",
    order: 2,
  },
  {
    slug: "afsnit",
    title: "Afsnittenes funktion",
    description:
      "Indledning, årsag, fordel, ulempe, eksempel eller konklusion?",
    level: "B1",
    order: 3,
  },
];

// shown on the overview, not playable yet
export const upcomingSubskills = [
  {
    slug: "opbygning",
    title: "Tekstens opbygning",
    description:
      "Årsag–virkning, problem–løsning, sammenligning eller kronologi.",
    level: "B1–B2",
  },
  {
    slug: "detaljer",
    title: "Hovedpointe eller detalje",
    description: "Hvad hører med i et kort resumé, og hvad kan fjernes?",
    level: "B1–B2",
  },
  {
    slug: "formaal",
    title: "Formål og holdning",
    description:
      "Informerer, forklarer, overbeviser eller rådgiver forfatteren?",
    level: "B1–B2",
  },
  {
    slug: "resume",
    title: "Skriv et kort resumé",
    description: "Vælg, sæt sammen og udfyld et resumé på én sætning.",
    level: "B2",
  },
  {
    slug: "overskrifter",
    title: "Brug overskrifterne",
    description:
      "Forudsig indholdet ud fra rubrik og mellemrubrikker – og tjek bagefter.",
    level: "A2–B1",
  },
];

export const paragraphFunctions = {
  indledning: "Indledning",
  aarsag: "Årsag",
  eksempel: "Eksempel",
  fordel: "Fordel",
  ulempe: "Ulempe",
  resultat: "Resultat",
  konklusion: "Konklusion",
};

export const texts = [
  // Find emnet
  {
    slug: "sabbataar",
    title: null,
    level: "A2–B1",
    targetSeconds: 30,
    blocks: [
      {
        id: "p1",
        type: "paragraph",
        text: "Flere unge danskere vælger at tage et sabbatår efter gymnasiet. Nogle rejser til udlandet, mens andre arbejder for at spare penge op. For mange handler året om at få nye erfaringer før studiestart.",
      },
    ],
  },
  {
    slug: "vintercykling",
    title: null,
    level: "A2–B1",
    targetSeconds: 30,
    blocks: [
      {
        id: "p1",
        type: "paragraph",
        text: "Om vinteren cykler mange københavnere stadig til arbejde. Kommunen rydder cykelstierne for sne tidligt om morgenen, ofte før vejene. Nogle cyklister skifter til vinterdæk, mens andre bare tager et ekstra lag tøj på. For mange er cyklen simpelthen den hurtigste vej gennem byen – også i frost.",
      },
    ],
  },
  {
    slug: "frivillig",
    title: null,
    level: "A2–B1",
    targetSeconds: 30,
    blocks: [
      {
        id: "p1",
        type: "paragraph",
        text: "Mange danskere laver frivilligt arbejde i deres fritid. Nogle træner børn i den lokale fodboldklub, mens andre hjælper ældre med indkøb eller giver lektiehjælp på biblioteket. Mange frivillige fortæller, at de får nye venner og føler sig mere som en del af fællesskabet.",
      },
    ],
  },
  {
    slug: "genbrug",
    title: null,
    level: "A2–B1",
    targetSeconds: 30,
    blocks: [
      {
        id: "p1",
        type: "paragraph",
        text: "Genbrugsbutikker er blevet populære blandt unge. Hvor det før især var ældre, der købte brugt tøj, leder mange studerende nu efter billige og unikke fund. Nogle gør det for at spare penge, andre for at skåne miljøet.",
      },
    ],
  },
  {
    slug: "madpakke",
    title: null,
    level: "A2–B1",
    targetSeconds: 30,
    blocks: [
      {
        id: "p1",
        type: "paragraph",
        text: "Madpakken er stadig en fast del af hverdagen for mange danske skolebørn. Ofte består den af rugbrød med pålæg, og mange forældre smører den om aftenen eller tidligt om morgenen. Nogle skoler tilbyder i dag også skolemad, men madpakken er langt fra forsvundet.",
      },
    ],
  },

  // Find hovedpointen
  {
    slug: "mobilregler",
    title: null,
    level: "B1",
    targetSeconds: 40,
    blocks: [
      {
        id: "p1",
        type: "paragraph",
        text: "Mange skoler har indført regler for mobiltelefoner i undervisningen. Formålet er at skabe mere ro og bedre koncentration. Nogle lærere oplever positive resultater, mens andre mener, at telefoner også kan bruges som nyttige læringsredskaber.",
      },
    ],
  },
  {
    slug: "firedagesuge",
    title: null,
    level: "B1",
    targetSeconds: 40,
    blocks: [
      {
        id: "p1",
        type: "paragraph",
        text: "Flere danske virksomheder eksperimenterer med en arbejdsuge på fire dage. Medarbejderne arbejder lidt længere hver dag og får til gengæld fri om fredagen. Nogle steder melder om gladere medarbejdere og færre sygedage. Andre steder har man opgivet ordningen, fordi det var svært at nå kunderne.",
      },
    ],
  },
  {
    slug: "elbiler",
    title: null,
    level: "B1",
    targetSeconds: 40,
    blocks: [
      {
        id: "p1",
        type: "paragraph",
        text: "Salget af elbiler er steget kraftigt i Danmark de seneste år. Mange bilister vælger elbilen, fordi den er billigere i drift og bedre for klimaet. Men i nogle landområder er der stadig langt mellem ladestanderne, og det får nogle til at vente med at skifte.",
      },
    ],
  },
  {
    slug: "biblioteker",
    title: null,
    level: "B1",
    targetSeconds: 40,
    blocks: [
      {
        id: "p1",
        type: "paragraph",
        text: "Mange biblioteker er i dag meget mere end et sted at låne bøger. De tilbyder foredrag, sprogcaféer og hjælp til digital selvbetjening. Samtidig låner færre fysiske bøger end tidligere. Bibliotekerne forsøger derfor at blive et mødested for hele lokalsamfundet.",
      },
    ],
  },
  {
    slug: "byhaver",
    title: null,
    level: "B1",
    targetSeconds: 45,
    blocks: [
      {
        id: "p1",
        type: "paragraph",
        text: "I flere danske byer dyrker beboerne grøntsager i fælles byhaver. Haverne ligger ofte på tage, i gårde eller på tomme grunde. For mange handler det ikke kun om grøntsagerne: Haven bliver et sted, hvor naboer lærer hinanden at kende. Kritikere påpeger dog, at haverne kan være svære at holde ved lige, når de første frivillige mister interessen.",
      },
    ],
  },

  // Afsnittenes funktion
  {
    slug: "hjemmearbejde",
    title: "Hjemme eller på kontoret?",
    level: "B1",
    targetSeconds: 60,
    numbered: true,
    blocks: [
      {
        id: "p1",
        type: "paragraph",
        text: "Mange danskere arbejder hjemmefra flere dage om ugen. Det har ændret både arbejdsrutiner og transportvaner.",
      },
      {
        id: "p2",
        type: "paragraph",
        text: "En vigtig fordel er, at medarbejderne sparer transporttid og lettere kan planlægge deres hverdag.",
      },
      {
        id: "p3",
        type: "paragraph",
        text: "Til gengæld savner nogle medarbejdere kontakten til kollegerne og oplever større ensomhed.",
      },
      {
        id: "p4",
        type: "paragraph",
        text: "Mange virksomheder vælger derfor en blanding, hvor medarbejderne arbejder hjemme nogle dage og mødes på kontoret de andre.",
      },
    ],
  },
  {
    slug: "madspild",
    title: "Mindre mad i skraldespanden",
    level: "B1",
    targetSeconds: 60,
    numbered: true,
    blocks: [
      {
        id: "p1",
        type: "paragraph",
        text: "Danske husholdninger smider hvert år store mængder spiselig mad ud. Det koster både penge og belaster miljøet.",
      },
      {
        id: "p2",
        type: "paragraph",
        text: "En vigtig grund er, at mange køber mere, end de når at spise. Tilbud som »tre for to« frister, og planerne for ugens aftensmad holder ikke altid.",
      },
      {
        id: "p3",
        type: "paragraph",
        text: "Familien Holm fra Vejle er for eksempel begyndt at skrive en madplan hver søndag. De køber nu kun ind to gange om ugen.",
      },
      {
        id: "p4",
        type: "paragraph",
        text: "Resultatet er, at familien smider langt mindre ud – og sparer penge hver måned.",
      },
    ],
  },
  {
    slug: "sprogcafe",
    title: "Sprogcafé på biblioteket",
    level: "B1",
    targetSeconds: 60,
    numbered: true,
    blocks: [
      {
        id: "p1",
        type: "paragraph",
        text: "Hver tirsdag mødes en gruppe mennesker på biblioteket i Kolding for at tale dansk over en kop kaffe.",
      },
      {
        id: "p2",
        type: "paragraph",
        text: "Den store fordel er, at deltagerne kan øve sig i at tale uden at være bange for at lave fejl. Der er ingen lærer og ingen karakterer.",
      },
      {
        id: "p3",
        type: "paragraph",
        text: "Til gengæld kan det være svært for begyndere at følge med, når samtalen går hurtigt.",
      },
      {
        id: "p4",
        type: "paragraph",
        text: "Alt i alt er sprogcaféen et godt supplement til undervisningen – men ikke en erstatning for den.",
      },
    ],
  },
  {
    slug: "vinterbadning",
    title: "Kold start på dagen",
    level: "B1",
    targetSeconds: 60,
    numbered: true,
    blocks: [
      {
        id: "p1",
        type: "paragraph",
        text: "Vinterbadning er blevet populært i Danmark. På mange strande ser man folk hoppe i havet, selv når vandet er under fem grader.",
      },
      {
        id: "p2",
        type: "paragraph",
        text: "Mange begynder, fordi de har hørt, at det kolde vand giver energi og bedre humør.",
      },
      {
        id: "p3",
        type: "paragraph",
        text: "Læger advarer dog om, at vinterbadning kan være farligt for personer med hjerteproblemer.",
      },
      {
        id: "p4",
        type: "paragraph",
        text: "Vil man prøve, er rådet derfor at starte forsigtigt og aldrig bade alene.",
      },
    ],
  },
  {
    slug: "delebiler",
    title: "Når bilen er fælles",
    level: "B1",
    targetSeconds: 60,
    numbered: true,
    blocks: [
      {
        id: "p1",
        type: "paragraph",
        text: "I de større byer vælger flere at dele bil med andre i stedet for at eje deres egen.",
      },
      {
        id: "p2",
        type: "paragraph",
        text: "En klar fordel er prisen. Man betaler kun for de timer, man bruger bilen, og slipper for forsikring og reparationer.",
      },
      {
        id: "p3",
        type: "paragraph",
        text: "Lærke på 34 år bruger for eksempel en delebil to gange om måneden, når hun skal besøge sin mor i Roskilde.",
      },
      {
        id: "p4",
        type: "paragraph",
        text: "Ulempen er, at bilen ikke altid er ledig, når man har brug for den – især i weekenderne.",
      },
    ],
  },
];

export const questions = [
  // Find emnet: øv
  {
    id: "emne-oev-1",
    textSlug: "vintercykling",
    subskill: "emne",
    type: "multiple_choice",
    prompt: "Hvad handler teksten primært om?",
    options: [
      {
        id: "a",
        text: "Snerydning på vejene i København",
        feedback: "Snerydning er en detalje i én sætning.",
      },
      {
        id: "b",
        text: "At cykle i København om vinteren",
      },
      {
        id: "c",
        text: "Hvordan man vælger det rigtige tøj",
        feedback: "Tøj er et eksempel på, hvad cyklisterne gør.",
      },
    ],
    correctOptionId: "b",
    hint: "Første og sidste sætning handler om det samme. Hvad er det?",
    explanation:
      "»Cykler«, »cykelstierne«, »cyklister« og »cyklen« går igen gennem hele teksten. Sne og tøj er eksempler.",
    marks: [
      { blockId: "p1", text: "cykler", kind: "clue" },
      { blockId: "p1", text: "cykelstierne", kind: "clue" },
      { blockId: "p1", text: "cyklister", kind: "clue" },
      { blockId: "p1", text: "cyklen", kind: "clue" },
      { blockId: "p1", text: "vinterdæk", kind: "detail" },
      { blockId: "p1", text: "et ekstra lag tøj", kind: "detail" },
    ],
  },
  {
    id: "emne-oev-2",
    textSlug: "frivillig",
    subskill: "emne",
    type: "multiple_choice",
    prompt: "Hvad handler teksten primært om?",
    options: [
      {
        id: "a",
        text: "Fodbold for børn",
        feedback: "Fodboldklubben er kun ét eksempel.",
      },
      {
        id: "b",
        text: "Ældres indkøbsvaner",
        feedback: "Indkøb er et eksempel på frivilligt arbejde.",
      },
      {
        id: "c",
        text: "Danskeres frivillige arbejde",
      },
    ],
    correctOptionId: "c",
    hint: "Hvilket ord kommer igen i første og sidste sætning?",
    explanation:
      "Første sætning nævner emnet: frivilligt arbejde. Fodbold, indkøb og lektiehjælp er eksempler på det.",
    marks: [
      { blockId: "p1", text: "frivilligt arbejde", kind: "clue" },
      { blockId: "p1", text: "frivillige", kind: "clue" },
      { blockId: "p1", text: "træner børn i den lokale fodboldklub", kind: "detail" },
      { blockId: "p1", text: "hjælper ældre med indkøb", kind: "detail" },
    ],
  },

  // Find emnet: test
  {
    id: "emne-test-1",
    textSlug: "genbrug",
    subskill: "emne",
    type: "multiple_choice",
    prompt: "Hvad handler teksten primært om?",
    options: [
      {
        id: "a",
        text: "Unges interesse for at købe brugt",
      },
      {
        id: "b",
        text: "Ældre menneskers tøjstil",
        feedback: "De ældre nævnes kun som en sammenligning.",
      },
      {
        id: "c",
        text: "Priser på nyt tøj",
        feedback: "Teksten handler om brugt tøj, ikke nyt.",
      },
    ],
    correctOptionId: "a",
    explanation:
      "»Genbrugsbutikker«, »unge« og »studerende« peger på emnet: unge, der køber brugt.",
    marks: [
      { blockId: "p1", text: "Genbrugsbutikker er blevet populære blandt unge", kind: "clue" },
      { blockId: "p1", text: "studerende", kind: "clue" },
      { blockId: "p1", text: "ældre", kind: "detail" },
    ],
  },
  {
    id: "emne-test-2",
    textSlug: "madpakke",
    subskill: "emne",
    type: "multiple_choice",
    prompt: "Hvad handler teksten primært om?",
    options: [
      {
        id: "a",
        text: "Skolemad i Danmark",
        feedback: "Skolemad nævnes kun til sidst som en kontrast.",
      },
      {
        id: "b",
        text: "Hvordan man bager rugbrød",
        feedback: "Rugbrød er en detalje om, hvad madpakken består af.",
      },
      {
        id: "c",
        text: "Danske skolebørns madpakker",
      },
    ],
    correctOptionId: "c",
    explanation:
      "»Madpakken« står i både første og sidste sætning. Rugbrød og skolemad er detaljer.",
    marks: [
      { blockId: "p1", text: "Madpakken", kind: "clue" },
      { blockId: "p1", text: "madpakken er langt fra forsvundet", kind: "clue" },
      { blockId: "p1", text: "rugbrød med pålæg", kind: "detail" },
    ],
  },

  // Find hovedpointen: øv
  {
    id: "pointe-oev-1",
    textSlug: "firedagesuge",
    subskill: "hovedpointe",
    type: "multiple_choice",
    prompt: "Hvilken sætning udtrykker bedst tekstens hovedpointe?",
    options: [
      {
        id: "a",
        text: "Alle virksomheder bør indføre en arbejdsuge på fire dage.",
        feedback: "Overdriver: Teksten anbefaler ikke noget.",
      },
      {
        id: "b",
        text: "En arbejdsuge på fire dage giver færre sygedage.",
        feedback: "Kun én side: Andre steder har opgivet ordningen.",
      },
      {
        id: "c",
        text: "Flere virksomheder afprøver en arbejdsuge på fire dage – med blandede erfaringer.",
      },
    ],
    correctOptionId: "c",
    hint: "Teksten nævner både gode og dårlige erfaringer. Hvilket svar har begge med?",
    explanation:
      "Teksten beskriver et forsøg og viser to sider: »Nogle steder« er positive, »Andre steder« har opgivet. Hovedpointen skal dække begge.",
    marks: [
      { blockId: "p1", text: "eksperimenterer med en arbejdsuge på fire dage", kind: "clue" },
      { blockId: "p1", text: "Nogle steder", kind: "clue" },
      { blockId: "p1", text: "Andre steder", kind: "clue" },
      { blockId: "p1", text: "fri om fredagen", kind: "detail" },
    ],
  },
  {
    id: "pointe-oev-2",
    textSlug: "elbiler",
    subskill: "hovedpointe",
    type: "multiple_choice",
    prompt: "Hvilken sætning udtrykker bedst tekstens hovedpointe?",
    options: [
      {
        id: "a",
        text: "Flere vælger elbil, men mangel på ladestandere holder nogle tilbage.",
      },
      {
        id: "b",
        text: "Elbiler er billigere i drift end andre biler.",
        feedback: "Detalje: Det er kun én af grundene.",
      },
      {
        id: "c",
        text: "Der er ingen ladestandere i landområderne.",
        feedback: "Overdriver: Teksten siger »langt mellem«, ikke »ingen«.",
      },
    ],
    correctOptionId: "a",
    hint: "Læg mærke til »Men« i sidste sætning. Hvad skifter retning?",
    explanation:
      "Første sætning siger, at salget stiger. »Men« introducerer et problem. Hovedpointen har begge dele med.",
    marks: [
      { blockId: "p1", text: "Salget af elbiler er steget kraftigt", kind: "clue" },
      { blockId: "p1", text: "Men", kind: "clue" },
      { blockId: "p1", text: "billigere i drift og bedre for klimaet", kind: "detail" },
    ],
  },

  // Find hovedpointen: test
  {
    id: "pointe-test-1",
    textSlug: "biblioteker",
    subskill: "hovedpointe",
    type: "multiple_choice",
    prompt: "Hvilken sætning udtrykker bedst tekstens hovedpointe?",
    options: [
      {
        id: "a",
        text: "Færre låner fysiske bøger end før.",
        feedback: "Detalje: Det er en årsag, ikke hele pointen.",
      },
      {
        id: "b",
        text: "Biblioteker udvikler sig til mødesteder med mange forskellige tilbud.",
      },
      {
        id: "c",
        text: "Biblioteker bør stoppe med at låne bøger ud.",
        feedback: "Overdriver: Det står der ikke i teksten.",
      },
    ],
    correctOptionId: "b",
    explanation:
      "Første og sidste sætning siger det samme: Bibliotekerne er mere end bøger og vil være et mødested.",
    marks: [
      { blockId: "p1", text: "meget mere end et sted at låne bøger", kind: "clue" },
      { blockId: "p1", text: "et mødested for hele lokalsamfundet", kind: "clue" },
      { blockId: "p1", text: "foredrag, sprogcaféer og hjælp til digital selvbetjening", kind: "detail" },
    ],
  },
  {
    id: "pointe-test-2",
    textSlug: "byhaver",
    subskill: "hovedpointe",
    type: "multiple_choice",
    prompt: "Hvilken sætning udtrykker bedst tekstens hovedpointe?",
    options: [
      {
        id: "a",
        text: "Byhaver ligger ofte på tage.",
        feedback: "Detalje: Det handler om, hvor haverne ligger.",
      },
      {
        id: "b",
        text: "Alle naboer lærer hinanden at kende i byhaverne.",
        feedback: "Overdriver: Teksten siger »for mange«, ikke »alle«.",
      },
      {
        id: "c",
        text: "Byhaver skaber fællesskab, men kan være svære at holde i gang.",
      },
    ],
    correctOptionId: "c",
    explanation:
      "Teksten har en positiv side (naboer mødes) og en kritisk side (»dog«). Hovedpointen dækker begge.",
    marks: [
      { blockId: "p1", text: "naboer lærer hinanden at kende", kind: "clue" },
      { blockId: "p1", text: "dog", kind: "clue" },
      { blockId: "p1", text: "på tage, i gårde eller på tomme grunde", kind: "detail" },
    ],
  },

  // Afsnittenes funktion: øv
  {
    id: "afsnit-oev-1",
    textSlug: "madspild",
    subskill: "afsnit",
    type: "paragraph_functions",
    prompt: "Hvad gør hvert afsnit i teksten?",
    choices: ["indledning", "aarsag", "eksempel", "resultat", "ulempe"],
    items: [
      { blockId: "p1", correct: "indledning" },
      { blockId: "p2", correct: "aarsag" },
      { blockId: "p3", correct: "eksempel" },
      { blockId: "p4", correct: "resultat" },
    ],
    hint: "Se på de første ord i hvert afsnit: »En vigtig grund«, »for eksempel«, »Resultatet er«.",
    explanation:
      "Signalordene viser funktionen: »grund« = årsag, »for eksempel« = eksempel, »Resultatet er« = resultat.",
    marks: [
      { blockId: "p2", text: "En vigtig grund", kind: "clue" },
      { blockId: "p3", text: "for eksempel", kind: "clue" },
      { blockId: "p4", text: "Resultatet er", kind: "clue" },
    ],
  },
  {
    id: "afsnit-oev-2",
    textSlug: "sprogcafe",
    subskill: "afsnit",
    type: "paragraph_functions",
    prompt: "Hvad gør hvert afsnit i teksten?",
    choices: ["indledning", "fordel", "ulempe", "eksempel", "konklusion"],
    items: [
      { blockId: "p1", correct: "indledning" },
      { blockId: "p2", correct: "fordel" },
      { blockId: "p3", correct: "ulempe" },
      { blockId: "p4", correct: "konklusion" },
    ],
    hint: "»Til gengæld« skifter retning. »Alt i alt« samler op.",
    explanation:
      "»Den store fordel« = fordel, »Til gengæld« = ulempe, »Alt i alt« = konklusion.",
    marks: [
      { blockId: "p2", text: "Den store fordel", kind: "clue" },
      { blockId: "p3", text: "Til gengæld", kind: "clue" },
      { blockId: "p4", text: "Alt i alt", kind: "clue" },
    ],
  },

  // Afsnittenes funktion: test
  {
    id: "afsnit-test-1",
    textSlug: "vinterbadning",
    subskill: "afsnit",
    type: "paragraph_functions",
    prompt: "Hvad gør hvert afsnit i teksten?",
    choices: ["indledning", "aarsag", "fordel", "ulempe", "konklusion"],
    items: [
      { blockId: "p1", correct: "indledning" },
      { blockId: "p2", correct: "aarsag" },
      { blockId: "p3", correct: "ulempe" },
      { blockId: "p4", correct: "konklusion" },
    ],
    explanation:
      "»fordi« viser en årsag, »advarer dog« en ulempe, og »rådet derfor« samler op i en konklusion.",
    marks: [
      { blockId: "p2", text: "fordi", kind: "clue" },
      { blockId: "p3", text: "advarer dog", kind: "clue" },
      { blockId: "p4", text: "rådet derfor", kind: "clue" },
    ],
  },
  {
    id: "afsnit-test-2",
    textSlug: "delebiler",
    subskill: "afsnit",
    type: "paragraph_functions",
    prompt: "Hvad gør hvert afsnit i teksten?",
    choices: ["indledning", "fordel", "eksempel", "ulempe", "konklusion"],
    items: [
      { blockId: "p1", correct: "indledning" },
      { blockId: "p2", correct: "fordel" },
      { blockId: "p3", correct: "eksempel" },
      { blockId: "p4", correct: "ulempe" },
    ],
    explanation:
      "»En klar fordel« = fordel, »for eksempel« = eksempel, »Ulempen er« = ulempe. Teksten slutter uden en konklusion.",
    marks: [
      { blockId: "p2", text: "En klar fordel", kind: "clue" },
      { blockId: "p3", text: "for eksempel", kind: "clue" },
      { blockId: "p4", text: "Ulempen er", kind: "clue" },
    ],
  },
];

export const walkthroughs = [
  {
    subskill: "emne",
    textSlug: "sabbataar",
    question: "Hvad handler teksten primært om?",
    answer: "Unges valg om at tage et sabbatår",
    steps: [
      {
        text: "Læs ikke ord for ord. Spørg dig selv: Hvad handler teksten generelt om?",
        marks: [],
      },
      {
        text: "Første sætning præsenterer ofte emnet. Her handler den om unge, der tager et sabbatår.",
        marks: [
          { blockId: "p1", text: "Flere unge danskere vælger at tage et sabbatår efter gymnasiet.", kind: "clue" },
        ],
      },
      {
        text: "Se efter ord, der går igen. »Sabbatår« og »året« peger på det samme.",
        marks: [
          { blockId: "p1", text: "sabbatår", kind: "clue" },
          { blockId: "p1", text: "året", kind: "clue" },
        ],
      },
      {
        text: "At rejse og at arbejde er eksempler på, hvad de unge laver. Eksempler er ikke emnet.",
        marks: [
          { blockId: "p1", text: "rejser til udlandet", kind: "detail" },
          { blockId: "p1", text: "arbejder for at spare penge op", kind: "detail" },
        ],
      },
      {
        text: "Emnet er altså unges valg om at tage et sabbatår. Du behøvede ikke at forstå hvert ord.",
        marks: [
          { blockId: "p1", text: "sabbatår", kind: "clue" },
        ],
      },
    ],
  },
  {
    subskill: "hovedpointe",
    textSlug: "mobilregler",
    question: "Hvilken sætning udtrykker bedst tekstens hovedpointe?",
    answer: "Skoler indfører mobilregler, men der er forskellige holdninger til deres betydning.",
    steps: [
      {
        text: "Emnet er let at finde: mobilregler i skolen. Men hovedpointen er mere: Hvad siger teksten om emnet?",
        marks: [
          { blockId: "p1", text: "regler for mobiltelefoner", kind: "clue" },
        ],
      },
      {
        text: "Første sætning fortæller, hvad der sker: Skoler har indført regler.",
        marks: [
          { blockId: "p1", text: "Mange skoler har indført regler for mobiltelefoner i undervisningen.", kind: "clue" },
        ],
      },
      {
        text: "Anden sætning forklarer hvorfor. Det er vigtigt, men det er ikke hele pointen.",
        marks: [
          { blockId: "p1", text: "Formålet er at skabe mere ro og bedre koncentration.", kind: "detail" },
        ],
      },
      {
        text: "Læg mærke til »mens«. Teksten viser to holdninger: Nogle lærere er positive, andre ser fordele ved telefoner.",
        marks: [
          { blockId: "p1", text: "Nogle lærere oplever positive resultater", kind: "clue" },
          { blockId: "p1", text: "mens", kind: "clue" },
          { blockId: "p1", text: "andre mener", kind: "clue" },
        ],
      },
      {
        text: "En god hovedpointe dækker hele teksten – også begge holdninger. Pas på svar, der overdriver eller kun har én side med.",
        marks: [],
      },
    ],
  },
  {
    subskill: "afsnit",
    textSlug: "hjemmearbejde",
    question: "Hvad gør hvert afsnit i teksten?",
    answer: "Indledning → fordel → ulempe → konklusion",
    steps: [
      {
        text: "Læs titlen og den første sætning i hvert afsnit. Det er nok til at se, hvad afsnittet gør.",
        marks: [{ blockId: "title", kind: "clue" }],
      },
      {
        text: "Afsnit 1 præsenterer emnet: hjemmearbejde. Det er en indledning.",
        marks: [{ blockId: "p1", kind: "clue" }],
      },
      {
        text: "Afsnit 2 starter med »En vigtig fordel«. Signalordet fortæller funktionen: fordel.",
        marks: [{ blockId: "p2", text: "En vigtig fordel", kind: "clue" }],
      },
      {
        text: "»Til gengæld« skifter retning. Afsnit 3 beskriver en ulempe.",
        marks: [{ blockId: "p3", text: "Til gengæld", kind: "clue" }],
      },
      {
        text: "»derfor« viser, at afsnit 4 samler op på det, der er sagt før. Det er en konklusion.",
        marks: [{ blockId: "p4", text: "derfor", kind: "clue" }],
      },
    ],
  },
];

/*
  Each lesson: see how → practise with feedback → test → review.
  practise and check run several texts; each text has its own questions.
  preview: show only the title before the text opens.
*/
export const lessons = [
  {
    slug: "emne",
    subskill: "emne",
    stages: [
      { kind: "walkthrough" },
      {
        kind: "practice",
        items: [
          { textSlug: "vintercykling", questionIds: ["emne-oev-1"] },
          { textSlug: "frivillig", questionIds: ["emne-oev-2"] },
        ],
      },
      {
        kind: "check",
        items: [
          { textSlug: "genbrug", questionIds: ["emne-test-1"] },
          { textSlug: "madpakke", questionIds: ["emne-test-2"] },
        ],
      },
      { kind: "review" },
    ],
  },
  {
    slug: "hovedpointe",
    subskill: "hovedpointe",
    stages: [
      { kind: "walkthrough" },
      {
        kind: "practice",
        items: [
          { textSlug: "firedagesuge", questionIds: ["pointe-oev-1"] },
          { textSlug: "elbiler", questionIds: ["pointe-oev-2"] },
        ],
      },
      {
        kind: "check",
        items: [
          { textSlug: "biblioteker", questionIds: ["pointe-test-1"] },
          { textSlug: "byhaver", questionIds: ["pointe-test-2"] },
        ],
      },
      { kind: "review" },
    ],
  },
  {
    slug: "afsnit",
    subskill: "afsnit",
    stages: [
      { kind: "walkthrough" },
      {
        kind: "practice",
        items: [
          { textSlug: "madspild", questionIds: ["afsnit-oev-1"], preview: true },
          { textSlug: "sprogcafe", questionIds: ["afsnit-oev-2"], preview: true },
        ],
      },
      {
        kind: "check",
        items: [
          { textSlug: "vinterbadning", questionIds: ["afsnit-test-1"], preview: true },
          { textSlug: "delebiler", questionIds: ["afsnit-test-2"], preview: true },
        ],
      },
      { kind: "review" },
    ],
  },
];
