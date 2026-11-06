/*
  Sample inferens ("læs mellem linjerne") content, in the same shape as
  skimmingSamples.js, so the shared lesson components can show it.
  getInferens.js is the only file that reads this.

  Texts are short PD3 / FVU 3–4 style articles, opinion pieces and
  portraits at B1–B2 about ecology, education, work and culture.

  Marks (see skimmingSamples.js):
  kind "clue": a trace in the text that supports the answer
  kind "detail": something that can lead to a wrong conclusion
*/

export const subskills = [
  {
    slug: "udled",
    title: "Hvad kan man udlede?",
    description:
      "Saml sporene i teksten, og forstå det, der ikke står direkte.",
    level: "B1–B2",
    order: 1,
  },
  {
    slug: "personer",
    title: "Hvad mener personen?",
    description:
      "Forstå citater, følelser og det, folk mener uden at sige det direkte.",
    level: "B1–B2",
    order: 2,
  },
  {
    slug: "holdning",
    title: "Skribentens holdning og tone",
    description:
      "Find holdningen i ordvalget i læserbreve og klummer – også når den er ironisk.",
    level: "B2",
    order: 3,
  },
];

export const upcomingSubskills = [];

export const texts = [
  // Hvad kan man udlede?
  {
    slug: "kantine",
    title: "Ny kantine – nye vaner",
    level: "B1",
    blocks: [
      {
        id: "p1",
        type: "paragraph",
        text: "Da Brandt Logistik åbnede en ny kantine sidste år, fjernede de samtidig sodavandsautomaten fra frokoststuen. I stedet blev der sat en vandautomat op ved siden af salatbaren.",
      },
      {
        id: "p2",
        type: "paragraph",
        text: "Et halvt år senere var køen ved salatbaren blevet længere, og kantinens kok måtte bestille dobbelt så mange grøntsager som i starten. »Der er nogle, der stadig savner automaten,« siger tillidsrepræsentant Jens Ravn med et smil, »men de fleste har vænnet sig til det.«",
      },
    ],
  },
  {
    slug: "jordbaer",
    title: "Jordbær fra Spanien – i marts",
    level: "B1",
    blocks: [
      {
        id: "p1",
        type: "paragraph",
        text: "Det er tidligt forår, og i supermarkedet ligger der allerede bakker med røde jordbær. De er dyrket i Spanien og har kørt over 2.500 kilometer i lastbil for at nå frem til de danske butikker.",
      },
      {
        id: "p2",
        type: "paragraph",
        text: "Ane Mikkelsen fra en frugtplantage på Fyn ryster på hovedet. »Vores bær er først klar i juni. Til den tid har mange kunder allerede fået nok af jordbær,« siger hun. »Og så smager de spanske altså ikke af ret meget.«",
      },
    ],
  },
  {
    slug: "sprogskole",
    title: "Første dag på sprogskolen",
    level: "B1",
    blocks: [
      {
        id: "p1",
        type: "paragraph",
        text: "Amira står i døren til klasselokalet med tasken tæt ind til kroppen. Hun har øvet sig på at sige »Hej, jeg hedder Amira« hele morgenen. Da læreren spørger, hvad hun hedder, siger hun det alligevel så lavt, at læreren må bede hende om at gentage det.",
      },
      {
        id: "p2",
        type: "paragraph",
        text: "Tre måneder senere er det Amira, der byder de nye kursister velkommen. Hun viser dem, hvor kaffen står, og forklarer, hvordan man logger på skolens hjemmeside.",
      },
    ],
  },
  {
    slug: "festival",
    title: "Festivalen, der flyttede",
    level: "B1–B2",
    blocks: [
      {
        id: "p1",
        type: "paragraph",
        text: "I 20 år lå musikfestivalen i den lille by Tranum. Men sidste år flyttede arrangørerne den til en mark uden for Aalborg. Begrundelsen var, at der ikke længere var plads til de mange gæster, og at det var svært at skaffe nok frivillige i lokalområdet.",
      },
      {
        id: "p2",
        type: "paragraph",
        text: "I Tranum er stemningen blandet. »Det er dejligt med ro om sommeren,« siger en beboer. Ejeren af byens eneste købmand har en anden oplevelse: »Festivalugen var årets bedste uge. I år kunne jeg mærke det på regnskabet.«",
      },
    ],
  },
  {
    slug: "firedagesuge-rengoering",
    title: "Fire dage om ugen – men ikke for alle",
    level: "B1–B2",
    blocks: [
      {
        id: "p1",
        type: "paragraph",
        text: "I et rengøringsfirma i Herning har kontorpersonalet i et år arbejdet fire dage om ugen. De arbejder lidt længere hver dag, men har fri om fredagen. Ifølge direktøren er sygefraværet blandt kontorfolkene faldet markant.",
      },
      {
        id: "p2",
        type: "paragraph",
        text: "Ude hos kunderne er hverdagen uændret. Rengøringsassistenterne arbejder stadig fem dage om ugen, fordi kunderne forventer, at der bliver gjort rent hver dag. »Selvfølgelig ville vi også gerne have en ekstra fridag,« siger en af dem. »Men nogen skal jo tømme skraldespandene.«",
      },
    ],
  },

  // Hvad mener personen?
  {
    slug: "ladcykel",
    title: "Ladcykel i stedet for bil nummer to",
    level: "B1",
    blocks: [
      {
        id: "p1",
        type: "paragraph",
        text: "Sidste forår solgte familien Nygaard fra Silkeborg deres andenbil og købte en elektrisk ladcykel. Nu cykler Line Nygaard børnene i børnehave hver morgen – også når det regner.",
      },
      {
        id: "p2",
        type: "paragraph",
        text: "»Den første uge var jeg ved at fortryde,« siger hun og griner. »Men nu kan jeg ikke forestille mig at sidde i kø på ringvejen igen. Og børnene? De kalder det morgenens bedste tur.«",
      },
    ],
  },
  {
    slug: "kokkeskole",
    title: "Fra kontor til køkken",
    level: "B1–B2",
    blocks: [
      {
        id: "p1",
        type: "paragraph",
        text: "Efter 15 år som bogholder sagde Mads Holt op og begyndte på kokkeskolen som 42-årig. Lønnen er lavere, og arbejdstiderne er sværere at få til at passe med familielivet.",
      },
      {
        id: "p2",
        type: "paragraph",
        text: "»Min kone spurgte, om jeg var gået fra forstanden,« fortæller han. »Men jeg havde siddet med tal i så mange år, at jeg ikke kunne huske, hvornår jeg sidst havde glædet mig til en mandag.«",
      },
    ],
  },
  {
    slug: "forsamlingshus",
    title: "Nyt liv i det gamle forsamlingshus",
    level: "B1–B2",
    blocks: [
      {
        id: "p1",
        type: "paragraph",
        text: "Forsamlingshuset i landsbyen Vester Hjermitslev stod tomt i næsten ti år. Taget var utæt, og ingen havde lyst til at holde fest der. Så gik en gruppe borgere sammen og samlede penge ind til en renovering.",
      },
      {
        id: "p2",
        type: "paragraph",
        text: "I dag er der fællesspisning hver anden torsdag og koncerter om lørdagen. »Folk siger, at det er huset, der er blevet renoveret,« siger formand Grethe Lund. »Men jeg synes egentlig, at det er byen, der har fået nyt liv.«",
      },
    ],
  },
  {
    slug: "studiejob",
    title: "Studerende med job ved siden af",
    level: "B1–B2",
    blocks: [
      {
        id: "p1",
        type: "paragraph",
        text: "Næsten tre ud af fire danske studerende har et job ved siden af studiet. For mange er det nødvendigt for at få økonomien til at hænge sammen.",
      },
      {
        id: "p2",
        type: "paragraph",
        text: "Emil, der læser medicin, arbejder 15 timer om ugen på et plejehjem. »Jeg kunne godt klare mig for SU'en alene, hvis jeg boede hjemme hos mine forældre,« siger han. »Men så lærer man jo heller ikke at stå på egne ben. Og på plejehjemmet får jeg erfaringer, som ingen lærebog kan give mig.«",
      },
    ],
  },
  {
    slug: "fiskeren",
    title: "Fiskeren og havet",
    level: "B2",
    blocks: [
      {
        id: "p1",
        type: "paragraph",
        text: "Jens Kragh har fisket fra Thorsminde i over 40 år. Han husker en tid, hvor båden kom hjem fuld af torsk. I dag er der kvoter på næsten alle arter, og flere af hans gamle kolleger har solgt deres både.",
      },
      {
        id: "p2",
        type: "paragraph",
        text: "»Folk inde fra byerne siger, at vi har fisket havet tomt,« siger Jens. »Det er nok ikke helt forkert. Men det er også os, der har betalt prisen.« Han kigger ud over havnen. »Mit barnebarn vil gerne være fisker. Jeg ved ikke rigtig, hvad jeg skal sige til ham.«",
      },
    ],
  },

  // Skribentens holdning og tone
  {
    slug: "kede-sig",
    title: "Læserbrev: Lad børnene kede sig",
    level: "B1–B2",
    blocks: [
      {
        id: "p1",
        type: "paragraph",
        text: "Mine børn har fritidsaktiviteter fire dage om ugen: fodbold, svømning, spejder og musikskole. Det har deres venner også. Vi forældre kører rundt i byen som taxachauffører, og ingen af os har tid til at trække vejret.",
      },
      {
        id: "p2",
        type: "paragraph",
        text: "Engang var det helt normalt, at børn kedede sig en eftermiddag. Det var der, de fandt på lege, byggede huler og lærte at være sammen med sig selv. Måske er det på tide, at vi giver dem den mulighed igen.",
      },
    ],
  },
  {
    slug: "gasgrill",
    title: "Klumme: Naboens nye grill",
    level: "B2",
    blocks: [
      {
        id: "p1",
        type: "paragraph",
        text: "Naboen har købt en ny gasgrill. Den er på størrelse med et lille køkken og har seks brændere, sidebord og indbygget lys. Den blev brugt tre gange i sommer. Resten af tiden har den stået under en presenning og ventet på bedre vejr.",
      },
      {
        id: "p2",
        type: "paragraph",
        text: "Jeg ved godt, at det er naboens egne penge. Men når vi taler om klimaet, taler vi altid om fly og biler. Måske skulle vi også tale om alle de ting, vi køber, fordi vi kan – og ikke fordi vi har brug for dem.",
      },
    ],
  },
  {
    slug: "nattevagt",
    title: "Læserbrev: Tak til nattevagterne",
    level: "B1–B2",
    blocks: [
      {
        id: "p1",
        type: "paragraph",
        text: "I sidste måned lå min far på sygehuset i ti dage. Hver nat, når jeg ringede, tog en sygeplejerske telefonen – rolig og venlig, selvom jeg vidste, at hun havde ansvaret for over tyve patienter.",
      },
      {
        id: "p2",
        type: "paragraph",
        text: "Vi taler meget om løn og overarbejde i sundhedsvæsenet, og det skal vi også. Men i dag vil jeg bare sige tak. Til dem, der holder lyset tændt, mens vi andre sover.",
      },
    ],
  },
  {
    slug: "koncert",
    title: "Klumme: Koncerten, jeg så på en skærm",
    level: "B2",
    blocks: [
      {
        id: "p1",
        type: "paragraph",
        text: "Jeg var til koncert i lørdags. Det var en fantastisk aften – tror jeg. Jeg så den nemlig mest gennem skærmen på telefonen hos manden foran mig, som filmede hele koncerten fra start til slut.",
      },
      {
        id: "p2",
        type: "paragraph",
        text: "Hvem ser egentlig alle de videoer bagefter? Lyden er dårlig, billedet ryster, og sangeren ligner en lille prik. Jeg tror ikke, at jeg er den eneste, der savner de koncerter, hvor man bare var til stede.",
      },
    ],
  },
  {
    slug: "karakterer",
    title: "Debat: Et tal er ikke hele historien",
    level: "B2",
    blocks: [
      {
        id: "p1",
        type: "paragraph",
        text: "Min datter fik 4 i matematik til eksamen. Hun græd hele vejen hjem. Det mærkelige er, at hun i hele 9. klasse har hjulpet sine klassekammerater med opgaverne og selv har bygget en lille robot i sin fritid.",
      },
      {
        id: "p2",
        type: "paragraph",
        text: "Karakterer kan måle, hvordan man klarer sig på en bestemt dag i et bestemt lokale. De kan ikke måle nysgerrighed, hjælpsomhed eller lyst til at lære. Det burde vi huske, før vi lader et enkelt tal afgøre, hvad unge mennesker tror, de er gode til.",
      },
    ],
  },
];

