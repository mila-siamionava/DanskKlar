/*
  Sample scanning content, shaped like the future Supabase tables
  (reading_skills, reading_subskills, reading_documents, reading_questions).
  getScanning.js is the only file that reads this, so moving to the
  database later only changes that file.

  Document blocks have ids so questions can point to their evidence.
  Table rows have their own ids for the same reason.
*/

export const subskills = [
  {
    slug: "tal-og-tid",
    title: "Find tal og tidspunkter",
    description: "Priser, datoer, klokkeslæt og antal.",
    order: 1,
  },
  {
    slug: "noegleord",
    title: "Find nøgleord og synonymer",
    description:
      "Spørgsmålet bruger ofte andre ord end teksten.",
    order: 2,
  },
  {
    slug: "regler",
    title: "Forstå regler og undtagelser",
    description:
      "Små ord som »kun«, »undtagen« og »dog« ændrer svaret.",
    order: 3,
  },
];

export const documents = [
  {
    slug: "bibliotek",
    title: "Søndervang Bibliotek",
    format: "opening_hours",
    level: "B1+",
    topicSlug: null,
    blocks: [
      {
        id: "intro",
        type: "paragraph",
        text: "Biblioteket har både betjent og selvbetjent åbningstid. I den selvbetjente åbningstid skal du bruge dit sundhedskort og din pinkode for at komme ind.",
      },
      {
        id: "tider",
        type: "table",
        caption: "Åbningstider",
        columns: ["Dag", "Betjent", "Selvbetjent"],
        rows: [
          { id: "man", cells: ["Mandag", "10.00–18.00", "7.00–22.00"] },
          { id: "tir", cells: ["Tirsdag", "10.00–18.00", "7.00–22.00"] },
          { id: "ons", cells: ["Onsdag", "12.00–18.00", "7.00–22.00"] },
          { id: "tor", cells: ["Torsdag", "10.00–19.00", "7.00–22.00"] },
          { id: "fre", cells: ["Fredag", "10.00–16.00", "7.00–22.00"] },
          { id: "lor", cells: ["Lørdag", "10.00–14.00", "8.00–18.00"] },
          { id: "son", cells: ["Søndag", "Lukket", "8.00–18.00"] },
        ],
      },
      {
        id: "saerlige-overskrift",
        type: "heading",
        text: "Særlige åbningstider",
      },
      {
        id: "saerlige",
        type: "list",
        items: [
          { id: "jul", text: "Juleaftensdag (24. december): lukket hele dagen." },
          { id: "nytaar", text: "Nytårsaftensdag (31. december): betjent kl. 10.00–12.00. Ingen selvbetjening om aftenen." },
          { id: "grundlov", text: "Grundlovsdag (5. juni): kun selvbetjent kl. 8.00–18.00." },
        ],
      },
      {
        id: "telefon",
        type: "paragraph",
        text: "Telefonen er åben mandag–fredag kl. 10.00–14.00 på 70 20 30 40.",
      },
      {
        id: "boern",
        type: "notice",
        text: "Børn under 15 år må kun bruge biblioteket i den selvbetjente åbningstid sammen med en voksen.",
      },
    ],
  },
  {
    slug: "borgerservice",
    title: "Borgerservice Søndervang",
    format: "opening_hours",
    level: "B1+",
    topicSlug: null,
    blocks: [
      {
        id: "intro",
        type: "paragraph",
        text: "Du skal bestille tid, før du møder op. Det gælder både pas, kørekort og sundhedskort. Uden en bestilt tid kan vi desværre ikke hjælpe dig.",
      },
      {
        id: "tider",
        type: "table",
        caption: "Åbningstider",
        columns: ["Dag", "Med bestilt tid", "Telefon"],
        rows: [
          { id: "man", cells: ["Mandag", "9.00–15.00", "9.00–14.00"] },
          { id: "tir", cells: ["Tirsdag", "9.00–15.00", "9.00–14.00"] },
          { id: "ons", cells: ["Onsdag", "Lukket", "9.00–14.00"] },
          { id: "tor", cells: ["Torsdag", "9.00–17.30", "9.00–16.00"] },
          { id: "fre", cells: ["Fredag", "9.00–13.00", "9.00–12.00"] },
        ],
      },
      {
        id: "undtagelser-overskrift",
        type: "heading",
        text: "Undtagelser",
      },
      {
        id: "undtagelser",
        type: "list",
        items: [
          { id: "hent-pas", text: "Hent dit pas: Du kan hente et færdigt pas uden at bestille tid, men kun torsdag kl. 15.00–17.30." },
          { id: "akut", text: "Akut pas: Skal du rejse inden for 3 hverdage, kan du ringe og få en akut tid. Det koster 230 kr. ekstra." },
          { id: "over-75", text: "Borgere over 75 år kan få hjælp uden bestilt tid tirsdag kl. 9.00–11.00." },
        ],
      },
      {
        id: "husk",
        type: "paragraph",
        text: "Bestil tid på kommunens hjemmeside eller på telefon. Husk at medbringe gyldig billedlegitimation.",
      },
    ],
  },
  {
    slug: "svoemmehal",
    title: "Nordbyens Svømmehal",
    format: "opening_hours",
    level: "B1+",
    topicSlug: "sundhed",
    blocks: [
      {
        id: "intro",
        type: "paragraph",
        text: "Svømmehallen har et 25-meter-bassin, et varmtvandsbassin (32 grader) og et børnebassin. Saunaen er inkluderet i billetprisen.",
      },
      {
        id: "tider",
        type: "table",
        caption: "Åbningstider",
        columns: ["Dag", "Offentlig svømning", "Morgensvømning"],
        rows: [
          { id: "hverdag", cells: ["Mandag–fredag", "15.00–21.00", "6.00–8.00"] },
          { id: "lor", cells: ["Lørdag", "9.00–16.00", "–"] },
          { id: "son", cells: ["Søndag", "9.00–15.00", "–"] },
        ],
      },
      {
        id: "priser",
        type: "table",
        caption: "Priser",
        columns: ["Billet", "Pris"],
        rows: [
          { id: "voksen", cells: ["Voksen", "55 kr."] },
          { id: "barn", cells: ["Barn (3–15 år)", "30 kr."] },
          { id: "pensionist", cells: ["Pensionist", "35 kr."] },
          { id: "klippekort", cells: ["10-turskort, voksen", "450 kr."] },
          { id: "under-3", cells: ["Børn under 3 år", "Gratis"] },
        ],
      },
      {
        id: "regler-overskrift",
        type: "heading",
        text: "Regler",
      },
      {
        id: "regler",
        type: "list",
        items: [
          { id: "ledsager", text: "Børn under 10 år skal være ledsaget af en voksen over 18 år, som også er i vandet." },
          { id: "morgen", text: "Morgensvømning er kun for voksne og kun i 25-meter-bassinet." },
          { id: "varmtvand", text: "Varmtvandsbassinet er lukket for offentlig svømning tirsdag kl. 15.00–17.00 på grund af genoptræning." },
          { id: "bad", text: "Man skal gå i bad uden badetøj, før man går i bassinet." },
        ],
      },
      {
        id: "sommer",
        type: "paragraph",
        text: "Svømmehallen holder sommerlukket fra 29. juni til 26. juli.",
      },
    ],
  },
  {
    slug: "aftenskole",
    title: "Aftenskolen Lindely – kurser i efteråret 2026",
    format: "course_list",
    level: "B2",
    topicSlug: null,
    blocks: [
      {
        id: "intro",
        type: "paragraph",
        text: "Tilmelding sker på aftenskolens hjemmeside, og du betaler ved tilmeldingen. Melder du fra senest 14 dage før kursusstart, får du pengene tilbage minus et gebyr på 75 kr.",
      },
      {
        id: "kurser",
        type: "table",
        caption: "Kursusoversigt",
        columns: ["Kursus", "Dag og tid", "Start", "Gange", "Pris", "Sted"],
        rows: [
          { id: "udtale", cells: ["Dansk udtale for udlændinge", "Mandag 18.00–20.00", "7. september", "10", "895 kr.", "Lokale 4"] },
          { id: "excel", cells: ["Excel for begyndere", "Tirsdag 17.30–20.30", "15. september", "6", "1.150 kr.", "Edb-lokalet"] },
          { id: "yoga", cells: ["Yoga for alle", "Onsdag 19.00–20.30", "9. september", "12", "980 kr.", "Gymnastiksalen"] },
          { id: "mad", cells: ["Madlavning: Det nordiske køkken", "Torsdag 17.00–21.00", "1. oktober", "4", "1.250 kr. (inkl. råvarer)", "Skolekøkkenet"] },
          { id: "job", cells: ["Jobansøgning og cv", "Lørdag 10.00–14.00", "3. oktober", "2", "450 kr.", "Lokale 2"] },
        ],
      },
      {
        id: "bemaerk-overskrift",
        type: "heading",
        text: "Bemærk",
      },
      {
        id: "bemaerk",
        type: "list",
        items: [
          { id: "rabat", text: "Pensionister og studerende får 20 % rabat på alle kurser undtagen madlavning." },
          { id: "computer", text: "Til Excel for begyndere skal du selv medbringe en bærbar computer." },
          { id: "deltagere", text: "Der er højst 12 deltagere på hvert hold. Yoga for alle har dog plads til 20." },
          { id: "ferie", text: "Der er ingen undervisning i uge 42 (efterårsferien)." },
        ],
      },
    ],
  },
  {
    slug: "bus",
    title: "Linje 14: Banegården – Universitetet – Skejby Sygehus",
    format: "timetable",
    level: "B2",
    topicSlug: null,
    blocks: [
      {
        id: "intro",
        type: "paragraph",
        text: "Køreplanen gælder fra 10. august 2026. På hverdage kører bussen hvert 10. minut i myldretiden (kl. 7.00–9.00 og 15.00–17.00) og ellers hvert 20. minut.",
      },
      {
        id: "afgange",
        type: "table",
        caption: "Første og sidste afgang fra Banegården",
        columns: ["Dag", "Første bus", "Sidste bus"],
        rows: [
          { id: "hverdag", cells: ["Mandag–fredag", "5.12", "0.42"] },
          { id: "lor", cells: ["Lørdag", "6.22", "1.12"] },
          { id: "son", cells: ["Søndag og helligdage", "7.32", "23.42"] },
        ],
      },
      {
        id: "koeretid",
        type: "table",
        caption: "Køretid fra Banegården",
        columns: ["Stoppested", "Minutter"],
        rows: [
          { id: "raadhus", cells: ["Rådhuspladsen", "3"] },
          { id: "uni", cells: ["Universitetet", "11"] },
          { id: "noerrebro", cells: ["Nørrebrogade", "15"] },
          { id: "skejby", cells: ["Skejby Sygehus", "24"] },
        ],
      },
      {
        id: "vigtigt-overskrift",
        type: "heading",
        text: "Vigtigt",
      },
      {
        id: "vigtigt",
        type: "list",
        items: [
          { id: "nat", text: "Natbussen (linje 14N) kører kun fredag og lørdag nat fra kl. 1.30 til 4.30." },
          { id: "vejarbejde", text: "Fra 5. til 30. oktober kører bussen ikke forbi Rådhuspladsen på grund af vejarbejde. Brug i stedet stoppestedet Park Allé." },
          { id: "doer", text: "Barnevogne og kørestole skal bruge den midterste dør." },
          { id: "billet", text: "Billetter kan ikke købes hos chaufføren. Brug appen eller en billetautomat." },
        ],
      },
    ],
  },
  {
    slug: "vaskeri",
    title: "Til alle beboere i Egeparken – nyt om vaskeriet",
    format: "notice",
    level: "B1+",
    topicSlug: null,
    blocks: [
      {
        id: "intro",
        type: "paragraph",
        text: "Vaskeriet i kælderen under opgang 7 bliver renoveret. Vi får nye vaskemaskiner og tørretumblere, og gulvet bliver lagt om.",
      },
      {
        id: "plan",
        type: "table",
        caption: "Tidsplan",
        columns: ["Periode", "Hvad sker der?"],
        rows: [
          { id: "uge1", cells: ["2.–6. november", "Vaskeriet er helt lukket."] },
          { id: "uge2", cells: ["9.–13. november", "To vaskemaskiner kan bruges. Tørretumblerne er stadig lukkede."] },
          { id: "uge3", cells: ["Fra 16. november", "Vaskeriet er åbent som normalt."] },
        ],
      },
      {
        id: "lukket-overskrift",
        type: "heading",
        text: "Mens vaskeriet er lukket",
      },
      {
        id: "lukket",
        type: "list",
        items: [
          { id: "opgang3", text: "Du kan bruge vaskeriet i opgang 3. Det kræver, at du bestiller tid i beboerappen." },
          { id: "hoejst", text: "Hver lejlighed må højst bestille 2 vasketider om ugen i opgang 3." },
          { id: "aaben", text: "Vaskeriet i opgang 3 er åbent kl. 7.00–21.00. Om søndagen åbner det dog først kl. 10.00." },
          { id: "larm", text: "Håndværkerne arbejder mandag–fredag kl. 7.00–15.30. Der kan være larm i opgang 5, 7 og 9 i det tidsrum." },
        ],
      },
      {
        id: "kontakt",
        type: "paragraph",
        text: "Har du spørgsmål, er du velkommen på ejendomskontoret i opgang 1 tirsdag kl. 16.00–18.00.",
      },
    ],
  },
  {
    slug: "jobcenter",
    title: "Jobcenter Søndervang – workshops i november",
    format: "course_list",
    level: "C1",
    topicSlug: "arbejde",
    blocks: [
      {
        id: "intro",
        type: "paragraph",
        text: "Workshopperne er gratis for borgere, der er tilmeldt jobcentret. Du tilmelder dig på Jobnet senest 3 dage før. Pladserne fordeles efter først-til-mølle-princippet.",
      },
      {
        id: "program",
        type: "table",
        caption: "Program",
        columns: ["Workshop", "Dato", "Tid", "Sprog", "Bemærkninger"],
        rows: [
          { id: "ansoegning", cells: ["Skriv en stærk ansøgning", "3. november", "9.00–12.00", "Dansk", "Medbring en jobannonce"] },
          { id: "linkedin", cells: ["LinkedIn for jobsøgere", "5. november", "13.00–15.00", "Engelsk", "Kun for akademikere"] },
          { id: "samtale", cells: ["Forbered dig til jobsamtalen", "10. november", "9.00–13.00", "Dansk", "Kræver dansk på mindst B1-niveau"] },
          { id: "fleksjob", cells: ["Fleksjob – dine muligheder", "12. november", "10.00–11.30", "Dansk", "Kun for borgere, der er visiteret til fleksjob"] },
          { id: "virksomhed", cells: ["Start egen virksomhed", "17. november", "17.00–20.00", "Dansk og engelsk", "Også åben for borgere, der ikke er tilmeldt jobcentret (pris 200 kr.)"] },
        ],
      },
      {
        id: "praktisk-overskrift",
        type: "heading",
        text: "Praktisk",
      },
      {
        id: "praktisk",
        type: "list",
        items: [
          { id: "afbud", text: "Er du syg, skal du melde afbud senest kl. 8.00 samme dag. Ellers kan det påvirke din ydelse." },
          { id: "lokale", text: "Alle workshops foregår i mødelokale 2.14 på 2. sal, undtagen »Start egen virksomhed«, som holdes i kantinen." },
          { id: "elevator", text: "Der er elevator, men den er ude af drift indtil 8. november." },
        ],
      },
    ],
  },
  {
    slug: "kulturnat",
    title: "Kulturnat i Søndervang",
    format: "programme",
    level: "B2",
    topicSlug: null,
    blocks: [
      {
        id: "intro",
        type: "paragraph",
        text: "Fredag den 9. oktober kl. 17.00–24.00 åbner byens kulturinstitutioner dørene. Med et kulturnatsarmbånd til 40 kr. får du adgang til alle arrangementer og kan køre gratis med bybusserne hele aftenen. Børn under 12 år behøver ikke armbånd.",
      },
      {
        id: "program",
        type: "table",
        caption: "Udvalgte arrangementer",
        columns: ["Sted", "Tid", "Arrangement", "Bemærk"],
        rows: [
          { id: "bibliotek", cells: ["Søndervang Bibliotek", "17.00–19.00", "Højtlæsning og tegneværksted", "Kun for børn på 4–10 år"] },
          { id: "museum", cells: ["Kunstmuseet", "18.00–23.00", "Guidede ture hver hele time", "Højst 25 personer pr. tur"] },
          { id: "taarn", cells: ["Rådhustårnet", "19.00–22.00", "Se byen fra toppen", "Ikke egnet for kørestole – der er 160 trin"] },
          { id: "koncert", cells: ["Musikhuset", "20.30–21.30", "Koncert med byens kor", "Kræver gratis billet fra musikhusets hjemmeside"] },
          { id: "kirke", cells: ["Domkirken", "22.00–23.30", "Orgelmusik i stearinlysets skær", "Dørene lukkes kl. 22.10"] },
        ],
      },
      {
        id: "armbaand",
        type: "paragraph",
        text: "Armbåndet kan købes på biblioteket og i turistinformationen fra 1. oktober. Ved regn bliver boderne på Torvet aflyst.",
      },
    ],
  },
];

