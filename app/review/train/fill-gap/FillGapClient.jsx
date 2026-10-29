"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import ExerciseQuestionCard from "@/components/exercises/ExerciseQuestionCard/ExerciseQuestionCard";
import ExerciseShell from "@/components/exercises/ExerciseShell/ExerciseShell";
import ExerciseState from "@/components/exercises/ExerciseState/ExerciseState";
import { useActivitySession } from "@/lib/progress/useActivitySession";

import {
  createGapSentence,
  createDoubleGapSentence,
} from "../_lib/sentenceUtils";

import { shuffle } from "../_lib/arrayUtils";
import { useSelectedReviewItems } from "../_hooks/useSelectedReviewItems";
import { useTrainingProgress } from "../_hooks/useTrainingProgress";

import styles from "./FillGap.module.css";

function normalizePartOfSpeech(
  value = "",
) {
  return value
    .trim()
    .toLowerCase();
}

function prepareTrainingItem(item) {
  if (!item?.example) {
    return null;
  }

  const hasDoubleTarget =
    item.example_target_1 &&
    item.example_target_2;

  if (hasDoubleTarget) {
    const trainingSentence =
      createDoubleGapSentence(
        item.example,
        item.example_target_1,
        item.example_target_2,
      );

    if (!trainingSentence) {
      return null;
    }

    return {
      ...item,
      targetMode: "double",
      target1:
        item.example_target_1,
      target2:
        item.example_target_2,
      trainingSentence,
    };
  }

  const target =
    item.example_target;

  if (!target) {
    return null;
  }

  const trainingSentence =
    createGapSentence(
      item.example,
      target,
    );

  if (!trainingSentence) {
    return null;
  }

  return {
    ...item,
    targetMode: "single",
    target,
    trainingSentence,
  };
}

