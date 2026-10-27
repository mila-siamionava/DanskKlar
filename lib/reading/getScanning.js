import {
  documents,
  lessons,
  questions,
  subskills,
  walkthroughs,
} from "./scanningSamples";

/*
  Reads the sample content for now.
  Later these become Supabase queries that return the same shapes,
  so the pages and components don't change.
*/

function findDocument(slug) {
  return documents.find(
    (document) => document.slug === slug,
  );
}

function findQuestions(ids) {
  return ids.map((id) =>
    questions.find(
      (question) => question.id === id,
    ),
  );
}

export async function getScanningSkills() {
  const skills = [...subskills]
    .sort((a, b) => a.order - b.order)
    .map((subskill) => ({
      slug: subskill.slug,
      title: subskill.title,
      description: subskill.description,
    }));

  const mixed = lessons.find(
    (lesson) => lesson.slug === "blandet",
  );

  return {
    skills,

    mixed: {
      slug: mixed.slug,
      title: mixed.title,
      description: mixed.description,
    },
  };
}

export async function getScanningLesson(slug) {
  const lesson = lessons.find(
    (item) => item.slug === slug,
  );

  if (!lesson) {
    return null;
  }

  const subskill = subskills.find(
    (item) => item.slug === lesson.subskill,
  );

  const walkthrough = walkthroughs.find(
    (item) => item.subskill === lesson.subskill,
  );

  const stages = lesson.stages.map((stage) => {
    if (stage.kind === "walkthrough") {
      return {
        kind: stage.kind,
        question: walkthrough.question,
        answer: walkthrough.answer,
        steps: walkthrough.steps,
        document: findDocument(
          walkthrough.documentSlug,
        ),
      };
    }

    if (stage.kind === "review") {
      return { kind: stage.kind };
    }

    return {
      kind: stage.kind,
      timeLimitSeconds:
        stage.timeLimitSeconds ?? null,
      document: findDocument(stage.documentSlug),
      questions: findQuestions(stage.questionIds),
    };
  });

  return {
    slug: lesson.slug,
    title: subskill?.title ?? lesson.title,
    description:
      subskill?.description ?? lesson.description,
    isMixed: !subskill,
    subskills: subskills.map(({ slug, title }) => ({
      slug,
      title,
    })),
    stages,
  };
}