export const questions = [
  // Hvad kan man udlede?: øv
  {
    id: "udled-oev-1",
    textSlug: "jordbaer",
    subskill: "udled",
    type: "multiple_choice",
    prompt: "Hvad kan man udlede om Ane Mikkelsen?",
    options: [
      {
        id: "a",
        text: "Hun ser de spanske jordbær som en konkurrent",
      },
      {
        id: "b",
        text: "Hun vil begynde at dyrke jordbær i Spanien",
        feedback: "Intet i teksten peger på det – hun er kritisk over for de spanske bær.",
      },
      {
        id: "c",
        text: "Hun synes, at jordbær er for dyre",
        feedback: "Prisen nævnes slet ikke. Pas på svar, du ikke kan finde spor til.",
      },
    ],
    correctOptionId: "a",
    hint: "Hvorfor er det et problem for hende, at kunderne »allerede har fået nok af jordbær« i juni?",
    explanation:
      "Hun ryster på hovedet, og når hendes bær er klar, har kunderne allerede købt de spanske. Hun siger det ikke direkte, men de spanske bær tager hendes kunder.",
    marks: [
      { blockId: "p2", text: "ryster på hovedet", kind: "clue" },
      { blockId: "p2", text: "Til den tid har mange kunder allerede fået nok af jordbær", kind: "clue" },
    ],
  },
  {
    id: "udled-oev-2",
    textSlug: "jordbaer",
    subskill: "udled",
    type: "multiple_choice",
    prompt: "Hvad antyder teksten om de spanske jordbær?",
    options: [
      {
        id: "a",
        text: "De er billigere end de danske",
        feedback: "Om prisen står der intet.",
      },
      { id: "b", text: "Transporten belaster miljøet" },
      {
        id: "c",
        text: "De er dyrket økologisk",
        feedback: "Det nævnes ikke. Et godt svar skal have støtte i teksten.",
      },
    ],
    correctOptionId: "b",
    hint: "Hvorfor tror du, at skribenten nævner, hvor langt bærrene har kørt?",
    explanation:
      "Skribenten nævner, at bærrene har kørt »over 2.500 kilometer i lastbil«. Det står der ikke for ingenting: Teksten antyder, at det er dårligt for miljøet.",
    marks: [
      { blockId: "p1", text: "over 2.500 kilometer i lastbil", kind: "clue" },
    ],
  },
  {
    id: "udled-oev-3",
    textSlug: "sprogskole",
    subskill: "udled",
    type: "multiple_choice",
    prompt: "Hvordan har Amira det på den første dag?",
    options: [
      { id: "a", text: "Hun er nervøs" },
      {
        id: "b",
        text: "Hun er vred",
        feedback: "Intet tyder på vrede – hun taler lavt og holder fast i tasken.",
      },
      {
        id: "c",
        text: "Hun keder sig",
        feedback: "Hun har øvet sig hele morgenen – det gør man ikke, hvis man er ligeglad.",
      },
    ],
    correctOptionId: "a",
    hint: "Se på, hvad hun gør med kroppen og stemmen.",
    explanation:
      "Teksten bruger aldrig ordet »nervøs«. Men hun holder tasken tæt ind til kroppen, har øvet sig hele morgenen og taler så lavt, at læreren må spørge igen.",
    marks: [
      { blockId: "p1", text: "med tasken tæt ind til kroppen", kind: "clue" },
      { blockId: "p1", text: "Hun har øvet sig på at sige »Hej, jeg hedder Amira« hele morgenen", kind: "clue" },
      { blockId: "p1", text: "så lavt, at læreren må bede hende om at gentage det", kind: "clue" },
    ],
  },
  {
    id: "udled-oev-4",
    textSlug: "sprogskole",
    subskill: "udled",
    type: "multiple_choice",
    prompt: "Hvad kan man udlede af andet afsnit?",
    options: [
      {
        id: "a",
        text: "Amira er blevet lærer på skolen",
        feedback: "Hun hjælper de nye, men intet siger, at hun er blevet ansat.",
      },
      { id: "b", text: "Amira er blevet mere sikker og føler sig hjemme" },
      {
        id: "c",
        text: "Amira skal snart stoppe på skolen",
        feedback: "Det står der intet om.",
      },
    ],
    correctOptionId: "b",
    hint: "Sammenlign hende med den første dag.",
    explanation:
      "Nu er det hende, der byder velkommen og viser de nye rundt. Hun kender skolen og tør tale – hun er blevet tryg.",
    marks: [
      { blockId: "p2", text: "er det Amira, der byder de nye kursister velkommen", kind: "clue" },
      { blockId: "p2", text: "Hun viser dem, hvor kaffen står", kind: "clue" },
    ],
  },

  // Hvad kan man udlede?: test
  {
    id: "udled-test-1",
    textSlug: "festival",
    subskill: "udled",
    type: "multiple_choice",
    prompt: "Hvad kan man udlede om festivalen?",
    options: [
      { id: "a", text: "Den er blevet mindre med årene" },
      { id: "b", text: "Den er vokset med årene" },
      { id: "c", text: "Den skal flytte tilbage til Tranum" },
    ],
    correctOptionId: "b",
    explanation:
      "Der var »ikke længere plads til de mange gæster«. »Ikke længere« viser, at der før var plads – altså er festivalen vokset.",
    marks: [
      { blockId: "p1", text: "ikke længere var plads til de mange gæster", kind: "clue" },
    ],
  },
  {
    id: "udled-test-2",
    textSlug: "festival",
    subskill: "udled",
    type: "multiple_choice",
    prompt: "Hvad kan man udlede om købmanden?",
    options: [
      { id: "a", text: "Han har tjent færre penge i år" },
      { id: "b", text: "Han er glad for roen om sommeren" },
      { id: "c", text: "Han har lukket sin butik" },
    ],
    correctOptionId: "a",
    explanation:
      "Festivalugen var »årets bedste uge«, og i år »kunne han mærke det på regnskabet«. Uden festivalen har han solgt mindre.",
    marks: [
      { blockId: "p2", text: "Festivalugen var årets bedste uge", kind: "clue" },
      { blockId: "p2", text: "I år kunne jeg mærke det på regnskabet", kind: "clue" },
      { blockId: "p2", text: "Det er dejligt med ro om sommeren", kind: "detail" },
    ],
  },
  {
    id: "udled-test-3",
    textSlug: "firedagesuge-rengoering",
    subskill: "udled",
    type: "multiple_choice",
    prompt: "Hvad kan man udlede af teksten?",
    options: [
      { id: "a", text: "Den korte uge ser ud til at have en god effekt på kontoret" },
      { id: "b", text: "Alle i firmaet arbejder nu fire dage om ugen" },
      { id: "c", text: "Kunderne er utilfredse med rengøringen" },
    ],
    correctOptionId: "a",
    explanation:
      "Sygefraværet blandt kontorfolkene er »faldet markant«, efter de fik fri om fredagen. Det tyder på, at ordningen virker.",
    marks: [
      { blockId: "p1", text: "er sygefraværet blandt kontorfolkene faldet markant", kind: "clue" },
    ],
  },
  {
    id: "udled-test-4",
    textSlug: "firedagesuge-rengoering",
    subskill: "udled",
    type: "multiple_choice",
    prompt: "Hvad antyder rengøringsassistentens ord?",
    options: [
      { id: "a", text: "Assistenten er glad for at arbejde fem dage" },
      { id: "b", text: "Assistenten synes, det er lidt uretfærdigt, men forstår hvorfor" },
      { id: "c", text: "Assistenten vil sige sit job op" },
    ],
    correctOptionId: "b",
    explanation:
      "»Selvfølgelig ville vi også gerne …« viser et ønske. »Men nogen skal jo …« viser, at assistenten accepterer årsagen.",
    marks: [
      { blockId: "p2", text: "Selvfølgelig ville vi også gerne have en ekstra fridag", kind: "clue" },
      { blockId: "p2", text: "Men nogen skal jo tømme skraldespandene", kind: "clue" },
    ],
  },

  // Hvad mener personen?: øv
  {
    id: "person-oev-1",
    textSlug: "kokkeskole",
    subskill: "personer",
    type: "multiple_choice",
    prompt:
      "Hvad mener Mads med, at han ikke kunne huske, hvornår han sidst havde glædet sig til en mandag?",
    options: [
      { id: "a", text: "Han var blevet utilfreds med sit gamle job" },
      {
        id: "b",
        text: "Han havde for travlt i weekenderne",
        feedback: "Weekenden nævnes ikke. Det handler om, hvordan han havde det med at gå på arbejde.",
      },
      {
        id: "c",
        text: "Han havde fri om mandagen",
        feedback: "Læs udtrykket som et billede, ikke bogstaveligt.",
      },
    ],
    correctOptionId: "a",
    hint: "Mandag er den dag, arbejdsugen starter. Hvad siger det om hans job?",
    explanation:
      "Mandag er den første arbejdsdag. Når man aldrig glæder sig til den, er man ikke glad for sit arbejde. Derfor skiftede han.",
    marks: [
      { blockId: "p2", text: "jeg havde siddet med tal i så mange år", kind: "clue" },
      { blockId: "p2", text: "hvornår jeg sidst havde glædet mig til en mandag", kind: "clue" },
    ],
  },
  {
    id: "person-oev-2",
    textSlug: "kokkeskole",
    subskill: "personer",
    type: "multiple_choice",
    prompt: "Hvad viser det, at hans kone spurgte, om han »var gået fra forstanden«?",
    options: [
      { id: "a", text: "Hun var overrasket og i tvivl om hans beslutning" },
      {
        id: "b",
        text: "Hun var bekymret for hans helbred",
        feedback: "»Gået fra forstanden« er et udtryk – det handler ikke om sygdom.",
      },
      {
        id: "c",
        text: "Hun var vred, fordi han ikke havde sagt noget",
        feedback: "Teksten siger intet om, at han holdt det hemmeligt.",
      },
    ],
    correctOptionId: "a",
    hint: "»At gå fra forstanden« betyder at gøre noget meget fornuftsstridigt. Hvad tænkte hun om valget?",
    explanation:
      "Lavere løn og svære arbejdstider – valget virker ufornuftigt. Konens spørgsmål viser, at hun var overrasket og skeptisk.",
    marks: [
      { blockId: "p2", text: "Min kone spurgte, om jeg var gået fra forstanden", kind: "clue" },
      { blockId: "p1", text: "Lønnen er lavere", kind: "clue" },
    ],
  },
  {
    id: "person-oev-3",
    textSlug: "forsamlingshus",
    subskill: "personer",
    type: "multiple_choice",
    prompt: "Hvad mener Grethe Lund med sin sidste sætning?",
    options: [
      { id: "a", text: "Huset har givet folk i byen et sted at mødes igen" },
      {
        id: "b",
        text: "Byen har fået mange nye huse",
        feedback: "»Nyt liv« er ikke nye bygninger, men mere fællesskab og aktivitet.",
      },
      {
        id: "c",
        text: "Renoveringen var ikke god nok",
        feedback: "Hun kritiserer ikke huset – hun siger, at det betyder endnu mere.",
      },
    ],
    correctOptionId: "a",
    hint: "Hvad sker der i huset i dag – og hvem kommer der?",
    explanation:
      "Med fællesspisning og koncerter mødes byens folk igen. Det er ikke kun bygningen, der er blevet bedre – fællesskabet er vågnet.",
    marks: [
      { blockId: "p2", text: "fællesspisning hver anden torsdag og koncerter om lørdagen", kind: "clue" },
      { blockId: "p2", text: "det er byen, der har fået nyt liv", kind: "clue" },
    ],
  },
  {
    id: "person-oev-4",
    textSlug: "forsamlingshus",
    subskill: "personer",
    type: "multiple_choice",
    prompt: "Hvordan har Grethe det med projektet?",
    options: [
      { id: "a", text: "Hun er stolt og glad" },
      {
        id: "b",
        text: "Hun er skuffet",
        feedback: "Intet tyder på skuffelse – hun beskriver noget positivt.",
      },
      {
        id: "c",
        text: "Hun er ligeglad",
        feedback: "Hun er formand og taler varmt om byen. Det tyder ikke på ligegyldighed.",
      },
    ],
    correctOptionId: "a",
    hint: "Er hendes ord positive eller negative?",
    explanation:
      "Hun beskriver projektet som noget, der har givet »byen nyt liv«. Det siger man om noget, man er stolt af.",
    marks: [
      { blockId: "p2", text: "det er byen, der har fået nyt liv", kind: "clue" },
    ],
  },

  // Hvad mener personen?: test
  {
    id: "person-test-1",
    textSlug: "studiejob",
    subskill: "personer",
    type: "multiple_choice",
    prompt: "Hvad mener Emil med »at stå på egne ben«?",
    options: [
      { id: "a", text: "At klare sig selv uden forældrenes hjælp" },
      { id: "b", text: "At gå meget på arbejdet" },
      { id: "c", text: "At blive hurtigt færdig med studiet" },
    ],
    correctOptionId: "a",
    explanation:
      "Han stiller det over for at bo hjemme hos forældrene. At stå på egne ben er at klare sig selv.",
    marks: [
      { blockId: "p2", text: "hvis jeg boede hjemme hos mine forældre", kind: "clue" },
      { blockId: "p2", text: "at stå på egne ben", kind: "clue" },
    ],
  },
  {
    id: "person-test-2",
    textSlug: "studiejob",
    subskill: "personer",
    type: "multiple_choice",
    prompt: "Hvorfor nævner Emil lærebøgerne?",
    options: [
      { id: "a", text: "For at sige, at jobbet lærer ham noget, studiet ikke kan" },
      { id: "b", text: "For at klage over, at lærebøger er dyre" },
      { id: "c", text: "For at sige, at han ikke har tid til at læse" },
    ],
    correctOptionId: "a",
    explanation:
      "»Erfaringer, som ingen lærebog kan give mig« – jobbet på plejehjemmet giver ham noget, han ikke kan lære af bøgerne på medicinstudiet.",
    marks: [
      { blockId: "p2", text: "erfaringer, som ingen lærebog kan give mig", kind: "clue" },
    ],
  },
  {
    id: "person-test-3",
    textSlug: "fiskeren",
    subskill: "personer",
    type: "multiple_choice",
    prompt: "Hvad mener Jens med »Det er nok ikke helt forkert«?",
    options: [
      { id: "a", text: "Han indrømmer, at fiskerne har en del af skylden" },
      { id: "b", text: "Han er helt enig i, at det kun er fiskernes skyld" },
      { id: "c", text: "Han mener, at folk fra byerne tager fejl" },
    ],
    correctOptionId: "a",
    explanation:
      "»Nok ikke helt forkert« er en forsigtig måde at give folk ret på. Men med »Men det er også os, der har betalt prisen« viser han, at det ikke er hele historien.",
    marks: [
      { blockId: "p2", text: "Det er nok ikke helt forkert", kind: "clue" },
      { blockId: "p2", text: "Men det er også os, der har betalt prisen", kind: "clue" },
    ],
  },
  {
    id: "person-test-4",
    textSlug: "fiskeren",
    subskill: "personer",
    type: "multiple_choice",
    prompt: "Hvad antyder Jens' sidste sætning?",
    options: [
      { id: "a", text: "Han er i tvivl om, at fiskeriet har en fremtid" },
      { id: "b", text: "Han vil ikke tale med sit barnebarn" },
      { id: "c", text: "Han synes, at barnebarnet hellere skal være læge" },
    ],
    correctOptionId: "a",
    explanation:
      "Han ved ikke, hvad han skal sige, når barnebarnet vil være fisker. Med kvoter og solgte både er han usikker på, om der er en fremtid i fiskeriet.",
    marks: [
      { blockId: "p2", text: "Jeg ved ikke rigtig, hvad jeg skal sige til ham", kind: "clue" },
      { blockId: "p1", text: "flere af hans gamle kolleger har solgt deres både", kind: "clue" },
    ],
  },

  // Skribentens holdning og tone: øv
  {
    id: "holdning-oev-1",
    textSlug: "gasgrill",
    subskill: "holdning",
    type: "multiple_choice",
    prompt: "Hvilken tone har første afsnit?",
    options: [
      { id: "a", text: "Ironisk og lidt kritisk" },
      {
        id: "b",
        text: "Begejstret",
        feedback: "Skribenten beskriver grillen som overdrevet stor og næsten ubrugt – det er ikke begejstring.",
      },
      {
        id: "c",
        text: "Neutral og saglig",
        feedback: "Overdrivelsen »på størrelse med et lille køkken« er ikke neutral.",
      },
    ],
    correctOptionId: "a",
    hint: "Se på overdrivelsen og på, hvor tit grillen blev brugt.",
    explanation:
      "»På størrelse med et lille køkken« er en overdrivelse, og den store grill blev kun brugt tre gange. Skribenten gør lidt grin med købet – tonen er ironisk.",
    marks: [
      { blockId: "p1", text: "på størrelse med et lille køkken", kind: "clue" },
      { blockId: "p1", text: "Den blev brugt tre gange i sommer.", kind: "clue" },
      { blockId: "p1", text: "ventet på bedre vejr", kind: "clue" },
    ],
  },
  {
    id: "holdning-oev-2",
    textSlug: "gasgrill",
    subskill: "holdning",
    type: "multiple_choice",
    prompt: "Hvad er skribentens holdning?",
    options: [
      { id: "a", text: "Vi bør købe færre ting, vi ikke har brug for" },
      {
        id: "b",
        text: "En gasgrill er værre for klimaet end fly",
        feedback: "Skribenten sammenligner ikke grill og fly – det er for stærkt.",
      },
      {
        id: "c",
        text: "Naboen bør sælge sin grill",
        feedback: "Naboen er kun et eksempel. »Det er naboens egne penge«, skriver skribenten selv.",
      },
    ],
    correctOptionId: "a",
    hint: "Holdningen står ofte til sidst. Hvad »skulle vi måske også«?",
    explanation:
      "Grillen er kun et eksempel. Den sidste sætning udtrykker holdningen: Vi bør tale om alt det, vi køber, uden at have brug for det.",
    marks: [
      { blockId: "p2", text: "Måske skulle vi også tale om alle de ting, vi køber, fordi vi kan – og ikke fordi vi har brug for dem", kind: "clue" },
      { blockId: "p2", text: "Jeg ved godt, at det er naboens egne penge", kind: "detail" },
    ],
  },
  {
    id: "holdning-oev-3",
    textSlug: "nattevagt",
    subskill: "holdning",
    type: "multiple_choice",
    prompt: "Hvad er skribentens formål med læserbrevet?",
    options: [
      { id: "a", text: "At takke sygeplejerskerne" },
      {
        id: "b",
        text: "At klage over sygehuset",
        feedback: "Sygeplejersken beskrives som »rolig og venlig« – der er ingen klage.",
      },
      {
        id: "c",
        text: "At kræve højere løn til sygeplejersker",
        feedback: "Løn nævnes, men »i dag vil jeg bare sige tak«.",
      },
    ],
    correctOptionId: "a",
    hint: "Læg mærke til ordet »Men« i andet afsnit.",
    explanation:
      "Løn og overarbejde nævnes, men »Men i dag vil jeg bare sige tak« viser skribentens egentlige formål.",
    marks: [
      { blockId: "p2", text: "Men i dag vil jeg bare sige tak", kind: "clue" },
      { blockId: "p2", text: "Vi taler meget om løn og overarbejde i sundhedsvæsenet", kind: "detail" },
    ],
  },
  {
    id: "holdning-oev-4",
    textSlug: "nattevagt",
    subskill: "holdning",
    type: "multiple_choice",
    prompt: "Hvem mener skribenten med »dem, der holder lyset tændt, mens vi andre sover«?",
    options: [
      {
        id: "a",
        text: "Elektrikerne på sygehuset",
        feedback: "Udtrykket er et billede – det handler ikke om rigtigt lys.",
      },
      { id: "b", text: "Personalet, der arbejder om natten" },
      {
        id: "c",
        text: "Patienter, der ikke kan sove",
        feedback: "Patienterne holder ikke noget i gang – det gør personalet.",
      },
    ],
    correctOptionId: "b",
    hint: "Se på overskriften.",
    explanation:
      "Overskriften siger »nattevagterne«. At holde lyset tændt, mens andre sover, er et billede på at arbejde om natten.",
    marks: [
      { blockId: "title", text: "nattevagterne", kind: "clue" },
      { blockId: "p2", text: "Til dem, der holder lyset tændt, mens vi andre sover", kind: "clue" },
    ],
  },

  // Skribentens holdning og tone: test
  {
    id: "holdning-test-1",
    textSlug: "koncert",
    subskill: "holdning",
    type: "multiple_choice",
    prompt: "Hvad viser »– tror jeg« i anden sætning?",
    options: [
      { id: "a", text: "At skribenten er i tvivl om, hvilken dag det var" },
      { id: "b", text: "At skribenten ironisk antyder, at koncerten var svær at se" },
      { id: "c", text: "At koncerten var kedelig" },
    ],
    correctOptionId: "b",
    explanation:
      "Sætningen efter forklarer det: Skribenten så koncerten »gennem skærmen på telefonen hos manden foran«. »Tror jeg« er ironi – skribenten oplevede den næsten ikke selv.",
    marks: [
      { blockId: "p1", text: "– tror jeg", kind: "clue" },
      { blockId: "p1", text: "Jeg så den nemlig mest gennem skærmen på telefonen hos manden foran mig", kind: "clue" },
    ],
  },
  {
    id: "holdning-test-2",
    textSlug: "koncert",
    subskill: "holdning",
    type: "multiple_choice",
    prompt: "Hvad er skribentens holdning?",
    options: [
      { id: "a", text: "Publikum bør filme mindre og være mere til stede" },
      { id: "b", text: "Mobiltelefoner bør forbydes til koncerter" },
      { id: "c", text: "Videoer fra koncerter har for dårlig kvalitet" },
    ],
    correctOptionId: "a",
    explanation:
      "Skribenten savner koncerter, »hvor man bare var til stede«. Et forbud nævnes ikke – det er for stærkt. Den dårlige lyd er et argument, ikke selve holdningen.",
    marks: [
      { blockId: "p2", text: "savner de koncerter, hvor man bare var til stede", kind: "clue" },
      { blockId: "p2", text: "Lyden er dårlig, billedet ryster", kind: "detail" },
    ],
  },
  {
    id: "holdning-test-3",
    textSlug: "karakterer",
    subskill: "holdning",
    type: "multiple_choice",
    prompt: "Hvad er skribentens holdning til karakterer?",
    options: [
      { id: "a", text: "De siger noget, men ikke alt om en elev" },
      { id: "b", text: "De bør afskaffes" },
      { id: "c", text: "Matematik bør ikke give karakterer" },
    ],
    correctOptionId: "a",
    explanation:
      "Karakterer »kan måle« noget, men »ikke måle« nysgerrighed og hjælpsomhed. Skribenten vil ikke afskaffe dem – bare ikke lade dem afgøre alt.",
    marks: [
      { blockId: "p2", text: "Karakterer kan måle", kind: "clue" },
      { blockId: "p2", text: "De kan ikke måle nysgerrighed, hjælpsomhed eller lyst til at lære", kind: "clue" },
    ],
  },
  {
    id: "holdning-test-4",
    textSlug: "karakterer",
    subskill: "holdning",
    type: "multiple_choice",
    prompt: "Hvorfor fortæller skribenten om robotten?",
    options: [
      { id: "a", text: "For at vise, at datteren har evner, som karakteren ikke viser" },
      { id: "b", text: "For at anbefale robotbyggeri til unge" },
      { id: "c", text: "For at forklare, hvorfor datteren fik 4" },
    ],
    correctOptionId: "a",
    explanation:
      "»Det mærkelige er …« viser, at robotten og hjælpen til kammeraterne ikke passer med karakteren 4. Eksemplet støtter holdningen om, at et tal ikke er hele historien.",
    marks: [
      { blockId: "p1", text: "Det mærkelige er", kind: "clue" },
      { blockId: "p1", text: "selv har bygget en lille robot i sin fritid", kind: "clue" },
    ],
  },
];

