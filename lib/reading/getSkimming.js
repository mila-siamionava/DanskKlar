import {
  lessons,
  paragraphFunctions,
  questions,
  subskills,
  texts,
  upcomingSubskills,
  walkthroughs,
} from "./skimmingSamples";

/*
  Reads the sample content for now.
  Later these become Supabase queries that return the same shapes,
  so the pages and components don't change.
*/

function findText(slug) {
  return texts.find((text) => text.slug === slug);
}

function withChoiceLabels(question) {
  if (question.type !== "paragraph_functions") {
    return question;
  }

  return {
    ...question,
    choices: question.choices.map((id) => ({
      id,
      label: paragraphFunctions[id],
    })),
  };
}

function findQuestions(ids) {
  return ids.map((id) =>
    withChoiceLabels(
      questions.find((question) => question.id === id),
    ),
  );
}

export async function getSkimmingSkills() {
  const skills = [...subskills]
    .sort((a, b) => a.order - b.order)
    .map(({ slug, title, description, level }) => ({
      slug,
      title,
      description,
      level,
    }));

  return { skills, upcoming: upcomingSubskills };
}

export async function getSkimmingLesson(slug) {
  const lesson = lessons.find((item) => item.slug === slug);

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
        text: findText(walkthrough.textSlug),
      };
    }

    if (stage.kind === "review") {
      return { kind: stage.kind };
    }

    return {
      kind: stage.kind,
      items: stage.items.map((item) => ({
        text: findText(item.textSlug),
        questions: findQuestions(item.questionIds),
        preview: Boolean(item.preview),
      })),
    };
  });

  return {
    slug: lesson.slug,
    title: subskill.title,
    description: subskill.description,
    stages,
  };
}