/*
  Question types:
  - true_false: correctValue is true or false
  - multiple_choice: options + correctOptionId
  - short_answer: acceptedAnswers (compared after normalizing, see checkAnswer.js)

  evidence: block, row or list item ids that hold the answer
  hints: only shown in guided practice
*/
export const questions = [
  // Find tal og tidspunkter: prøv selv
  {
    id: "tal-proev-1",
    documentSlug: "bibliotek",
    subskill: "tal-og-tid",
    type: "true_false",
    prompt: "Biblioteket er betjent til kl. 19.00 om torsdagen.",
    correctValue: true,
    explanation: "I rækken »Torsdag« står der 10.00–19.00 under »Betjent«.",
    evidence: ["tor"],
  },
  {
    id: "tal-proev-2",
    documentSlug: "bibliotek",
    subskill: "tal-og-tid",
    type: "multiple_choice",
    prompt: "Hvornår slutter den betjente åbningstid om lørdagen?",
    options: [
      { id: "a", text: "Kl. 14.00" },
      { id: "b", text: "Kl. 16.00" },
      { id: "c", text: "Kl. 18.00" },
      { id: "d", text: "Kl. 22.00" },
    ],
    correctOptionId: "a",
    explanation: "I rækken »Lørdag« står der 10.00–14.00 under »Betjent«. 18.00 er den selvbetjente åbningstid.",
    evidence: ["lor"],
  },

  // Find tal og tidspunkter: øv med hjælp
  {
    id: "tal-guide-1",
    documentSlug: "svoemmehal",
    subskill: "tal-og-tid",
    type: "true_false",
    prompt: "En pensionist betaler mindre end et barn.",
    correctValue: false,
    explanation: "En pensionist betaler 35 kr., og et barn betaler 30 kr. Pensionisten betaler altså mere.",
    evidence: ["pensionist", "barn"],
    hints: {
      strategy: "Du skal sammenligne to tal. Find begge priser, før du svarer.",
      location: "Se i tabellen »Priser«.",
    },
  },
  {
    id: "tal-guide-2",
    documentSlug: "svoemmehal",
    subskill: "tal-og-tid",
    type: "multiple_choice",
    prompt: "Hvor mange timer er der offentlig svømning om lørdagen?",
    options: [
      { id: "a", text: "6 timer" },
      { id: "b", text: "7 timer" },
      { id: "c", text: "8 timer" },
      { id: "d", text: "9 timer" },
    ],
    correctOptionId: "b",
    explanation: "Om lørdagen er der offentlig svømning kl. 9.00–16.00. Det er 7 timer.",
    evidence: ["lor"],
    hints: {
      strategy: "Find dagen først. Regn så ud, hvor lang tid der er mellem de to klokkeslæt.",
      location: "Se i tabellen »Åbningstider«, rækken »Lørdag«.",
    },
  },
  {
    id: "tal-guide-3",
    documentSlug: "svoemmehal",
    subskill: "tal-og-tid",
    type: "short_answer",
    prompt: "Hvad koster et 10-turskort for en voksen? Skriv kun tallet.",
    acceptedAnswers: ["450", "450 kr", "450 kroner"],
    explanation: "I tabellen »Priser« står der: 10-turskort, voksen – 450 kr.",
    evidence: ["klippekort"],
    hints: {
      strategy: "Led efter ordet »10-turskort«. Du behøver ikke læse resten.",
      location: "Se i tabellen »Priser«.",
    },
  },

  // Find tal og tidspunkter: øv selv
  {
    id: "tal-selv-1",
    documentSlug: "aftenskole",
    subskill: "tal-og-tid",
    type: "true_false",
    prompt: "Kurset i dansk udtale varer i alt 20 timer.",
    correctValue: true,
    explanation: "Kurset er 10 gange à 2 timer (18.00–20.00). 10 × 2 = 20 timer.",
    evidence: ["udtale"],
  },
  {
    id: "tal-selv-2",
    documentSlug: "aftenskole",
    subskill: "tal-og-tid",
    type: "multiple_choice",
    prompt: "Hvornår starter kurset »Jobansøgning og cv«?",
    options: [
      { id: "a", text: "7. september" },
      { id: "b", text: "15. september" },
      { id: "c", text: "1. oktober" },
      { id: "d", text: "3. oktober" },
    ],
    correctOptionId: "d",
    explanation: "I rækken »Jobansøgning og cv« står der 3. oktober under »Start«.",
    evidence: ["job"],
  },
  {
    id: "tal-selv-3",
    documentSlug: "aftenskole",
    subskill: "tal-og-tid",
    type: "multiple_choice",
    prompt: "Hvor mange gange mødes holdet i »Yoga for alle«?",
    options: [
      { id: "a", text: "4 gange" },
      { id: "b", text: "6 gange" },
      { id: "c", text: "10 gange" },
      { id: "d", text: "12 gange" },
    ],
    correctOptionId: "d",
    explanation: "I rækken »Yoga for alle« står der 12 under »Gange«.",
    evidence: ["yoga"],
  },
  {
    id: "tal-selv-4",
    documentSlug: "aftenskole",
    subskill: "tal-og-tid",
    type: "short_answer",
    prompt: "Hvad koster »Excel for begyndere«? Skriv kun tallet.",
    acceptedAnswers: ["1150", "1150 kr", "1150 kroner"],
    explanation: "I rækken »Excel for begyndere« står der 1.150 kr. under »Pris«.",
    evidence: ["excel"],
  },

  // Find tal og tidspunkter: test dig selv
  {
    id: "tal-test-1",
    documentSlug: "bus",
    subskill: "tal-og-tid",
    type: "true_false",
    prompt: "Om lørdagen kører den første bus fra Banegården kl. 6.22.",
    correctValue: true,
    explanation: "I rækken »Lørdag« står der 6.22 under »Første bus«.",
    evidence: ["lor"],
  },
  {
    id: "tal-test-2",
    documentSlug: "bus",
    subskill: "tal-og-tid",
    type: "multiple_choice",
    prompt: "Hvor tit kører bussen en tirsdag kl. 8.00?",
    options: [
      { id: "a", text: "Hvert 10. minut" },
      { id: "b", text: "Hvert 20. minut" },
      { id: "c", text: "Hvert 30. minut" },
      { id: "d", text: "En gang i timen" },
    ],
    correctOptionId: "a",
    explanation: "Kl. 8.00 er i myldretiden (7.00–9.00). Så kører bussen hvert 10. minut.",
    evidence: ["intro"],
  },
  {
    id: "tal-test-3",
    documentSlug: "bus",
    subskill: "tal-og-tid",
    type: "multiple_choice",
    prompt: "Hvornår kører den sidste bus søndag aften?",
    options: [
      { id: "a", text: "Kl. 23.42" },
      { id: "b", text: "Kl. 0.42" },
      { id: "c", text: "Kl. 1.12" },
      { id: "d", text: "Kl. 4.30" },
    ],
    correctOptionId: "a",
    explanation: "I rækken »Søndag og helligdage« står der 23.42 under »Sidste bus«.",
    evidence: ["son"],
  },
  {
    id: "tal-test-4",
    documentSlug: "bus",
    subskill: "tal-og-tid",
    type: "short_answer",
    prompt: "Hvor mange minutter tager turen fra Banegården til Universitetet?",
    acceptedAnswers: ["11", "11 minutter", "11 min"],
    explanation: "I tabellen »Køretid fra Banegården« står der 11 minutter ved Universitetet.",
    evidence: ["uni"],
  },

  // Find nøgleord og synonymer: prøv selv
  {
    id: "ord-proev-1",
    documentSlug: "vaskeri",
    subskill: "noegleord",
    type: "true_false",
    prompt: "Man skal reservere en tid, hvis man vil vaske i opgang 3.",
    correctValue: true,
    explanation: "Teksten bruger ikke ordet »reservere«, men »bestiller tid«. Det betyder det samme.",
    evidence: ["opgang3"],
  },
  {
    id: "ord-proev-2",
    documentSlug: "vaskeri",
    subskill: "noegleord",
    type: "multiple_choice",
    prompt: "Hvor kan der være støj i dagtimerne?",
    options: [
      { id: "a", text: "I opgang 5, 7 og 9" },
      { id: "b", text: "I opgang 3" },
      { id: "c", text: "I hele Egeparken" },
      { id: "d", text: "På ejendomskontoret" },
    ],
    correctOptionId: "a",
    explanation: "»Støj« står ikke i teksten. Der står »larm«, som betyder det samme.",
    evidence: ["larm"],
  },

  // Find nøgleord og synonymer: øv med hjælp
  {
    id: "ord-guide-1",
    documentSlug: "borgerservice",
    subskill: "noegleord",
    type: "true_false",
    prompt: "Du skal have et id med billede med, når du kommer.",
    correctValue: true,
    explanation: "»Billedlegitimation« er et id med billede, fx pas eller kørekort.",
    evidence: ["husk"],
    hints: {
      strategy: "Tænk på et andet ord for »id«. Et formelt ord er »legitimation«.",
      location: "Se i det sidste afsnit.",
    },
  },
  {
    id: "ord-guide-2",
    documentSlug: "borgerservice",
    subskill: "noegleord",
    type: "multiple_choice",
    prompt: "Hvad kan man gøre, hvis man skal ud at rejse meget snart?",
    options: [
      { id: "a", text: "Hente sit pas om torsdagen" },
      { id: "b", text: "Ringe og få en akut tid" },
      { id: "c", text: "Møde op uden at bestille tid" },
      { id: "d", text: "Bestille et nyt kørekort" },
    ],
    correctOptionId: "b",
    explanation: "»Meget snart« står i teksten som »inden for 3 hverdage«. Så kan man ringe og få en akut tid.",
    evidence: ["akut"],
    hints: {
      strategy: "»Meget snart« står nok ikke i teksten. Led efter et kort tidsrum, fx »inden for … dage«.",
      location: "Se under »Undtagelser«.",
    },
  },
  {
    id: "ord-guide-3",
    documentSlug: "borgerservice",
    subskill: "noegleord",
    type: "short_answer",
    prompt: "Hvilken dag kan man ikke komme forbi borgerservice?",
    acceptedAnswers: ["onsdag", "om onsdagen", "onsdage"],
    explanation: "I rækken »Onsdag« står der »Lukket« under »Med bestilt tid«.",
    evidence: ["ons"],
    hints: {
      strategy: "»Ikke komme forbi« betyder, at der er lukket. Led efter ordet »Lukket«.",
      location: "Se i tabellen »Åbningstider«.",
    },
  },

  // Find nøgleord og synonymer: øv selv
  {
    id: "ord-selv-1",
    documentSlug: "bus",
    subskill: "noegleord",
    type: "true_false",
    prompt: "Man kan betale hos chaufføren, når man stiger på bussen.",
    correctValue: false,
    explanation: "»Billetter kan ikke købes hos chaufføren.« At betale og at købe en billet er det samme her.",
    evidence: ["billet"],
  },
  {
    id: "ord-selv-2",
    documentSlug: "bus",
    subskill: "noegleord",
    type: "multiple_choice",
    prompt: "Hvad skal man gøre, hvis man har en barnevogn med?",
    options: [
      { id: "a", text: "Stige ind ad den midterste dør" },
      { id: "b", text: "Købe billet i appen" },
      { id: "c", text: "Tage natbussen" },
      { id: "d", text: "Stige af ved Park Allé" },
    ],
    correctOptionId: "a",
    explanation: "»Barnevogne og kørestole skal bruge den midterste dør.«",
    evidence: ["doer"],
  },
  {
    id: "ord-selv-3",
    documentSlug: "bus",
    subskill: "noegleord",
    type: "multiple_choice",
    prompt: "Hvor lang tid tager turen fra Banegården til hospitalet?",
    options: [
      { id: "a", text: "3 minutter" },
      { id: "b", text: "11 minutter" },
      { id: "c", text: "15 minutter" },
      { id: "d", text: "24 minutter" },
    ],
    correctOptionId: "d",
    explanation: "Ordet »hospital« står ikke i køreplanen. Der står »Sygehus«: Skejby Sygehus, 24 minutter.",
    evidence: ["skejby"],
  },
  {
    id: "ord-selv-4",
    documentSlug: "bus",
    subskill: "noegleord",
    type: "short_answer",
    prompt: "Hvilket stoppested skal man bruge i stedet for Rådhuspladsen midt i oktober?",
    acceptedAnswers: ["park allé", "park allé stoppestedet", "stoppestedet park allé"],
    explanation: "Fra 5. til 30. oktober skal man bruge stoppestedet Park Allé på grund af vejarbejde.",
    evidence: ["vejarbejde"],
  },

  // Find nøgleord og synonymer: test dig selv
  {
    id: "ord-test-1",
    documentSlug: "jobcenter",
    subskill: "noegleord",
    type: "true_false",
    prompt: "Man skal melde sig til workshopperne på Jobnet.",
    correctValue: true,
    explanation: "»Du tilmelder dig på Jobnet.« At tilmelde sig og at melde sig til betyder det samme.",
    evidence: ["intro"],
  },
  {
    id: "ord-test-2",
    documentSlug: "jobcenter",
    subskill: "noegleord",
    type: "multiple_choice",
    prompt: "Hvad skal du tage med til workshoppen om ansøgninger?",
    options: [
      { id: "a", text: "En jobannonce" },
      { id: "b", text: "Et cv" },
      { id: "c", text: "En computer" },
      { id: "d", text: "200 kr." },
    ],
    correctOptionId: "a",
    explanation: "»Medbring en jobannonce.« At medbringe betyder at tage med.",
    evidence: ["ansoegning"],
  },
  {
    id: "ord-test-3",
    documentSlug: "jobcenter",
    subskill: "noegleord",
    type: "multiple_choice",
    prompt: "Hvad kan der ske, hvis man er syg og ikke giver besked i tide?",
    options: [
      { id: "a", text: "Det kan få betydning for ens ydelse" },
      { id: "b", text: "Man skal betale 200 kr." },
      { id: "c", text: "Man mister sin profil på Jobnet" },
      { id: "d", text: "Man skal komme næste gang" },
    ],
    correctOptionId: "a",
    explanation: "»Ellers kan det påvirke din ydelse.« At påvirke betyder her at få betydning for.",
    evidence: ["afbud"],
  },
  {
    id: "ord-test-4",
    documentSlug: "jobcenter",
    subskill: "noegleord",
    type: "short_answer",
    prompt: "Indtil hvilken dato virker elevatoren ikke? Skriv fx »3. november«.",
    acceptedAnswers: ["8. november", "8 november", "8.11", "8/11"],
    explanation: "»Ude af drift« betyder, at den ikke virker. Det gælder indtil 8. november.",
    evidence: ["elevator"],
  },

  // Forstå regler og undtagelser: prøv selv
  {
    id: "regel-proev-1",
    documentSlug: "borgerservice",
    subskill: "regler",
    type: "true_false",
    prompt: "Man kan altid komme i borgerservice uden at have bestilt tid.",
    correctValue: false,
    explanation: "»Du skal bestille tid, før du møder op.« Der er kun nogle få undtagelser.",
    evidence: ["intro"],
  },
  {
    id: "regel-proev-2",
    documentSlug: "borgerservice",
    subskill: "regler",
    type: "multiple_choice",
    prompt: "Hvem kan få hjælp uden bestilt tid om tirsdagen?",
    options: [
      { id: "a", text: "Alle borgere" },
      { id: "b", text: "Borgere over 75 år" },
      { id: "c", text: "Borgere, der skal hente pas" },
      { id: "d", text: "Borgere, der skal rejse inden for 3 dage" },
    ],
    correctOptionId: "b",
    explanation: "Undtagelsen gælder kun borgere over 75 år, tirsdag kl. 9.00–11.00. Pas kan kun hentes om torsdagen.",
    evidence: ["over-75"],
  },

  // Forstå regler og undtagelser: øv med hjælp
  {
    id: "regel-guide-1",
    documentSlug: "vaskeri",
    subskill: "regler",
    type: "true_false",
    prompt: "Man kan tørre tøj i vaskeriet i opgang 7 den 10. november.",
    correctValue: false,
    explanation: "Den 9.–13. november kan to vaskemaskiner bruges, men tørretumblerne er stadig lukkede.",
    evidence: ["uge2"],
    hints: {
      strategy: "Find datoen, og læs hele rækken. Små ord som »stadig« og »men« er vigtige.",
      location: "Se i tabellen »Tidsplan«.",
    },
  },
  {
    id: "regel-guide-2",
    documentSlug: "vaskeri",
    subskill: "regler",
    type: "multiple_choice",
    prompt: "Hvor mange vasketider må en lejlighed bestille om ugen i opgang 3?",
    options: [
      { id: "a", text: "1" },
      { id: "b", text: "2" },
      { id: "c", text: "3" },
      { id: "d", text: "Så mange, man vil" },
    ],
    correctOptionId: "b",
    explanation: "»Højst 2 vasketider om ugen.« »Højst« betyder, at man ikke må bestille flere.",
    evidence: ["hoejst"],
    hints: {
      strategy: "Ord som »højst«, »mindst« og »kun« viser en grænse.",
      location: "Se under »Mens vaskeriet er lukket«.",
    },
  },
  {
    id: "regel-guide-3",
    documentSlug: "vaskeri",
    subskill: "regler",
    type: "short_answer",
    prompt: "Hvornår åbner vaskeriet i opgang 3 om søndagen? Skriv klokkeslættet.",
    acceptedAnswers: ["10.00", "10"],
    explanation: "Normalt åbner det kl. 7.00, men »om søndagen åbner det dog først kl. 10.00«.",
    evidence: ["aaben"],
    hints: {
      strategy: "Der er en almindelig regel og en undtagelse. Led efter ordet »dog«.",
      location: "Se under »Mens vaskeriet er lukket«.",
    },
  },

  // Forstå regler og undtagelser: øv selv
  {
    id: "regel-selv-1",
    documentSlug: "jobcenter",
    subskill: "regler",
    type: "true_false",
    prompt: "Alle kan deltage gratis i »Start egen virksomhed«.",
    correctValue: false,
    explanation: "Den er gratis for borgere, der er tilmeldt jobcentret. Andre skal betale 200 kr.",
    evidence: ["intro", "virksomhed"],
  },
  {
    id: "regel-selv-2",
    documentSlug: "jobcenter",
    subskill: "regler",
    type: "multiple_choice",
    prompt: "Hvem kan deltage i workshoppen om LinkedIn?",
    options: [
      { id: "a", text: "Kun akademikere" },
      { id: "b", text: "Alle, der er tilmeldt jobcentret" },
      { id: "c", text: "Kun borgere i fleksjob" },
      { id: "d", text: "Alle med dansk på B1-niveau" },
    ],
    correctOptionId: "a",
    explanation: "I rækken »LinkedIn for jobsøgere« står der »Kun for akademikere«.",
    evidence: ["linkedin"],
  },
  {
    id: "regel-selv-3",
    documentSlug: "jobcenter",
    subskill: "regler",
    type: "multiple_choice",
    prompt: "Hvor holdes workshoppen »Start egen virksomhed«?",
    options: [
      { id: "a", text: "I kantinen" },
      { id: "b", text: "I mødelokale 2.14" },
      { id: "c", text: "På 2. sal" },
      { id: "d", text: "Online" },
    ],
    correctOptionId: "a",
    explanation: "Alle workshops er i mødelokale 2.14, »undtagen Start egen virksomhed, som holdes i kantinen«.",
    evidence: ["lokale"],
  },
  {
    id: "regel-selv-4",
    documentSlug: "jobcenter",
    subskill: "regler",
    type: "short_answer",
    prompt: "Hvilket danskniveau skal man mindst have til »Forbered dig til jobsamtalen«?",
    acceptedAnswers: ["b1", "b1-niveau", "b1 niveau", "niveau b1"],
    explanation: "»Kræver dansk på mindst B1-niveau.«",
    evidence: ["samtale"],
  },

  // Forstå regler og undtagelser: test dig selv
  {
    id: "regel-test-1",
    documentSlug: "aftenskole",
    subskill: "regler",
    type: "true_false",
    prompt: "En studerende får rabat på madlavningskurset.",
    correctValue: false,
    explanation: "Der er 20 % rabat på alle kurser »undtagen madlavning«.",
    evidence: ["rabat"],
  },
  {
    id: "regel-test-2",
    documentSlug: "aftenskole",
    subskill: "regler",
    type: "multiple_choice",
    prompt: "Hvad skal du selv have med til Excel-kurset?",
    options: [
      { id: "a", text: "En bærbar computer" },
      { id: "b", text: "Råvarer" },
      { id: "c", text: "En yogamåtte" },
      { id: "d", text: "Et cv" },
    ],
    correctOptionId: "a",
    explanation: "»Til Excel for begyndere skal du selv medbringe en bærbar computer.«",
    evidence: ["computer"],
  },
  {
    id: "regel-test-3",
    documentSlug: "aftenskole",
    subskill: "regler",
    type: "multiple_choice",
    prompt: "Hvor mange deltagere kan der højst være på yogaholdet?",
    options: [
      { id: "a", text: "10" },
      { id: "b", text: "12" },
      { id: "c", text: "20" },
      { id: "d", text: "25" },
    ],
    correctOptionId: "c",
    explanation: "Normalt højst 12, men »Yoga for alle har dog plads til 20«.",
    evidence: ["deltagere"],
  },
  {
    id: "regel-test-4",
    documentSlug: "aftenskole",
    subskill: "regler",
    type: "short_answer",
    prompt: "I hvilken uge er der ingen undervisning? Skriv tallet.",
    acceptedAnswers: ["42", "uge 42"],
    explanation: "»Der er ingen undervisning i uge 42 (efterårsferien).«",
    evidence: ["ferie"],
  },

  // Blandet skanningstræning
  {
    id: "blandet-1",
    documentSlug: "kulturnat",
    subskill: "regler",
    type: "true_false",
    prompt: "En pige på 11 år skal købe et armbånd for at være med.",
    correctValue: false,
    explanation: "»Børn under 12 år behøver ikke armbånd.«",
    evidence: ["intro"],
  },
  {
    id: "blandet-2",
    documentSlug: "kulturnat",
    subskill: "noegleord",
    type: "true_false",
    prompt: "Med et armbånd kan man tage bussen uden at betale ekstra.",
    correctValue: true,
    explanation: "Med armbåndet »kan [man] køre gratis med bybusserne hele aftenen«.",
    evidence: ["intro"],
  },
  {
    id: "blandet-3",
    documentSlug: "kulturnat",
    subskill: "tal-og-tid",
    type: "multiple_choice",
    prompt: "Hvor længe varer koncerten i Musikhuset?",
    options: [
      { id: "a", text: "30 minutter" },
      { id: "b", text: "1 time" },
      { id: "c", text: "1½ time" },
      { id: "d", text: "2 timer" },
    ],
    correctOptionId: "b",
    explanation: "Koncerten er kl. 20.30–21.30. Det er 1 time.",
    evidence: ["koncert"],
  },
  {
    id: "blandet-4",
    documentSlug: "kulturnat",
    subskill: "regler",
    type: "multiple_choice",
    prompt: "Hvem kan ikke komme op i Rådhustårnet?",
    options: [
      { id: "a", text: "Personer i kørestol" },
      { id: "b", text: "Børn under 12 år" },
      { id: "c", text: "Grupper på over 25 personer" },
      { id: "d", text: "Personer uden billet fra hjemmesiden" },
    ],
    correctOptionId: "a",
    explanation: "Tårnet er »ikke egnet for kørestole – der er 160 trin«.",
    evidence: ["taarn"],
  },
  {
    id: "blandet-5",
    documentSlug: "kulturnat",
    subskill: "noegleord",
    type: "multiple_choice",
    prompt: "Hvor kan man skaffe sig et armbånd?",
    options: [
      { id: "a", text: "På biblioteket" },
      { id: "b", text: "I Domkirken" },
      { id: "c", text: "Hos buschaufføren" },
      { id: "d", text: "På musikhusets hjemmeside" },
    ],
    correctOptionId: "a",
    explanation: "»Armbåndet kan købes på biblioteket og i turistinformationen.«",
    evidence: ["armbaand"],
  },
  {
    id: "blandet-6",
    documentSlug: "kulturnat",
    subskill: "tal-og-tid",
    type: "short_answer",
    prompt: "Hvad er det seneste tidspunkt, man kan komme ind i Domkirken? Skriv klokkeslættet.",
    acceptedAnswers: ["22.10"],
    explanation: "Koncerten starter kl. 22.00, men »dørene lukkes kl. 22.10«.",
    evidence: ["kirke"],
  },
];

