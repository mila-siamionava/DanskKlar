import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const selectedWords = [
  {
    id: "v1",
    vocabularyId: "v1",
    term: "arbejdsløshed",
    exerciseTitle: "Jobskifte",
  },
  {
    id: "v2",
    vocabularyId: "v2",
    term: "ansøgning",
    exerciseTitle: "Jobskifte",
  },
  {
    id: "v3",
    vocabularyId: "v3",
    term: "kollega",
    exerciseTitle: "Jobskifte",
  },
];

// Review and training pages read the saved words from localStorage
async function saveWords(page) {
  await page.addInitScript((words) => {
    localStorage.setItem("danskTrainerReview", JSON.stringify(words));
    localStorage.setItem("danskTrainerSelectedReview", JSON.stringify(words));
  }, selectedWords);
}

async function setAppearance(page, appearance) {
  await page.evaluate((value) => {
    document.documentElement.dataset.appearance = value;
  }, appearance);
}

const pages = [
  "/",
  "/login",
  "/login?mode=signup",
  "/forgot-password",
  "/reading",
  "/topics",
  "/topics/arbejde",
  "/topics/arbejde/vocabulary",
  "/exercises",
  "/exercises/jobskifte",
  "/review",
  "/review/train",
  "/review/train/flashcards",
  "/review/train/match-pairs",
  "/review/train/true-false",
  "/review/train/multiple-choice",
  "/review/train/definition-word",
  "/review/train/fill-gap",
  "/review/train/first-letter",
  "/review/train/typed-gap",
  "/review/train/build-sentence",
];

test.describe("axe: no WCAG A/AA violations", () => {
  for (const appearance of ["light", "dark"]) {
    for (const path of pages) {
      test(`${path} (${appearance})`, async ({ page }) => {
        await saveWords(page);
        await page.goto(path);
        await page.waitForLoadState("networkidle");
        await setAppearance(page, appearance);

        const results = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
          .analyze();

        const violations = results.violations.map(
          (violation) =>
            `${violation.id}: ${violation.help} → ${violation.nodes
              .map((node) => node.target.join(" "))
              .join(", ")}`,
        );

        expect(violations).toEqual([]);
      });
    }
  }
});

test.describe("keyboard", () => {
  test("first Tab goes to skip link", async ({ page }) => {
    await page.goto("/topics");
    await page.keyboard.press("Tab");

    await expect(
      page.getByRole("link", { name: "Skip to content" }),
    ).toBeFocused();
  });

  test("gap select works with keyboard", async ({ page }) => {
    await page.goto("/exercises/jobskifte");

    // the name changes after answering, so find the gap by its listbox id
    const firstGap = page.locator('[aria-controls="gap-options-1"]');

    await firstGap.focus();
    await page.keyboard.press("Enter");

    await expect(page.getByRole("listbox")).toBeVisible();

    // focus moves to the first option a moment after opening
    await expect(page.getByRole("option").first()).toBeFocused();

    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");

    await expect(page.getByRole("listbox")).toBeHidden();
    await expect(firstGap).toBeFocused();
    await expect(firstGap).toHaveText(/(Correct|Wrong):/);
  });

  test("flashcard flips with keyboard and moves focus", async ({ page }) => {
    await saveWords(page);
    await page.goto("/review/train/flashcards");

    await page.getByRole("button", { name: "Tap to reveal" }).focus();
    await page.keyboard.press("Enter");

    await expect(
      page.getByRole("button", { name: "Tap to turn back" }),
    ).toBeFocused();

    // hidden front side is inert, so it can't be reached
    const revealIsInert = await page
      .getByRole("button", { name: "Tap to reveal", includeHidden: true })
      .evaluate((element) => element.closest("[inert]") !== null);

    expect(revealIsInert).toBe(true);
  });
});

test.describe("reduced motion", () => {
  test("transitions are turned off", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();

    await page.goto("http://localhost:3100/topics");

    const duration = await page
      .getByRole("link", { name: "Back to home" })
      .evaluate((element) => getComputedStyle(element).transitionDuration);

    expect(parseFloat(duration)).toBeLessThan(0.01);

    await context.close();
  });
});

test.describe("fonts", () => {
  async function getLoadedFamilies(page) {
    return page.evaluate(() =>
      [...document.fonts]
        .filter((font) => font.status === "loaded")
        .map((font) => font.family),
    );
  }

  test("Danish page does not load Arabic or Farsi fonts", async ({ page }) => {
    await page.goto("/topics");
    await page.waitForLoadState("networkidle");

    const families = await getLoadedFamilies(page);

    expect(families.join(" ")).not.toMatch(/Arabic|Vazirmatn/);
  });

  for (const [lang, sample, family] of [
    ["ar", "اقرأ النص واختر الكلمة الصحيحة", /Noto Sans Arabic/],
    ["fa", "متن را بخوانید و کلمه درست را انتخاب کنید", /Vazirmatn/],
  ]) {
    test(`text with lang="${lang}" loads its font`, async ({ page }) => {
      await page.goto("/topics");

      await page.evaluate(
        ([lang, sample]) => {
          const paragraph = document.createElement("p");
          paragraph.lang = lang;
          paragraph.dir = "rtl";
          paragraph.textContent = sample;
          document.querySelector("main").append(paragraph);
        },
        [lang, sample],
      );

      await expect
        .poll(async () => (await getLoadedFamilies(page)).join(" "))
        .toMatch(family);
    });
  }
});
