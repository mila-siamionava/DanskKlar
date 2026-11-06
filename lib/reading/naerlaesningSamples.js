/*
  Sample nærlæsning (close reading) content, in the same shape as
  skimmingSamples.js, so the shared lesson components can show it.
  getNaerlaesning.js is the only file that reads this.

  Texts are short PD3 / FVU 3–4 style articles at B1–B2 about
  ecology, education, work and culture.

  Marks (see skimmingSamples.js):
  kind "clue": the place in the text that holds the answer
  kind "detail": something that looks relevant but can trick you

  statements: each item is judged rigtigt / forkert / står ikke i teksten
  and has its own explanation, shown after the answer is checked.
*/

export const subskills = [
  {
    slug: "rigtigt-forkert",
    title: "Rigtigt, forkert eller står ikke i teksten",
    description:
      "Find stedet i teksten, og sammenlign ord for ord med udsagnet.",
    level: "B1–B2",
    order: 1,
  },
  {
    slug: "ord-i-sammenhaeng",
    title: "Forstå ord ud fra sammenhængen",
    description:
      "Gæt betydningen af et svært ord ud fra sætningerne omkring det.",
    level: "B1–B2",
    order: 2,
  },
  {
    slug: "henvisninger",
    title: "Hvad peger ordet tilbage på?",
    description:
      "Find ud af, hvad små ord som »det«, »de« og »denne« henviser til.",
    level: "B1–B2",
    order: 3,
  },
];

export const upcomingSubskills = [];

export const choiceLabels = {
  rigtigt: "Rigtigt",
  forkert: "Forkert",
  ikke: "Står ikke i teksten",
};

const STATEMENT_CHOICES = ["rigtigt", "forkert", "ikke"];

const STATEMENT_PROMPT =
  "Er udsagnene rigtige, forkerte, eller står det ikke i teksten?";

