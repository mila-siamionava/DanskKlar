import { createServer } from "node:http";

/*
  Tiny stand-in for the Supabase REST API, so the accessibility tests
  run without your real database. Returns the same small data set
  for every request to a table.
*/

const vocabulary = [
  {
    id: "v1",
    term: "arbejdsløshed",
    part_of_speech: "substantiv",
    level: "B1",
    definition_da: "Det at være uden arbejde",
    english: "unemployment",
    russian: "безработица",
    example: "Arbejdsløsheden er faldet.",
  },
  {
    id: "v2",
    term: "ansøgning",
    part_of_speech: "substantiv",
    level: "B1",
    definition_da: "Et brev hvor man søger et job",
    english: "application",
    russian: "заявление",
    example: "Jeg sendte en ansøgning.",
  },
  {
    id: "v3",
    term: "kollega",
    part_of_speech: "substantiv",
    level: "A2",
    definition_da: "En person man arbejder sammen med",
    english: "colleague",
    russian: "коллега",
    example: "Min kollega er sød.",
  },
];

const trainingModes = [
  "flashcards",
  "match-pairs",
  "true-false",
  "multiple-choice",
  "definition-word",
  "fill-gap",
  "first-letter",
  "typed-gap",
  "build-sentence",
];

const resources = [
  ["text", "jobskifte"],
  ["reading_exercise", "vocabulary_gap"],
  ["reading_exercise", "connector_gap"],
  ...trainingModes.map((mode) => ["training_mode", mode]),
].map(([resourceType, resourceKey]) => ({
  resources: {
    resource_type: resourceType,
    resource_key: resourceKey,
    name: resourceKey,
  },
}));

const tables = {
  topics: [
    { id: 1, name: "Arbejde", slug: "arbejde", description: "", vocabulary_topics: [{ count: 3 }] },
    { id: 2, name: "Miljø", slug: "miljo", description: "", vocabulary_topics: [{ count: 0 }] },
    { id: 3, name: "Sundhed", slug: "sundhed", description: "", vocabulary_topics: [{ count: 0 }] },
  ],

  plans: [{ id: 1, code: "guest" }],

  plan_resources: resources,

  profiles: [],

  texts: [
    {
      id: 10,
      slug: "jobskifte",
      title: "Jobskifte",
      level: "PD3.5",
      topic_id: 1,
      topic: { id: 1, name: "Arbejde", slug: "arbejde" },
      text_exercises: [
        { exercise_type: "vocabulary_gap" },
        { exercise_type: "connector_gap" },
      ],
    },
  ],

  text_exercises: [
    {
      id: 20,
      title: "Jobskifte",
      level: "PD3.5",
      instruction: "Vælg det rigtige ord.",
      exercise_text:
        "Mange danskere skifter {{1}} flere gange i løbet af livet.\nDet kræver en god {{2}} og mod.",
    },
  ],

  text_exercise_gaps: [
    { id: 31, gap_number: 1, explanation_en: "Job", explanation_ru: "Работа" },
    { id: 32, gap_number: 2, explanation_en: "Application", explanation_ru: "Заявление" },
  ],

  text_gap_options: [
    { id: "o1", gap_id: 31, option_text: "job", is_correct: true, vocabulary_id: null },
    { id: "o2", gap_id: 31, option_text: "hus", is_correct: false, vocabulary_id: "v3" },
    { id: "o3", gap_id: 32, option_text: "ansøgning", is_correct: true, vocabulary_id: "v2" },
    { id: "o4", gap_id: 32, option_text: "kollega", is_correct: false, vocabulary_id: "v3" },
  ],

  vocabulary,

  vocabulary_topics: vocabulary.map((item) => ({ vocabulary: item })),
};

createServer((request, response) => {
  const url = new URL(request.url, "http://localhost");
  const table = url.pathname.replace("/rest/v1/", "");
  const slug = url.searchParams.get("slug");

  let rows = tables[table] ?? [];

  if (slug?.startsWith("eq.")) {
    rows = rows.filter((row) => row.slug === slug.slice(3));
  }

  const wantsSingleRow = (request.headers.accept ?? "").includes(
    "vnd.pgrst.object",
  );

  response.setHeader("content-type", "application/json");

  response.end(
    JSON.stringify(wantsSingleRow ? (rows[0] ?? null) : rows),
  );
}).listen(54321, () => {
  console.log("fake supabase on http://localhost:54321");
});