export const walkthroughs = [
  {
    subskill: "udled",
    textSlug: "kantine",
    question: "Hvad kan man udlede af teksten?",
    answer: "Medarbejderne spiser sundere end før",
    steps: [
      {
        text: "At udlede betyder at forstå noget, som teksten ikke siger direkte. Svaret står ikke ord for ord – men teksten giver dig spor.",
        marks: [],
      },
      {
        text: "Find det første spor: Køen ved salatbaren er blevet længere.",
        marks: [
          { blockId: "p2", text: "køen ved salatbaren blevet længere", kind: "clue" },
        ],
      },
      {
        text: "Endnu et spor: Kokken må bestille dobbelt så mange grøntsager.",
        marks: [
          { blockId: "p2", text: "dobbelt så mange grøntsager", kind: "clue" },
        ],
      },
      {
        text: "Læg sporene sammen: Flere spiser salat og grønt, og sodavanden er væk. Altså spiser medarbejderne sundere – selvom ordet »sundere« aldrig står i teksten.",
        marks: [
          { blockId: "p1", text: "fjernede de samtidig sodavandsautomaten", kind: "clue" },
          { blockId: "p2", text: "køen ved salatbaren blevet længere", kind: "clue" },
          { blockId: "p2", text: "dobbelt så mange grøntsager", kind: "clue" },
        ],
      },
      {
        text: "Pas på svar, der går for langt. At nogle savner automaten, betyder ikke, at medarbejderne var imod kantinen – »de fleste har vænnet sig til det«. Og om priser står der intet.",
        marks: [
          { blockId: "p2", text: "Der er nogle, der stadig savner automaten", kind: "detail" },
          { blockId: "p2", text: "de fleste har vænnet sig til det", kind: "clue" },
        ],
      },
      {
        text: "Tjek til sidst: Kan du pege på sporene i teksten? Ja. Så er svaret godt begrundet.",
        marks: [],
      },
    ],
  },
  {
    subskill: "personer",
    textSlug: "ladcykel",
    question:
      "Hvad mener Line, når hun siger: »nu kan jeg ikke forestille mig at sidde i kø på ringvejen igen«?",
    answer: "Hun er glad for at have skiftet bilen ud med cyklen",
    steps: [
      {
        text: "Folk i tekster siger sjældent direkte »jeg er glad« eller »jeg er ked af det«. Du skal forstå, hvad de mener, ud fra det, de siger og gør.",
        marks: [],
      },
      {
        text: "Læs citatet præcist. »Kan ikke forestille mig … igen« betyder, at hun ikke vil tilbage til det gamle liv i bilen.",
        marks: [
          { blockId: "p2", text: "nu kan jeg ikke forestille mig at sidde i kø på ringvejen igen", kind: "clue" },
        ],
      },
      {
        text: "Se på ord, der viser følelser: »siger hun og griner«. Hun er i godt humør, når hun fortæller.",
        marks: [{ blockId: "p2", text: "siger hun og griner", kind: "clue" }],
      },
      {
        text: "»Ved at fortryde« handler kun om den første uge. Ordet »Men« viser, at det har ændret sig siden.",
        marks: [
          { blockId: "p2", text: "Den første uge var jeg ved at fortryde", kind: "detail" },
          { blockId: "p2", text: "Men", kind: "clue" },
        ],
      },
      {
        text: "Svaret er altså, at hun er glad for skiftet. Teksten siger intet om, at ringvejen er farlig – så det svar kan du ikke begrunde.",
        marks: [
          { blockId: "p2", text: "De kalder det morgenens bedste tur", kind: "clue" },
        ],
      },
    ],
  },
  {
    subskill: "holdning",
    textSlug: "kede-sig",
    question: "Hvad er skribentens holdning?",
    answer: "Børn har for mange aktiviteter og bør have mere fri tid",
    steps: [
      {
        text: "Skribenten skriver aldrig »jeg mener, at …«. Holdningen gemmer sig i ordvalget, i billederne og ofte i slutningen.",
        marks: [{ blockId: "title", kind: "clue" }],
      },
      {
        text: "»Som taxachauffører« er et billede. Det viser, at forældrene føler sig presset – det er ikke positivt ment.",
        marks: [
          { blockId: "p1", text: "som taxachauffører", kind: "clue" },
          { blockId: "p1", text: "ingen af os har tid til at trække vejret", kind: "clue" },
        ],
      },
      {
        text: "Andet afsnit beskriver kedsomhed som noget godt: Børn fandt på lege og lærte at være sammen med sig selv.",
        marks: [
          { blockId: "p2", text: "fandt på lege, byggede huler og lærte at være sammen med sig selv", kind: "clue" },
        ],
      },
      {
        text: "Til sidst kommer en forsigtig opfordring: »Måske er det på tide …«. Her står holdningen tydeligst.",
        marks: [
          { blockId: "p2", text: "Måske er det på tide, at vi giver dem den mulighed igen.", kind: "clue" },
        ],
      },
      {
        text: "Fodbold, svømning og spejder er eksempler – skribenten er ikke imod sport. Pas på svar, der bygger på et enkelt eksempel.",
        marks: [
          { blockId: "p1", text: "fodbold, svømning, spejder og musikskole", kind: "detail" },
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
    slug: "udled",
    subskill: "udled",
    stages: [
      { kind: "walkthrough" },
      {
        kind: "practice",
        items: [
          { textSlug: "jordbaer", questionIds: ["udled-oev-1", "udled-oev-2"] },
          { textSlug: "sprogskole", questionIds: ["udled-oev-3", "udled-oev-4"] },
        ],
      },
      {
        kind: "check",
        items: [
          { textSlug: "festival", questionIds: ["udled-test-1", "udled-test-2"] },
          {
            textSlug: "firedagesuge-rengoering",
            questionIds: ["udled-test-3", "udled-test-4"],
          },
        ],
      },
      { kind: "review" },
    ],
  },
  {
    slug: "personer",
    subskill: "personer",
    stages: [
      { kind: "walkthrough" },
      {
        kind: "practice",
        items: [
          { textSlug: "kokkeskole", questionIds: ["person-oev-1", "person-oev-2"] },
          { textSlug: "forsamlingshus", questionIds: ["person-oev-3", "person-oev-4"] },
        ],
      },
      {
        kind: "check",
        items: [
          { textSlug: "studiejob", questionIds: ["person-test-1", "person-test-2"] },
          { textSlug: "fiskeren", questionIds: ["person-test-3", "person-test-4"] },
        ],
      },
      { kind: "review" },
    ],
  },
  {
    slug: "holdning",
    subskill: "holdning",
    stages: [
      { kind: "walkthrough" },
      {
        kind: "practice",
        items: [
          { textSlug: "gasgrill", questionIds: ["holdning-oev-1", "holdning-oev-2"] },
          { textSlug: "nattevagt", questionIds: ["holdning-oev-3", "holdning-oev-4"] },
        ],
      },
      {
        kind: "check",
        items: [
          { textSlug: "koncert", questionIds: ["holdning-test-1", "holdning-test-2"] },
          { textSlug: "karakterer", questionIds: ["holdning-test-3", "holdning-test-4"] },
        ],
      },
      { kind: "review" },
    ],
  },
];