export const texts = [
  // Rigtigt, forkert eller står ikke i teksten
  {
    slug: "skolehave",
    title: "Skolehaven giver jord under neglene",
    level: "B1",
    blocks: [
      {
        id: "p1",
        type: "paragraph",
        text: "På Lindeskolen i Odense har eleverne i 4. klasse fået deres egen skolehave. Hver tirsdag fra april til oktober går klassen ned i haven, hvor de sår, luger og høster grøntsager.",
      },
      {
        id: "p2",
        type: "paragraph",
        text: "Ifølge lærer Maja Holm lærer børnene meget mere end at dyrke gulerødder. »De lærer om natur, vejr og samarbejde. Og så smager en gulerod bare bedre, når man selv har sået den,« siger hun.",
      },
      {
        id: "p3",
        type: "paragraph",
        text: "Skolen betaler ikke selv for haven. Den er en del af et projekt, som kommunen har startet, og som indtil videre omfatter otte skoler. Planen er, at flere skoler skal være med fra næste år.",
      },
    ],
  },
  {
    slug: "mentor",
    title: "En kollega at spørge",
    level: "B1",
    blocks: [
      {
        id: "p1",
        type: "paragraph",
        text: "Når man starter på en ny arbejdsplads, kan de første uger være hårde. Derfor har virksomheden Nordfrost i Esbjerg indført en mentorordning. Alle nye medarbejdere får en erfaren kollega, som de kan gå til med spørgsmål.",
      },
      {
        id: "p2",
        type: "paragraph",
        text: "Mentoren hjælper i de første tre måneder. I den periode mødes de to mindst én gang om ugen. Mentorerne får ikke ekstra løn, men de får en dags kursus, før de begynder.",
      },
      {
        id: "p3",
        type: "paragraph",
        text: "Ifølge HR-chef Lone Bak er det blevet lettere at fastholde nye medarbejdere. »Før stoppede hver fjerde nye medarbejder inden for det første år. Nu er det under hver tiende,« fortæller hun.",
      },
    ],
  },
  {
    slug: "museer",
    title: "Museerne åbner dørene for unge",
    level: "B1–B2",
    blocks: [
      {
        id: "p1",
        type: "paragraph",
        text: "Siden januar har unge under 27 år kunnet komme gratis ind på 40 museer i Region Midtjylland. Ordningen er et forsøg, der løber i to år.",
      },
      {
        id: "p2",
        type: "paragraph",
        text: "Formålet er at få flere unge til at bruge kulturtilbuddene. Undersøgelser viser nemlig, at unge mellem 18 og 26 år er den aldersgruppe, der sjældnest går på museum.",
      },
      {
        id: "p3",
        type: "paragraph",
        text: "Det første halve år har der været 30 procent flere unge gæster end året før. Museumsdirektør Peter Lund er dog forsigtig: »Det er for tidligt at sige, om de unge kommer igen, når de skal betale,« siger han.",
      },
    ],
  },
  {
    slug: "vildt-graes",
    title: "Kommunen lader græsset gro",
    level: "B1–B2",
    blocks: [
      {
        id: "p1",
        type: "paragraph",
        text: "I sommer er Aarhus Kommune holdt op med at slå græsset langs en række veje og i flere parker. I stedet får blomster og højt græs lov til at vokse vildt. Målet er at skabe bedre levesteder for bier, sommerfugle og andre insekter.",
      },
      {
        id: "p2",
        type: "paragraph",
        text: "Ikke alle borgere er begejstrede. Kommunen har modtaget over 200 klager, især fra folk, der synes, at områderne ser rodede ud. Nogle bilister mener også, at det høje græs gør det svært at se cyklister ved vejkanten.",
      },
      {
        id: "p3",
        type: "paragraph",
        text: "Kommunen har derfor valgt at slå en bred stribe ved alle kryds. Resten af arealerne bliver kun slået én gang om året, sidst i september.",
      },
    ],
  },
  {
    slug: "fvu",
    title: "Tilbage på skolebænken som 45-årig",
    level: "B1–B2",
    blocks: [
      {
        id: "p1",
        type: "paragraph",
        text: "Hvert år tager tusindvis af voksne danskere FVU – forberedende voksenundervisning – for at blive bedre til at læse, skrive eller regne. Undervisningen er gratis, og mange følger den ved siden af deres arbejde.",
      },
      {
        id: "p2",
        type: "paragraph",
        text: "En af dem er Kim Sørensen på 45 år, der arbejder på et lager. »Jeg har altid klaret mig uden at læse ret meget. Men da vi fik et nyt computersystem på lageret, gik det op for mig, at jeg var nødt til at lære det,« fortæller han.",
      },
      {
        id: "p3",
        type: "paragraph",
        text: "Kim går til undervisning to aftener om ugen. Efter et halvt år kan han nu læse arbejdssedlerne uden at spørge sine kolleger. Hans næste mål er et truckcertifikat, som kræver en skriftlig prøve.",
      },
    ],
  },

  // Forstå ord ud fra sammenhængen
  {
    slug: "hoteller",
    title: "Hotellerne mangler hænder",
    level: "B1",
    blocks: [
      {
        id: "p1",
        type: "paragraph",
        text: "Efter flere stille år er turisterne vendt tilbage til Danmark. Det er godt nyt for hotellerne, men mange af dem har svært ved at finde personale nok. Især kokke og rengøringsassistenter er en mangelvare.",
      },
      {
        id: "p2",
        type: "paragraph",
        text: "Nogle hoteller forsøger at tiltrække medarbejdere med højere løn og faste arbejdstider. Andre uddanner selv deres folk, så de ikke er afhængige af, at der findes færdiguddannede på markedet.",
      },
    ],
  },
  {
    slug: "regnvand",
    title: "Når regnen skal have et sted at gå hen",
    level: "B1–B2",
    blocks: [
      {
        id: "p1",
        type: "paragraph",
        text: "De seneste år er der faldet mere regn i Danmark, og kraftige skybrud er blevet hyppigere. Før kom de måske hvert tiende år – nu sker det flere gange om året. Når store mængder vand falder på kort tid, kan kloakkerne ikke følge med, og kældre og veje bliver oversvømmet.",
      },
      {
        id: "p2",
        type: "paragraph",
        text: "Flere kommuner prøver derfor at bruge regnvandet i stedet for at lede det væk. I København er nogle parker bygget, så de kan fungere som midlertidige søer. Når det regner kraftigt, samles vandet i parken, og bagefter siver det langsomt ned i jorden.",
      },
    ],
  },
  {
    slug: "faellessang",
    title: "Fællessang samler danskerne",
    level: "B1–B2",
    blocks: [
      {
        id: "p1",
        type: "paragraph",
        text: "Under coronakrisen begyndte mange danskere at synge sammen foran fjernsynet, og interessen for fællessang er ikke dalet siden. Tværtimod melder kor over hele landet om flere nye medlemmer end nogensinde.",
      },
      {
        id: "p2",
        type: "paragraph",
        text: "Ifølge sangforsker Ida Krogh er forklaringen enkel: »Når vi synger sammen, føler vi os forbundet med andre. Det er en modvægt til en hverdag, hvor mange sidder alene foran en skærm.«",
      },
    ],
  },
  {
    slug: "erhvervsskoler",
    title: "Flere unge vælger en håndværkeruddannelse",
    level: "B2",
    blocks: [
      {
        id: "p1",
        type: "paragraph",
        text: "I mange år har politikerne forsøgt at få flere unge til at vælge en erhvervsuddannelse. Nu ser det ud til, at indsatsen bærer frugt: Antallet af ansøgere til uddannelser som tømrer, elektriker og smed er steget for tredje år i træk.",
      },
      {
        id: "p2",
        type: "paragraph",
        text: "En af årsagerne er, at erhvervsskolerne har fået et bedre ry. »Før blev det set som et nederlag ikke at tage en gymnasial uddannelse. Det synspunkt er ved at forsvinde,« siger studievejleder Mette Dal.",
      },
    ],
  },
  {
    slug: "seniorer",
    title: "Seniorer bliver længere på arbejdsmarkedet",
    level: "B2",
    blocks: [
      {
        id: "p1",
        type: "paragraph",
        text: "Flere danskere over 65 år vælger at fortsætte med at arbejde. Nogle gør det af økonomiske grunde, men for mange handler det om at have noget meningsfuldt at stå op til om morgenen.",
      },
      {
        id: "p2",
        type: "paragraph",
        text: "Virksomhederne har god grund til at byde de ældre medarbejdere velkommen. De besidder ofte en stor viden, som er svær at erstatte, når de går på pension. Derfor tilbyder flere arbejdspladser nu nedsat tid til de ældste medarbejdere, så de kan trappe gradvist ned.",
      },
    ],
  },

  // Hvad peger ordet tilbage på?
  {
    slug: "aabent-bibliotek",
    title: "Biblioteket er åbent – også når personalet er gået hjem",
    level: "B1",
    blocks: [
      {
        id: "p1",
        type: "paragraph",
        text: "På mange danske biblioteker kan man i dag låne bøger sent om aftenen, selvom der ikke er nogen ansatte. Det kaldes et åbent bibliotek. Man låser sig ind med sit sundhedskort og låner bøgerne ved en maskine.",
      },
      {
        id: "p2",
        type: "paragraph",
        text: "Ordningen er populær blandt børnefamilier og folk med lange arbejdsdage. Den har dog også en bagside: Nogle steder har der været hærværk, og det har fået flere kommuner til at sætte kameraer op.",
      },
    ],
  },
  {
    slug: "brugt-toej",
    title: "Tøj, der får et nyt liv",
    level: "B1–B2",
    blocks: [
      {
        id: "p1",
        type: "paragraph",
        text: "Hver dansker køber i gennemsnit omkring 15 kilo nyt tøj om året. Meget af det bliver kun brugt få gange, før det havner i skraldespanden. Det er et problem for miljøet, fordi produktionen af tøj kræver store mængder vand og energi.",
      },
      {
        id: "p2",
        type: "paragraph",
        text: "Flere butikskæder er derfor begyndt at tage imod brugt tøj. Kunderne får en rabatkupon, når de afleverer en pose. Kritikere peger dog på, at denne løsning kan få folk til at købe endnu mere, fordi de får rabat på nyt tøj.",
      },
    ],
  },
  {
    slug: "firmacykel",
    title: "Cyklen som firmabil",
    level: "B1–B2",
    blocks: [
      {
        id: "p1",
        type: "paragraph",
        text: "Flere virksomheder tilbyder nu deres ansatte en firmacykel. Medarbejderen betaler et fast beløb af sin løn hver måned, og til gengæld får han eller hun en ny cykel, som arbejdsgiveren sørger for at vedligeholde.",
      },
      {
        id: "p2",
        type: "paragraph",
        text: "Ordningen har flere fordele. Medarbejderne får motion på vej til arbejde, og virksomhederne kan se, at sygemeldinger på grund af stress og dårlig ryg falder. Desuden er det billigere for virksomheden end at stille en bil til rådighed. Det sidste er ifølge flere eksperter en vigtig grund til, at ordningen breder sig.",
      },
    ],
  },
  {
    slug: "lektiecafe",
    title: "Lektiecaféen, der blev for lille",
    level: "B1–B2",
    blocks: [
      {
        id: "p1",
        type: "paragraph",
        text: "I et boligområde i Aalborg mødes en gruppe frivillige hver onsdag med skoleelever fra 6. til 9. klasse. De hjælper med alt fra matematik til danske stile. Mange af eleverne har forældre, som ikke selv har gået i skole i Danmark, og som derfor kan have svært ved at hjælpe med lektierne.",
      },
      {
        id: "p2",
        type: "paragraph",
        text: "Lektiecaféen blev startet af en pensioneret lærer for fem år siden. Dengang kom der fire elever. I dag er der over tredive, og der er venteliste. Det glæder de frivillige, men det viser også, at behovet er større, end de kan dække.",
      },
    ],
  },
  {
    slug: "biograf",
    title: "Biograferne i konkurrence med streaming",
    level: "B2",
    blocks: [
      {
        id: "p1",
        type: "paragraph",
        text: "Danskerne ser flere film end nogensinde, men de gør det i stigende grad derhjemme. Streamingtjenesterne tilbyder tusindvis af titler for en fast pris om måneden, og det kan biograferne have svært ved at konkurrere med.",
      },
      {
        id: "p2",
        type: "paragraph",
        text: "Den danske filmbranche er bekymret, for en stor del af indtægterne kommer fra billetsalget. Samtidig viser tal fra Det Danske Filminstitut, at de danske film, der klarer sig bedst, er dem, der bliver vist i biografen først og på streaming bagefter.",
      },
    ],
  },
];

