/*
  Reads the sample content of one strategy (skimming, nærlæsning, inferens).
  Every samples file has the same shape:
  subskills, upcomingSubskills, texts, questions, walkthroughs, lessons
  and choiceLabels for the item questions.

  Later these become Supabase queries that return the same shapes,
  so the pages and components don't change.
*/
export function createStrategyContent(strategyId, samples) {
  const {
    subskills,
    upcomingSubskills = [],
    texts,
    questions,
    walkthroughs,
    lessons,
    choiceLabels = {},
  } = samples;

  function findText(slug) {
    return texts.find((text) => text.slug === slug);
  }

  // item questions store choice ids; the components need the labels too
  function withChoiceLabels(question) {
    if (!question.choices) {
      return question;
    }

    return {
      ...question,
      choices: question.choices.map((id) => ({
        id,
        label: choiceLabels[id],
      })),
    };
  }

  function findQuestions(ids) {
    return ids.map((id) =>
      withChoiceLabels(questions.find((question) => question.id === id)),
    );
  }

  async function getSkills() {
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

  async function getLesson(slug) {
    const lesson = lessons.find((item) => item.slug === slug);

    if (!lesson) {
      return null;
    }

    const subskill = subskills.find((item) => item.slug === lesson.subskill);

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
      strategy: strategyId,
      slug: lesson.slug,
      title: subskill.title,
      description: subskill.description,
      stages,
    };
  }

  return { getSkills, getLesson };
}
