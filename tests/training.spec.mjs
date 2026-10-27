import { test, expect } from "@playwright/test";

const russianOnlyWords = [
  { id: "r1", vocabularyId: "r1", term: "arbejde", russian: "работа", exerciseTitle: "Jobskifte" },
  { id: "r2", vocabularyId: "r2", term: "kollega", russian: "коллега", exerciseTitle: "Jobskifte" },
  { id: "r3", vocabularyId: "r3", term: "løn", russian: "зарплата", exerciseTitle: "Jobskifte" },
];

async function selectWords(page, words) {
  await page.addInitScript((selected) => {
    localStorage.setItem("danskTrainerReview", JSON.stringify(selected));
    localStorage.setItem("danskTrainerSelectedReview", JSON.stringify(selected));
  }, words);
}

// The browser asks Supabase for the selected words: answer with words that have no English
async function serveWordsWithoutEnglish(page) {
  await page.route("**/rest/v1/vocabulary*", (route) =>
    route.fulfill({
      contentType: "application/json",
      body: JSON.stringify(
        russianOnlyWords.map(({ id, term, russian }) => ({
          id,
          term,
          russian,
          english: null,
          definition_da: null,
        })),
      ),
    }),
  );
}

test.describe("training with no words selected", () => {
  for (const mode of [
    "true-false",
    "multiple-choice",
    "match-pairs",
    "definition-word",
    "fill-gap",
    "first-letter",
    "typed-gap",
    "build-sentence",
  ]) {
    test(mode, async ({ page }) => {
      await page.goto(`/review/train/${mode}`);

      await expect(
        page.getByRole("heading", { name: "No words selected" }),
      ).toBeVisible();
    });
  }
});

test.describe("training with words that have no English", () => {
  test("true/false starts with Russian", async ({ page }) => {
    await selectWords(page, russianOnlyWords);
    await serveWordsWithoutEnglish(page);
    await page.goto("/review/train/true-false");

    await expect(page.getByRole("button", { name: "RU", exact: true })).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    await expect(page.getByRole("button", { name: "EN", exact: true })).toHaveCount(0);
  });

  test("match pairs uses the Russian column", async ({ page }) => {
    await selectWords(page, russianOnlyWords);
    await serveWordsWithoutEnglish(page);
    await page.goto("/review/train/match-pairs");

    await expect(
      page.getByRole("heading", { name: "Russian" }),
    ).toBeVisible();

    await expect(page.getByRole("button", { name: "работа" })).toBeVisible();
  });
});

test.describe("review", () => {
  test("delete all asks first and keeps words when cancelled", async ({ page }) => {
    await selectWords(page, russianOnlyWords);
    await page.goto("/review");

    page.once("dialog", (dialog) => dialog.dismiss());
    await page.getByRole("button", { name: "Delete all" }).click();

    await expect(page.getByText("kollega")).toBeVisible();

    page.once("dialog", (dialog) => dialog.accept());
    await page.getByRole("button", { name: "Delete all" }).click();

    await expect(
      page.getByText("No words or phrases to review yet."),
    ).toBeVisible();
  });
});