export const questions = [
  // Rigtigt, forkert eller står ikke i teksten: øv
  {
    id: "rf-oev-1",
    textSlug: "mentor",
    subskill: "rigtigt-forkert",
    type: "statements",
    prompt: STATEMENT_PROMPT,
    choices: STATEMENT_CHOICES,
    items: [
      {
        id: "s1",
        text: "Nye medarbejdere har en mentor i det første halve år.",
        correct: "forkert",
        explanation: "Teksten siger »de første tre måneder« – ikke et halvt år.",
      },
      {
        id: "s2",
        text: "Mentorerne bliver forberedt, før de begynder.",
        correct: "rigtigt",
        explanation:
          "»De får en dags kursus, før de begynder« – det er en forberedelse, selvom ordet er et andet.",
      },
      {
        id: "s3",
        text: "Alle virksomheder i Esbjerg har en mentorordning.",
        correct: "ikke",
        explanation:
          "Teksten handler kun om Nordfrost. Om andre virksomheder står der intet.",
      },
      {
        id: "s4",
        text: "Færre nye medarbejdere stopper i dag end før.",
        correct: "rigtigt",
        explanation: "Fra hver fjerde til under hver tiende – det er færre.",
      },
    ],
    hint: "Find nøgleordet i hvert udsagn – fx »halve år«, »kursus« og »stopper« – og læs sætningen omkring det ord for ord.",
    explanation:
      "Udsagnene bruger ofte andre ord end teksten. Sammenlign betydningen, ikke kun ordene.",
    marks: [
      { blockId: "p2", text: "i de første tre måneder", kind: "clue" },
      { blockId: "p2", text: "de får en dags kursus, før de begynder", kind: "clue" },
      { blockId: "p1", text: "Nordfrost i Esbjerg", kind: "detail" },
      { blockId: "p3", text: "Nu er det under hver tiende", kind: "clue" },
    ],
  },
  {
    id: "rf-oev-2",
    textSlug: "museer",
    subskill: "rigtigt-forkert",
    type: "statements",
    prompt: STATEMENT_PROMPT,
    choices: STATEMENT_CHOICES,
    items: [
      {
        id: "s1",
        text: "Unge kan komme gratis ind på alle museer i Danmark.",
        correct: "forkert",
        explanation:
          "Det gælder kun 40 museer i Region Midtjylland. »Alle« gør udsagnet forkert.",
      },
      {
        id: "s2",
        text: "Unge går sjældnere på museum end andre aldersgrupper.",
        correct: "rigtigt",
        explanation:
          "De 18–26-årige er den aldersgruppe, »der sjældnest går på museum«.",
      },
      {
        id: "s3",
        text: "Ordningen bliver gjort permanent efter de to år.",
        correct: "ikke",
        explanation:
          "Teksten siger, at forsøget løber i to år – men intet om, hvad der sker bagefter.",
      },
      {
        id: "s4",
        text: "Museumsdirektøren er sikker på, at de unge bliver ved med at komme.",
        correct: "forkert",
        explanation:
          "Han er »forsigtig« og siger, at det er »for tidligt at sige«.",
      },
    ],
    hint: "Hold øje med stærke ord i udsagnene som »alle« og »sikker«. Står det lige så stærkt i teksten?",
    explanation:
      "Et udsagn er kun rigtigt, hvis hele udsagnet passer. Ét ord som »alle« kan gøre det forkert.",
    marks: [
      { blockId: "p1", text: "40 museer i Region Midtjylland", kind: "clue" },
      { blockId: "p2", text: "der sjældnest går på museum", kind: "clue" },
      { blockId: "p1", text: "et forsøg, der løber i to år", kind: "detail" },
      { blockId: "p3", text: "Det er for tidligt at sige", kind: "clue" },
    ],
  },

  // Rigtigt, forkert eller står ikke i teksten: test
  {
    id: "rf-test-1",
    textSlug: "vildt-graes",
    subskill: "rigtigt-forkert",
    type: "statements",
    prompt: STATEMENT_PROMPT,
    choices: STATEMENT_CHOICES,
    items: [
      {
        id: "s1",
        text: "Kommunen slår slet ikke græsset i de vilde områder.",
        correct: "forkert",
        explanation:
          "Græsset bliver slået én gang om året, og ved kryds slår kommunen en stribe.",
      },
      {
        id: "s2",
        text: "Et af formålene er at hjælpe insekterne.",
        correct: "rigtigt",
        explanation:
          "»Målet er at skabe bedre levesteder for bier, sommerfugle og andre insekter.«",
      },
      {
        id: "s3",
        text: "De fleste borgere i Aarhus er imod de vilde områder.",
        correct: "ikke",
        explanation:
          "Der er kommet over 200 klager, og »ikke alle« er begejstrede – men teksten siger ikke, at de fleste er imod.",
      },
      {
        id: "s4",
        text: "Ved vejkryds bliver græsset holdt kort af hensyn til trafikken.",
        correct: "rigtigt",
        explanation:
          "Bilisterne kunne ikke se cyklisterne, og kommunen har »derfor« valgt at slå en stribe ved alle kryds.",
      },
    ],
    hint: "",
    explanation:
      "Pas på, når et udsagn siger mere end teksten – som »de fleste« eller »slet ikke«.",
    marks: [
      { blockId: "p3", text: "kun slået én gang om året", kind: "clue" },
      { blockId: "p1", text: "Målet er at skabe bedre levesteder for bier, sommerfugle og andre insekter", kind: "clue" },
      { blockId: "p2", text: "over 200 klager", kind: "detail" },
      { blockId: "p3", text: "slå en bred stribe ved alle kryds", kind: "clue" },
    ],
  },
  {
    id: "rf-test-2",
    textSlug: "fvu",
    subskill: "rigtigt-forkert",
    type: "statements",
    prompt: STATEMENT_PROMPT,
    choices: STATEMENT_CHOICES,
    items: [
      {
        id: "s1",
        text: "Det koster penge at deltage i FVU.",
        correct: "forkert",
        explanation: "»Undervisningen er gratis.«",
      },
      {
        id: "s2",
        text: "Kim begyndte på FVU på grund af en forandring på arbejdet.",
        correct: "rigtigt",
        explanation:
          "Det nye computersystem på lageret fik ham til at indse, at han måtte lære at læse bedre.",
      },
      {
        id: "s3",
        text: "Kims kolleger går også til FVU.",
        correct: "ikke",
        explanation:
          "Kollegerne nævnes kun, fordi Kim før måtte spørge dem. Om de selv går til FVU, står der intet.",
      },
      {
        id: "s4",
        text: "Kim kan nu klare noget på arbejdet, som han ikke kunne før.",
        correct: "rigtigt",
        explanation:
          "Han kan læse arbejdssedlerne »uden at spørge sine kolleger«.",
      },
    ],
    hint: "",
    explanation:
      "Når et ord fra udsagnet står i teksten, er svaret ikke automatisk »rigtigt«. Læs, hvad teksten faktisk siger om det.",
    marks: [
      { blockId: "p1", text: "Undervisningen er gratis", kind: "clue" },
      { blockId: "p2", text: "da vi fik et nyt computersystem på lageret", kind: "clue" },
      { blockId: "p3", text: "uden at spørge sine kolleger", kind: "clue" },
    ],
  },

  // Forstå ord ud fra sammenhængen: øv
  {
    id: "ord-oev-1",
    textSlug: "regnvand",
    subskill: "ord-i-sammenhaeng",
    type: "multiple_choice",
    prompt: "Hvad betyder »hyppigere« i første afsnit?",
    options: [
      {
        id: "a",
        text: "Kraftigere",
        feedback: "»Kraftige« står allerede foran. »Hyppigere« fortæller noget andet.",
      },
      { id: "b", text: "Sker oftere" },
      {
        id: "c",
        text: "Farligere",
        feedback: "Skybrud kan være farlige, men det er ikke det, ordet betyder her.",
      },
    ],
    correctOptionId: "b",
    hint: "Læs sætningen lige efter ordet. Hvad var det, der ændrede sig?",
    explanation:
      "Sætningen efter forklarer ordet: »Før kom de måske hvert tiende år – nu sker det flere gange om året.« Hyppigere betyder altså oftere.",
    marks: [
      { blockId: "p1", text: "hyppigere", kind: "clue" },
      { blockId: "p1", text: "Før kom de måske hvert tiende år – nu sker det flere gange om året", kind: "clue" },
    ],
  },
  {
    id: "ord-oev-2",
    textSlug: "regnvand",
    subskill: "ord-i-sammenhaeng",
    type: "multiple_choice",
    prompt: "Hvad betyder »midlertidige« i andet afsnit?",
    options: [
      {
        id: "a",
        text: "Store og dybe",
        feedback: "Teksten siger intet om, hvor store søerne er.",
      },
      { id: "b", text: "Som kun findes i en periode" },
      {
        id: "c",
        text: "Som er lavet af mennesker",
        feedback: "Parkerne er bygget af mennesker, men det er ikke det, ordet betyder.",
      },
    ],
    correctOptionId: "b",
    hint: "Hvad sker der med vandet bagefter?",
    explanation:
      "Vandet samles i parken, »og bagefter siver det langsomt ned i jorden«. Søen er der kun et stykke tid – den er midlertidig.",
    marks: [
      { blockId: "p2", text: "midlertidige", kind: "clue" },
      { blockId: "p2", text: "bagefter siver det langsomt ned i jorden", kind: "clue" },
    ],
  },
  {
    id: "ord-oev-3",
    textSlug: "faellessang",
    subskill: "ord-i-sammenhaeng",
    type: "multiple_choice",
    prompt: "Hvad betyder »er ikke dalet« i første afsnit?",
    options: [
      { id: "a", text: "Er ikke blevet mindre" },
      {
        id: "b",
        text: "Er ikke begyndt endnu",
        feedback: "Folk begyndte at synge under coronakrisen – interessen findes altså allerede.",
      },
      {
        id: "c",
        text: "Er ikke blevet kendt",
        feedback: "Teksten handler om, hvor stor interessen er – ikke om den er kendt.",
      },
    ],
    correctOptionId: "a",
    hint: "Læg mærke til ordet lige efter: »Tværtimod«.",
    explanation:
      "»Tværtimod« betyder, at det modsatte er sket: Korene får flere medlemmer end nogensinde. Så »dalet« må betyde blevet mindre.",
    marks: [
      { blockId: "p1", text: "er ikke dalet", kind: "clue" },
      { blockId: "p1", text: "Tværtimod", kind: "clue" },
      { blockId: "p1", text: "flere nye medlemmer end nogensinde", kind: "clue" },
    ],
  },
  {
    id: "ord-oev-4",
    textSlug: "faellessang",
    subskill: "ord-i-sammenhaeng",
    type: "multiple_choice",
    prompt: "Hvad betyder »en modvægt« i andet afsnit?",
    options: [
      {
        id: "a",
        text: "Noget, der gør et problem større",
        feedback: "Sangen er noget positivt i teksten – den gør ikke problemet større.",
      },
      { id: "b", text: "Noget, der giver balance over for noget andet" },
      {
        id: "c",
        text: "En form for træning",
        feedback: "»Vægt« kan få dig til at tænke på træning, men se på sammenhængen.",
      },
    ],
    correctOptionId: "b",
    hint: "Hvad står over for hinanden i sætningerne: at synge sammen og …?",
    explanation:
      "At føle sig »forbundet med andre« står over for at sidde »alene foran en skærm«. Fællessangen giver balance – den er en modvægt.",
    marks: [
      { blockId: "p2", text: "en modvægt", kind: "clue" },
      { blockId: "p2", text: "føler vi os forbundet med andre", kind: "clue" },
      { blockId: "p2", text: "sidder alene foran en skærm", kind: "clue" },
    ],
  },

  // Forstå ord ud fra sammenhængen: test
  {
    id: "ord-test-1",
    textSlug: "erhvervsskoler",
    subskill: "ord-i-sammenhaeng",
    type: "multiple_choice",
    prompt: "Hvad betyder »bærer frugt« i første afsnit?",
    options: [
      { id: "a", text: "Giver et godt resultat" },
      { id: "b", text: "Koster mange penge" },
      { id: "c", text: "Tager lang tid" },
    ],
    correctOptionId: "a",
    explanation:
      "Efter kolonet kommer resultatet: Antallet af ansøgere er steget tre år i træk. Indsatsen virker – den bærer frugt.",
    marks: [
      { blockId: "p1", text: "bærer frugt", kind: "clue" },
      { blockId: "p1", text: "er steget for tredje år i træk", kind: "clue" },
    ],
  },
  {
    id: "ord-test-2",
    textSlug: "erhvervsskoler",
    subskill: "ord-i-sammenhaeng",
    type: "multiple_choice",
    prompt: "Hvad betyder »et nederlag« i andet afsnit?",
    options: [
      { id: "a", text: "En fordel" },
      { id: "b", text: "En særlig uddannelse" },
      { id: "c", text: "Noget, der føles som at tabe" },
    ],
    correctOptionId: "c",
    explanation:
      "Erhvervsskolerne havde før et dårligt ry. Det blev set som noget negativt ikke at gå i gymnasiet – som at tabe.",
    marks: [
      { blockId: "p2", text: "et nederlag", kind: "clue" },
      { blockId: "p2", text: "fået et bedre ry", kind: "clue" },
    ],
  },
  {
    id: "ord-test-3",
    textSlug: "seniorer",
    subskill: "ord-i-sammenhaeng",
    type: "multiple_choice",
    prompt: "Hvad betyder »besidder« i andet afsnit?",
    options: [
      { id: "a", text: "Deler" },
      { id: "b", text: "Har" },
      { id: "c", text: "Mister" },
    ],
    correctOptionId: "b",
    explanation:
      "Den viden er »svær at erstatte, når de går på pension«. Det giver kun mening, hvis de ældre har den – de besidder den.",
    marks: [
      { blockId: "p2", text: "besidder", kind: "clue" },
      { blockId: "p2", text: "som er svær at erstatte, når de går på pension", kind: "clue" },
    ],
  },
  {
    id: "ord-test-4",
    textSlug: "seniorer",
    subskill: "ord-i-sammenhaeng",
    type: "multiple_choice",
    prompt: "Hvad betyder »trappe gradvist ned« i andet afsnit?",
    options: [
      { id: "a", text: "Stoppe med at arbejde fra den ene dag til den anden" },
      { id: "b", text: "Arbejde mindre og mindre, lidt efter lidt" },
      { id: "c", text: "Skifte til et job med mindre ansvar" },
    ],
    correctOptionId: "b",
    explanation:
      "Arbejdspladserne tilbyder »nedsat tid«. De ældre arbejder altså færre timer, før de stopper helt – de trapper ned.",
    marks: [
      { blockId: "p2", text: "trappe gradvist ned", kind: "clue" },
      { blockId: "p2", text: "nedsat tid", kind: "clue" },
    ],
  },

  // Hvad peger ordet tilbage på?: øv
  {
    id: "hen-oev-1",
    textSlug: "brugt-toej",
    subskill: "henvisninger",
    type: "multiple_choice",
    prompt: "Hvad henviser »Det« til i sætningen »Det er et problem for miljøet«?",
    options: [
      { id: "a", text: "At meget tøj kun bliver brugt få gange og smidt ud" },
      {
        id: "b",
        text: "Skraldespanden",
        feedback: "Sæt det ind: »Skraldespanden er et problem for miljøet« – det er ikke pointen.",
      },
      {
        id: "c",
        text: "Vand og energi",
        feedback: "Vand og energi kommer først efter »Det« – ordet peger tilbage, ikke frem.",
      },
    ],
    correctOptionId: "a",
    hint: "Læs sætningen lige før. Hvad er det, der er et problem?",
    explanation:
      "»Det« peger tilbage på hele sætningen før: Meget tøj bliver kun brugt få gange, før det havner i skraldespanden.",
    marks: [
      { blockId: "p1", text: "Meget af det bliver kun brugt få gange, før det havner i skraldespanden", kind: "clue" },
      { blockId: "p1", text: "Det er et problem for miljøet", kind: "clue" },
    ],
  },
  {
    id: "hen-oev-2",
    textSlug: "brugt-toej",
    subskill: "henvisninger",
    type: "multiple_choice",
    prompt: "Hvad henviser »denne løsning« til?",
    options: [
      {
        id: "a",
        text: "At folk køber mere tøj",
        feedback: "Det er kritikernes bekymring – ikke selve løsningen.",
      },
      { id: "b", text: "At butikkerne tager imod brugt tøj og giver rabat" },
      {
        id: "c",
        text: "At tøj bliver smidt i skraldespanden",
        feedback: "Det er problemet, ikke løsningen.",
      },
    ],
    correctOptionId: "b",
    hint: "En løsning er noget, nogen gør. Hvad gør butikskæderne?",
    explanation:
      "»Denne løsning« peger tilbage på det, butikskæderne er begyndt at gøre: tage imod brugt tøj og give en rabatkupon.",
    marks: [
      { blockId: "p2", text: "Flere butikskæder er derfor begyndt at tage imod brugt tøj", kind: "clue" },
      { blockId: "p2", text: "denne løsning", kind: "clue" },
    ],
  },
  {
    id: "hen-oev-3",
    textSlug: "firmacykel",
    subskill: "henvisninger",
    type: "multiple_choice",
    prompt: "Hvem henviser »han eller hun« til i første afsnit?",
    options: [
      { id: "a", text: "Medarbejderen" },
      {
        id: "b",
        text: "Arbejdsgiveren",
        feedback: "Arbejdsgiveren nævnes først senere i sætningen.",
      },
      {
        id: "c",
        text: "Virksomhederne",
        feedback: "»Han eller hun« er én person – virksomhederne er flere.",
      },
    ],
    correctOptionId: "a",
    hint: "Hvem betaler og får til gengæld en cykel?",
    explanation:
      "Sætningen starter med »Medarbejderen betaler …«. Det er samme person, der »til gengæld« får cyklen.",
    marks: [
      { blockId: "p1", text: "Medarbejderen", kind: "clue" },
      { blockId: "p1", text: "han eller hun", kind: "clue" },
      { blockId: "p1", text: "arbejdsgiveren", kind: "detail" },
    ],
  },
  {
    id: "hen-oev-4",
    textSlug: "firmacykel",
    subskill: "henvisninger",
    type: "multiple_choice",
    prompt: "Hvad henviser »Det sidste« til i andet afsnit?",
    options: [
      { id: "a", text: "At medarbejderne får motion" },
      { id: "b", text: "At der er færre sygemeldinger" },
      { id: "c", text: "At en cykel er billigere end en firmabil" },
    ],
    correctOptionId: "c",
    hint: "»Det sidste« er det, der blev nævnt sidst i rækken af fordele.",
    explanation:
      "Afsnittet nævner tre fordele. »Det sidste« peger på den sidste af dem: at det er billigere end at stille en bil til rådighed.",
    marks: [
      { blockId: "p2", text: "Medarbejderne får motion", kind: "detail" },
      { blockId: "p2", text: "sygemeldinger på grund af stress og dårlig ryg falder", kind: "detail" },
      { blockId: "p2", text: "Desuden er det billigere for virksomheden end at stille en bil til rådighed", kind: "clue" },
      { blockId: "p2", text: "Det sidste", kind: "clue" },
    ],
  },

  // Hvad peger ordet tilbage på?: test
  {
    id: "hen-test-1",
    textSlug: "lektiecafe",
    subskill: "henvisninger",
    type: "multiple_choice",
    prompt: "Hvem henviser »De« til i »De hjælper med alt fra matematik til danske stile«?",
    options: [
      { id: "a", text: "Skoleeleverne" },
      { id: "b", text: "De frivillige" },
      { id: "c", text: "Forældrene" },
    ],
    correctOptionId: "b",
    explanation:
      "Sætningen før handler om »en gruppe frivillige«, der mødes med eleverne. Det er de frivillige, der hjælper.",
    marks: [
      { blockId: "p1", text: "en gruppe frivillige", kind: "clue" },
      { blockId: "p1", text: "De hjælper", kind: "clue" },
    ],
  },
  {
    id: "hen-test-2",
    textSlug: "lektiecafe",
    subskill: "henvisninger",
    type: "multiple_choice",
    prompt: "Hvad henviser »Det« til i »Det glæder de frivillige«?",
    options: [
      { id: "a", text: "At en pensioneret lærer startede caféen" },
      { id: "b", text: "At caféen nu har over tredive elever og venteliste" },
      { id: "c", text: "At forældrene ikke kan hjælpe med lektierne" },
    ],
    correctOptionId: "b",
    explanation:
      "»Det« peger tilbage på sætningen lige før: I dag er der over tredive elever og venteliste.",
    marks: [
      { blockId: "p2", text: "I dag er der over tredive, og der er venteliste", kind: "clue" },
      { blockId: "p2", text: "Det glæder de frivillige", kind: "clue" },
    ],
  },
  {
    id: "hen-test-3",
    textSlug: "biograf",
    subskill: "henvisninger",
    type: "multiple_choice",
    prompt: "Hvad henviser »det« til i »og det kan biograferne have svært ved at konkurrere med«?",
    options: [
      { id: "a", text: "At danskerne ser flere film" },
      { id: "b", text: "At streamingtjenesterne tilbyder mange film til en fast pris" },
      { id: "c", text: "Billetsalget" },
    ],
    correctOptionId: "b",
    explanation:
      "Biograferne konkurrerer med tilbuddet lige før: tusindvis af titler for en fast pris om måneden.",
    marks: [
      { blockId: "p1", text: "Streamingtjenesterne tilbyder tusindvis af titler for en fast pris om måneden", kind: "clue" },
      { blockId: "p1", text: "og det kan biograferne", kind: "clue" },
    ],
  },
  {
    id: "hen-test-4",
    textSlug: "biograf",
    subskill: "henvisninger",
    type: "multiple_choice",
    prompt: "Hvad henviser »dem« til i den sidste sætning?",
    options: [
      { id: "a", text: "Streamingtjenesterne" },
      { id: "b", text: "Tallene fra Det Danske Filminstitut" },
      { id: "c", text: "Danske film" },
    ],
    correctOptionId: "c",
    explanation:
      "»De danske film, der klarer sig bedst, er dem, der …« – »dem« er de film, der bliver vist i biografen først.",
    marks: [
      { blockId: "p2", text: "de danske film, der klarer sig bedst", kind: "clue" },
      { blockId: "p2", text: "er dem, der bliver vist i biografen først", kind: "clue" },
    ],
  },
];