/*
  One walkthrough per skill: an efficient reader solving one task.
  Each step highlights part of the document; everything else is dimmed.
*/
export const walkthroughs = [
  {
    subskill: "tal-og-tid",
    documentSlug: "borgerservice",
    question: "Hvornår lukker borgerservice om torsdagen?",
    answer: "Kl. 17.30",
    steps: [
      {
        text: "Læs spørgsmålet først. »Hvornår« betyder, at svaret er et klokkeslæt. »Torsdag« er dit nøgleord.",
        highlight: [],
      },
      {
        text: "Læs ikke teksten fra start. Tal og tider står tit i en tabel, så gå direkte til tabellen.",
        highlight: ["tider"],
      },
      {
        text: "Lad øjnene glide ned ad første kolonne, indtil du ser »Torsdag«.",
        highlight: ["tor"],
      },
      {
        text: "Vælg den rigtige kolonne. Spørgsmålet handler om at komme forbi, ikke om at ringe. Så det er »Med bestilt tid«.",
        highlight: ["tor"],
      },
      {
        text: "Torsdag 9.00–17.30. Borgerservice lukker kl. 17.30. Du har kun læst én række.",
        highlight: ["tor"],
      },
    ],
  },
  {
    subskill: "noegleord",
    documentSlug: "bibliotek",
    question: "Hvornår kan man ringe til biblioteket?",
    answer: "Mandag–fredag kl. 10.00–14.00",
    steps: [
      {
        text: "Find nøgleordet i spørgsmålet: »ringe«. Tænk på ord, der kan stå i stedet: telefon, kontakt, opkald.",
        highlight: [],
      },
      {
        text: "Kig hurtigt på overskrifterne. »Åbningstider« handler om at komme ind, ikke om at ringe.",
        highlight: ["tider", "saerlige-overskrift"],
      },
      {
        text: "Søg efter dine ord. Her står »Telefonen« – det er det samme emne som »ringe«.",
        highlight: ["telefon"],
      },
      {
        text: "Læs kun den sætning grundigt: »Telefonen er åben mandag–fredag kl. 10.00–14.00«.",
        highlight: ["telefon"],
      },
      {
        text: "Svar: mandag–fredag kl. 10.00–14.00. Teksten brugte et andet ord end spørgsmålet.",
        highlight: ["telefon"],
      },
    ],
  },
  {
    subskill: "regler",
    documentSlug: "svoemmehal",
    question: "Må en pige på 8 år svømme alene om lørdagen?",
    answer: "Nej. Børn under 10 år skal have en voksen med i vandet.",
    steps: [
      {
        text: "Læs spørgsmålet. »Må« og »alene« viser, at svaret er en regel. »8 år« er en vigtig detalje.",
        highlight: [],
      },
      {
        text: "Regler står tit under overskrifter som »Regler«, »Bemærk« eller »Undtagelser«. Gå direkte dertil.",
        highlight: ["regler-overskrift", "regler"],
      },
      {
        text: "Søg efter »børn« eller »år«. Første punkt handler om børn under 10 år.",
        highlight: ["ledsager"],
      },
      {
        text: "Læs de små ord præcist: »under 10 år« og »skal være ledsaget«. 8 år er under 10 år.",
        highlight: ["ledsager"],
      },
      {
        text: "Svar: Nej. Hun skal have en voksen over 18 år med i vandet.",
        highlight: ["ledsager"],
      },
    ],
  },
];