export default function FillGapClient({
  vocabulary,
}) {
  const {
    items: selectedItems,
    isLoading,
  } = useSelectedReviewItems();

  /*
   * The Review hook gives us the selected
   * vocabulary IDs.
   *
   * Fill the Gap needs additional database
   * fields such as example_target, so we
   * hydrate those selected IDs from the full
   * vocabulary passed by the server.
   */
  const items = useMemo(() => {
    const vocabularyById =
      new Map(
        vocabulary.map(
          (item) => [
            item.id,
            item,
          ],
        ),
      );

    return selectedItems
      .map((selectedItem) => {
        const id =
          selectedItem.vocabularyId ??
          selectedItem.id;

        const fullItem =
          vocabularyById.get(id);

        if (!fullItem) {
          return null;
        }

        return prepareTrainingItem(
          fullItem,
        );
      })
      .filter(Boolean);
  }, [
    selectedItems,
    vocabulary,
  ]);

  /*
   * Full vocabulary is NOT the training queue.
   * It is only used to create plausible
   * distractors.
   */
  const distractorPool =
    useMemo(
      () =>
        vocabulary
          .map(
            prepareTrainingItem,
          )
          .filter(Boolean),
      [vocabulary],
    );

  const {
    currentIndex,
    finished,
    next,
  } = useTrainingProgress(
    items.length,
  );

  const session = useActivitySession({
    area: "words",
    activity: "fill-gap",
    title: "Udfyld hullet",
    finished: finished,
  });

  const currentItem =
    items[currentIndex];

  const [
    selectedAnswer,
    setSelectedAnswer,
  ] = useState(null);

  const [
    selectedAnswer1,
    setSelectedAnswer1,
  ] = useState(null);

  const [
    selectedAnswer2,
    setSelectedAnswer2,
  ] = useState(null);

  const [
    options,
    setOptions,
  ] = useState([]);

  const [
    options1,
    setOptions1,
  ] = useState([]);

  const [
    options2,
    setOptions2,
  ] = useState([]);

  useEffect(() => {
    if (!currentItem) {
      setOptions([]);
      setOptions1([]);
      setOptions2([]);
      return;
    }

    const currentCategory =
      normalizePartOfSpeech(
        currentItem.part_of_speech,
      );

    /*
     * SINGLE GAP
     */
    if (
      currentItem.targetMode ===
      "single"
    ) {
      const correctAnswer =
        currentItem.target
          .trim()
          .toLowerCase();

      const wrongAnswers =
        distractorPool
          .filter(
            (item) =>
              item.id !==
                currentItem.id &&
              item.targetMode ===
                "single" &&
              normalizePartOfSpeech(
                item.part_of_speech,
              ) ===
                currentCategory,
          )
          .map((item) =>
            item.target
              ?.trim()
              .toLowerCase(),
          )
          .filter(Boolean)
          .filter(
            (answer) =>
              answer !==
              correctAnswer,
          );

      const uniqueWrongAnswers =
        [
          ...new Set(
            wrongAnswers,
          ),
        ];

      /*
       * 2 wrong + 1 correct
       * = 3 options total.
       */
      const selectedWrongAnswers =
        shuffle(
          uniqueWrongAnswers,
        ).slice(0, 2);

      setOptions(
        shuffle([
          correctAnswer,
          ...selectedWrongAnswers,
        ]),
      );

      setOptions1([]);
      setOptions2([]);

      return;
    }

    /*
     * DOUBLE GAP
     */
    const correctAnswer1 =
      currentItem.target1
        .trim()
        .toLowerCase();

    const correctAnswer2 =
      currentItem.target2
        .trim()
        .toLowerCase();

    const sameCategoryItems =
      distractorPool.filter(
        (item) =>
          item.id !==
            currentItem.id &&
          item.targetMode ===
            "double" &&
          normalizePartOfSpeech(
            item.part_of_speech,
          ) ===
            currentCategory,
      );

    const firstTargetOptions =
      sameCategoryItems
        .map((item) =>
          item.target1
            ?.trim()
            .toLowerCase(),
        )
        .filter(Boolean)
        .filter(
          (answer) =>
            answer !==
            correctAnswer1,
        );

    const secondTargetOptions =
      sameCategoryItems
        .map((item) =>
          item.target2
            ?.trim()
            .toLowerCase(),
        )
        .filter(Boolean)
        .filter(
          (answer) =>
            answer !==
            correctAnswer2,
        );

    const uniqueFirstTargets =
      [
        ...new Set(
          firstTargetOptions,
        ),
      ];

    const uniqueSecondTargets =
      [
        ...new Set(
          secondTargetOptions,
        ),
      ];

    setOptions1(
      shuffle([
        correctAnswer1,
        ...shuffle(
          uniqueFirstTargets,
        ).slice(0, 2),
      ]),
    );

    setOptions2(
      shuffle([
        correctAnswer2,
        ...shuffle(
          uniqueSecondTargets,
        ).slice(0, 2),
      ]),
    );

    setOptions([]);
  }, [
    currentItem,
    distractorPool,
  ]);

  if (isLoading) {
    return (
      <main className="mobilePage">
        <ExerciseState
          eyebrow="Udfyld hullet"
          title="Henter ord"
          message="Gør dine valgte ord klar …"
        />
      </main>
    );
  }

  if (selectedItems.length === 0) {
    return (
      <main className="mobilePage">
        <ExerciseState
          eyebrow="Udfyld hullet"
          title="Ingen ord valgt"
          message="Vælg nogle ord under Dine ord, før du starter øvelsen."
          actionLabel="Tilbage til dine ord"
          actionHref="/review"
        />
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="mobilePage">
        <ExerciseState
          eyebrow="Udfyld hullet"
          title="Ingen brugbare eksempler"
          message="Dine valgte ord har ingen eksempelsætninger, der kan bruges i denne øvelse."
          actionLabel="Tilbage til dine ord"
          actionHref="/review"
        />
      </main>
    );
  }

  if (finished) {
    return (
      <main className="mobilePage">
        <ExerciseState
          eyebrow="Udfyld hullet"
          title="Øvelsen er færdig"
          message={`Du har lavet ${
            items.length
          } ${
            items.length === 1
              ? "hul"
              : "huller"
          }.`}
          actionLabel="Tilbage til træning"
          actionHref="/review/train"
        />
      </main>
    );
  }

  const isDouble =
    currentItem.targetMode ===
    "double";

  const correctAnswer =
    !isDouble
      ? currentItem.target
          .trim()
          .toLowerCase()
      : "";

  const correctAnswer1 =
    isDouble
      ? currentItem.target1
          .trim()
          .toLowerCase()
      : "";

  const correctAnswer2 =
    isDouble
      ? currentItem.target2
          .trim()
          .toLowerCase()
      : "";

  const isSingleAnswered =
    selectedAnswer !== null;

  const isDoubleAnswered =
    selectedAnswer1 !== null &&
    selectedAnswer2 !== null;

  const isAnswered =
    isDouble
      ? isDoubleAnswered
      : isSingleAnswered;

  const isDoubleCorrect =
    selectedAnswer1 ===
      correctAnswer1 &&
    selectedAnswer2 ===
      correctAnswer2;

  const singleSentenceParts =
    !isDouble
      ? currentItem.trainingSentence.split(
          "{{gap}}",
        )
      : [];

  const doubleSentenceParts =
    isDouble
      ? currentItem.trainingSentence.split(
          /{{gap1}}|{{gap2}}/,
        )
      : [];

  function chooseAnswer(
    answer,
  ) {
    if (isSingleAnswered) {
      return;
    }

    setSelectedAnswer(
      answer,
    );
  }

  function chooseAnswer1(
    answer,
  ) {
    if (
      selectedAnswer1 !== null
    ) {
      return;
    }

    setSelectedAnswer1(
      answer,
    );
  }

  function chooseAnswer2(
    answer,
  ) {
    if (
      selectedAnswer2 !== null
    ) {
      return;
    }

    setSelectedAnswer2(
      answer,
    );
  }

  function nextQuestion() {
    session.recordWord(
      currentItem,
      "gen",
      isDouble
        ? isDoubleCorrect
        : selectedAnswer === correctAnswer,
    );

    setSelectedAnswer(null);
    setSelectedAnswer1(null);
    setSelectedAnswer2(null);

    setOptions([]);
    setOptions1([]);
    setOptions2([]);

    next();
  }

  return (
    <ExerciseShell
      eyebrow="Udfyld hullet"
      title="Gør sætningen færdig"
      current={
        currentIndex + 1
      }
      total={items.length}
    >
      <ExerciseQuestionCard>
        {!isDouble && (
          <p
            className={
              styles.sentence
            }
          >
            {
              singleSentenceParts[0]
            }

            <span
              className={
                styles.gap
              }
            >
              {isAnswered ? (
                <strong>
                  {
                    correctAnswer
                  }
                </strong>
              ) : (
                ""
              )}
            </span>

            {
              singleSentenceParts[1]
            }
          </p>
        )}

        {isDouble && (
          <p
            className={
              styles.sentence
            }
          >
            {
              doubleSentenceParts[0]
            }

            <span
              className={
                styles.gap
              }
            >
              {isAnswered ? (
                <strong>
                  {
                    correctAnswer1
                  }
                </strong>
              ) : (
                ""
              )}
            </span>

            {
              doubleSentenceParts[1]
            }

            <span
              className={
                styles.gap
              }
            >
              {isAnswered ? (
                <strong>
                  {
                    correctAnswer2
                  }
                </strong>
              ) : (
                ""
              )}
            </span>

            {
              doubleSentenceParts[2]
            }
          </p>
        )}

        {!isDouble && (
          <div
            className={
              styles.options
            }
          >
            {options.map(
              (option) => {
                const isCorrect =
                  option ===
                  correctAnswer;

                const isSelected =
                  option ===
                  selectedAnswer;

                let optionClass =
                  styles.option;

                if (
                  isAnswered &&
                  isCorrect
                ) {
                  optionClass +=
                    ` ${styles.correct}`;
                }

                if (
                  isAnswered &&
                  isSelected &&
                  !isCorrect
                ) {
                  optionClass +=
                    ` ${styles.wrong}`;
                }

                return (
                  <button
                    key={
                      option
                    }
                    type="button"
                    className={
                      optionClass
                    }
                    onClick={() =>
                      chooseAnswer(
                        option,
                      )
                    }
                    disabled={
                      isAnswered
                    }
                  >
                    {option}
                  </button>
                );
              },
            )}
          </div>
        )}

        {isDouble && (
          <>
            <div
              className={
                styles.options
              }
            >
              {options1.map(
                (option) => {
                  const isCorrect =
                    option ===
                    correctAnswer1;

                  const isSelected =
                    option ===
                    selectedAnswer1;

                  let optionClass =
                    styles.option;

                  if (
                    selectedAnswer1 !==
                      null &&
                    isCorrect
                  ) {
                    optionClass +=
                      ` ${styles.correct}`;
                  }

                  if (
                    selectedAnswer1 !==
                      null &&
                    isSelected &&
                    !isCorrect
                  ) {
                    optionClass +=
                      ` ${styles.wrong}`;
                  }

                  return (
                    <button
                      key={`first-${option}`}
                      type="button"
                      className={
                        optionClass
                      }
                      onClick={() =>
                        chooseAnswer1(
                          option,
                        )
                      }
                      disabled={
                        selectedAnswer1 !==
                        null
                      }
                    >
                      {option}
                    </button>
                  );
                },
              )}
            </div>

            <div
              className={
                styles.options
              }
            >
              {options2.map(
                (option) => {
                  const isCorrect =
                    option ===
                    correctAnswer2;

                  const isSelected =
                    option ===
                    selectedAnswer2;

                  let optionClass =
                    styles.option;

                  if (
                    selectedAnswer2 !==
                      null &&
                    isCorrect
                  ) {
                    optionClass +=
                      ` ${styles.correct}`;
                  }

                  if (
                    selectedAnswer2 !==
                      null &&
                    isSelected &&
                    !isCorrect
                  ) {
                    optionClass +=
                      ` ${styles.wrong}`;
                  }

                  return (
                    <button
                      key={`second-${option}`}
                      type="button"
                      className={
                        optionClass
                      }
                      onClick={() =>
                        chooseAnswer2(
                          option,
                        )
                      }
                      disabled={
                        selectedAnswer2 !==
                        null
                      }
                    >
                      {option}
                    </button>
                  );
                },
              )}
            </div>
          </>
        )}

        {isAnswered && (
          <div
            className={
              styles.feedback
            }
          >
            {!isDouble &&
              (selectedAnswer ===
              correctAnswer ? (
                <p
                  className={
                    styles.feedbackCorrect
                  }
                >
                  ✓ Rigtigt
                </p>
              ) : (
                <p
                  className={
                    styles.feedbackWrong
                  }
                >
                  Correct answer:{" "}
                  <strong>
                    {
                      correctAnswer
                    }
                  </strong>
                </p>
              ))}

            {isDouble &&
              (isDoubleCorrect ? (
                <p
                  className={
                    styles.feedbackCorrect
                  }
                >
                  ✓ Rigtigt
                </p>
              ) : (
                <p
                  className={
                    styles.feedbackWrong
                  }
                >
                  Correct answer:{" "}
                  <strong>
                    {
                      correctAnswer1
                    }
                    {" ... "}
                    {
                      correctAnswer2
                    }
                  </strong>
                </p>
              ))}

            <button
              type="button"
              className={
                styles.nextButton
              }
              onClick={
                nextQuestion
              }
            >
              Næste →
            </button>
          </div>
        )}
      </ExerciseQuestionCard>
    </ExerciseShell>
  );
}