export const walkthroughs = [
  {
    subskill: "rigtigt-forkert",
    textSlug: "skolehave",
    question:
      "Rigtigt, forkert eller står ikke i teksten? »Skolen betaler selv for skolehaven.«",
    answer: "Forkert – der står, at skolen ikke selv betaler for haven.",
    steps: [
      {
        text: "Læs udsagnet først, og find nøgleordet. Her er det »betaler«. Du skal ikke læse hele teksten igen – kun det sted, der handler om at betale.",
        marks: [],
      },
      {
        text: "Find stedet i teksten. Nøgleordet »betaler« står i tredje afsnit.",
        marks: [
          { blockId: "p3", text: "Skolen betaler ikke selv for haven.", kind: "clue" },
        ],
      },
      {
        text: "Læs sætningen ord for ord. Det lille ord »ikke« vender hele betydningen.",
        marks: [{ blockId: "p3", text: "ikke", kind: "clue" }],
      },
      {
        text: "Teksten siger det modsatte af udsagnet. Så er svaret »Forkert«.",
        marks: [
          { blockId: "p3", text: "Skolen betaler ikke selv for haven.", kind: "clue" },
        ],
      },
      {
        text: "Forskellen på »Forkert« og »Står ikke i teksten«: Hvis udsagnet var »Eleverne spiser selv grøntsagerne«, ville svaret være »Står ikke i teksten«. Teksten siger, at de høster – men intet om, hvem der spiser dem.",
        marks: [
          { blockId: "p1", text: "de sår, luger og høster grøntsager", kind: "detail" },
        ],
      },
      {
        text: "Udsagnet bruger tit andre ord end teksten. »Lærer om natur« og »lærer noget om naturen« betyder det samme. Sammenlign betydningen – ikke kun ordene.",
        marks: [
          { blockId: "p2", text: "De lærer om natur, vejr og samarbejde", kind: "clue" },
        ],
      },
    ],
  },
  {
    subskill: "ord-i-sammenhaeng",
    textSlug: "hoteller",
    question: "Hvad betyder »en mangelvare« i teksten?",
    answer: "Noget, der er for lidt af",
    steps: [
      {
        text: "Du kender måske ikke ordet. Stop ikke – og gæt ikke i blinde. Svaret gemmer sig ofte i ordene omkring det.",
        marks: [{ blockId: "p1", text: "en mangelvare", kind: "clue" }],
      },
      {
        text: "Kig på selve ordet. »Mangel« kender du fra »at mangle«. Mange danske ord er bygget af mindre ord, du allerede kender.",
        marks: [{ blockId: "p1", text: "en mangelvare", kind: "clue" }],
      },
      {
        text: "Læs sætningen før. Hotellerne har »svært ved at finde personale nok«. Det er problemet, ordet handler om.",
        marks: [
          { blockId: "p1", text: "har svært ved at finde personale nok", kind: "clue" },
        ],
      },
      {
        text: "Læs også videre. Hotellerne prøver at tiltrække og selv uddanne folk. Det giver kun mening, hvis der er for få.",
        marks: [
          { blockId: "p2", text: "tiltrække medarbejdere", kind: "clue" },
          { blockId: "p2", text: "uddanner selv deres folk", kind: "clue" },
        ],
      },
      {
        text: "Tjek dit gæt ved at sætte det ind i sætningen: »Især kokke og rengøringsassistenter er noget, der er for lidt af.« Det giver mening.",
        marks: [
          { blockId: "p1", text: "Især kokke og rengøringsassistenter er en mangelvare.", kind: "clue" },
        ],
      },
    ],
  },
  {
    subskill: "henvisninger",
    textSlug: "aabent-bibliotek",
    question:
      "Hvad henviser »det« til i »og det har fået flere kommuner til at sætte kameraer op«?",
    answer: "At der har været hærværk nogle steder",
    steps: [
      {
        text: "Små ord som »det«, »den«, »de« og »denne« peger tilbage på noget, der allerede er nævnt. Din opgave er at finde det, de peger på.",
        marks: [
          { blockId: "p2", text: "og det har fået flere kommuner til at sætte kameraer op", kind: "clue" },
        ],
      },
      {
        text: "Kig lige før ordet. Svaret står næsten altid tæt på – i samme sætning eller sætningen før.",
        marks: [
          { blockId: "p2", text: "Nogle steder har der været hærværk", kind: "clue" },
        ],
      },
      {
        text: "Sæt dit svar ind i stedet for »det«: »Hærværket har fået flere kommuner til at sætte kameraer op.« Det giver mening.",
        marks: [
          { blockId: "p2", text: "Nogle steder har der været hærværk", kind: "clue" },
        ],
      },
      {
        text: "Tjek de andre muligheder. At ordningen er populær, er ikke en grund til kameraer. Sundhedskortet står i et andet afsnit.",
        marks: [
          { blockId: "p2", text: "Ordningen er populær", kind: "detail" },
          { blockId: "p1", text: "sundhedskort", kind: "detail" },
        ],
      },
      {
        text: "Samme teknik virker overalt. »Den« i »Den har dog også en bagside« peger tilbage på »Ordningen«.",
        marks: [
          { blockId: "p2", text: "Ordningen", kind: "clue" },
          { blockId: "p2", text: "Den har dog også en bagside", kind: "clue" },
        ],
      },
    ],
  },
];