/*
  Lessons: which document and questions each stage uses.
  Stage kinds follow test-teach-test:
  try → walkthrough → guided → independent → check → review
*/
export const lessons = [
  {
    slug: "tal-og-tid",
    subskill: "tal-og-tid",
    stages: [
      { kind: "try", documentSlug: "bibliotek", questionIds: ["tal-proev-1", "tal-proev-2"] },
      { kind: "walkthrough" },
      { kind: "guided", documentSlug: "svoemmehal", questionIds: ["tal-guide-1", "tal-guide-2", "tal-guide-3"] },
      { kind: "independent", documentSlug: "aftenskole", questionIds: ["tal-selv-1", "tal-selv-2", "tal-selv-3", "tal-selv-4"], timeLimitSeconds: 240 },
      { kind: "check", documentSlug: "bus", questionIds: ["tal-test-1", "tal-test-2", "tal-test-3", "tal-test-4"], timeLimitSeconds: 240 },
      { kind: "review" },
    ],
  },
  {
    slug: "noegleord",
    subskill: "noegleord",
    stages: [
      { kind: "try", documentSlug: "vaskeri", questionIds: ["ord-proev-1", "ord-proev-2"] },
      { kind: "walkthrough" },
      { kind: "guided", documentSlug: "borgerservice", questionIds: ["ord-guide-1", "ord-guide-2", "ord-guide-3"] },
      { kind: "independent", documentSlug: "bus", questionIds: ["ord-selv-1", "ord-selv-2", "ord-selv-3", "ord-selv-4"], timeLimitSeconds: 240 },
      { kind: "check", documentSlug: "jobcenter", questionIds: ["ord-test-1", "ord-test-2", "ord-test-3", "ord-test-4"], timeLimitSeconds: 240 },
      { kind: "review" },
    ],
  },
  {
    slug: "regler",
    subskill: "regler",
    stages: [
      { kind: "try", documentSlug: "borgerservice", questionIds: ["regel-proev-1", "regel-proev-2"] },
      { kind: "walkthrough" },
      { kind: "guided", documentSlug: "vaskeri", questionIds: ["regel-guide-1", "regel-guide-2", "regel-guide-3"] },
      { kind: "independent", documentSlug: "jobcenter", questionIds: ["regel-selv-1", "regel-selv-2", "regel-selv-3", "regel-selv-4"], timeLimitSeconds: 240 },
      { kind: "check", documentSlug: "aftenskole", questionIds: ["regel-test-1", "regel-test-2", "regel-test-3", "regel-test-4"], timeLimitSeconds: 240 },
      { kind: "review" },
    ],
  },
  {
    slug: "blandet",
    title: "Blandet skanningstræning",
    description: "Alle teknikker i ét dokument.",
    stages: [
      { kind: "check", documentSlug: "kulturnat", questionIds: ["blandet-1", "blandet-2", "blandet-3", "blandet-4", "blandet-5", "blandet-6"], timeLimitSeconds: 360 },
      { kind: "review" },
    ],
  },
];
