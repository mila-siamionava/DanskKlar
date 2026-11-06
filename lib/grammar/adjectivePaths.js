/*
  Addresses of the adjective pages, in one place:

    /grammar/adjektiver                              overview
    /grammar/adjektiver/1-grad/regler                lessons of a part
    /grammar/adjektiver/1-grad/regler/grundform      one lesson
    /grammar/adjektiver/1-grad/ovelser               exercises of a part
    /grammar/adjektiver/1-grad/ovelser/find-fejlen   one exercise

  Lessons and exercises say which part they belong to (part: "grundform" | "grad").
*/

export const ADJECTIVES_PATH = "/grammar/adjektiver";

export const adjectiveParts = [
  {
    id: "grundform",
    slug: "1-grad",
    title: "1. grad: grundform",
    short: "En grøn bil, det grønne hus, huset er grønt",
    intro:
      "Sådan bøjer du adjektivet efter navneordet: en grøn bil, et grønt hus, de grønne huse.",
    intro_en:
      "How the adjective changes to match the noun: en grøn bil, et grønt hus, de grønne huse.",
    intro_ru:
      "Как прилагательное изменяется в зависимости от существительного: en grøn bil, et grønt hus, de grønne huse.",
  },
  {
    id: "grad",
    slug: "2-og-3-grad",
    title: "2. og 3. grad: gradbøjning",
    short: "Højere, højest, den højeste, højere end",
    intro: "Sådan sammenligner du: høj, højere, højest, den højeste.",
    intro_en: "How to compare: høj, højere, højest, den højeste.",
    intro_ru: "Как сравнивать: høj, højere, højest, den højeste.",
  },
];

export function getPartBySlug(slug) {
  return adjectiveParts.find((part) => part.slug === slug) ?? null;
}

export function getPart(id) {
  return adjectiveParts.find((part) => part.id === id) ?? null;
}

export function partHref(partId, tab = "regler") {
  return `${ADJECTIVES_PATH}/${getPart(partId).slug}/${tab}`;
}

export function lessonHref(lesson) {
  return `${partHref(lesson.part, "regler")}/${lesson.id}`;
}

export function exerciseHref(exercise) {
  return `${partHref(exercise.part, "ovelser")}/${exercise.id}`;
}