/*
  Each lesson: see how → practise with feedback → test → review.
*/
export const lessons = [
  {
    slug: "rigtigt-forkert",
    subskill: "rigtigt-forkert",
    stages: [
      { kind: "walkthrough" },
      {
        kind: "practice",
        items: [
          { textSlug: "mentor", questionIds: ["rf-oev-1"] },
          { textSlug: "museer", questionIds: ["rf-oev-2"] },
        ],
      },
      {
        kind: "check",
        items: [
          { textSlug: "vildt-graes", questionIds: ["rf-test-1"] },
          { textSlug: "fvu", questionIds: ["rf-test-2"] },
        ],
      },
      { kind: "review" },
    ],
  },
  {
    slug: "ord-i-sammenhaeng",
    subskill: "ord-i-sammenhaeng",
    stages: [
      { kind: "walkthrough" },
      {
        kind: "practice",
        items: [
          { textSlug: "regnvand", questionIds: ["ord-oev-1", "ord-oev-2"] },
          { textSlug: "faellessang", questionIds: ["ord-oev-3", "ord-oev-4"] },
        ],
      },
      {
        kind: "check",
        items: [
          { textSlug: "erhvervsskoler", questionIds: ["ord-test-1", "ord-test-2"] },
          { textSlug: "seniorer", questionIds: ["ord-test-3", "ord-test-4"] },
        ],
      },
      { kind: "review" },
    ],
  },
  {
    slug: "henvisninger",
    subskill: "henvisninger",
    stages: [
      { kind: "walkthrough" },
      {
        kind: "practice",
        items: [
          { textSlug: "brugt-toej", questionIds: ["hen-oev-1", "hen-oev-2"] },
          { textSlug: "firmacykel", questionIds: ["hen-oev-3", "hen-oev-4"] },
        ],
      },
      {
        kind: "check",
        items: [
          { textSlug: "lektiecafe", questionIds: ["hen-test-1", "hen-test-2"] },
          { textSlug: "biograf", questionIds: ["hen-test-3", "hen-test-4"] },
        ],
      },
      { kind: "review" },
    ],
  },
];
