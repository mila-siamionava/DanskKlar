import { readFileSync } from "node:fs";

/*
  Checks WCAG contrast of design tokens for every palette,
  in light and dark appearance.
  Text needs 4.5:1, focus rings and control borders need 3:1.
  Run: npm run check:contrast
*/

const css = readFileSync(
  new URL("../styles/base/_variables.css", import.meta.url),
  "utf8",
).replace(/\/\*[\s\S]*?\*\//g, "");

function getTokens(block) {
  const tokens = {};

  for (const [, name, value] of block.matchAll(
    /(--[\w-]+)\s*:\s*([^;]+);/g,
  )) {
    tokens[name] = value.trim();
  }

  return tokens;
}

// every top-level rule: its attribute conditions and its tokens
const rules = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map(
  ([, selector, body]) => ({
    conditions: Object.fromEntries(
      [...selector.matchAll(/\[([\w-]+)="([\w-]+)"\]/g)].map(
        ([, attribute, value]) => [attribute, value],
      ),
    ),
    tokens: getTokens(body),
  }),
);

const palettes = [
  ...new Set(
    rules.map((rule) => rule.conditions["data-theme"]).filter(Boolean),
  ),
];

function tokensFor(theme, appearance) {
  const attributes = {
    "data-theme": theme,
    "data-appearance": appearance,
  };

  // more specific selectors win; source order breaks ties
  return rules
    .filter((rule) =>
      Object.entries(rule.conditions).every(
        ([attribute, value]) => attributes[attribute] === value,
      ),
    )
    .map((rule, index) => ({ ...rule, index }))
    .sort(
      (a, b) =>
        Object.keys(a.conditions).length -
          Object.keys(b.conditions).length || a.index - b.index,
    )
    .reduce((tokens, rule) => ({ ...tokens, ...rule.tokens }), {});
}

const themes = Object.fromEntries(
  palettes.flatMap((theme) =>
    ["light", "dark"].map((appearance) => [
      `${theme} / ${appearance}`,
      tokensFor(theme, appearance),
    ]),
  ),
);

function resolve(tokens, name) {
  let value = tokens[name];

  while (value?.startsWith("var(")) {
    value = tokens[value.slice(4, -1).trim()];
  }

  return value;
}

function luminance(hex) {
  const channels = hex
    .replace("#", "")
    .match(/.{2}/g)
    .map((channel) => parseInt(channel, 16) / 255)
    .map((channel) =>
      channel <= 0.03928
        ? channel / 12.92
        : ((channel + 0.055) / 1.055) ** 2.4,
    );

  return (
    0.2126 * channels[0] +
    0.7152 * channels[1] +
    0.0722 * channels[2]
  );
}

function contrast(first, second) {
  const [lighter, darker] = [
    luminance(first),
    luminance(second),
  ].sort((a, b) => b - a);

  return (lighter + 0.05) / (darker + 0.05);
}

const TEXT = 4.5;
const UI = 3;

const backgrounds = [
  "--color-background-page",
  "--color-background-surface",
  "--color-background-soft",
];

const pairs = [
  ...[
    "--color-text-primary",
    "--color-text-secondary",
    "--color-text-muted",
    "--color-text-accent",
    "--color-success",
    "--color-error",
    "--color-warning",
  ].flatMap((text) =>
    backgrounds.map((background) => [text, background, TEXT]),
  ),

  ["--color-success", "--color-success-background", TEXT],
  ["--color-error", "--color-error-background", TEXT],
  ["--color-warning", "--color-warning-background", TEXT],
  ["--color-text-on-accent", "--color-accent", TEXT],
  ["--color-text-on-accent", "--color-accent-hover", TEXT],

  ...[
    "--color-focus",
    "--color-border-control",
  ].flatMap((ui) =>
    backgrounds.map((background) => [ui, background, UI]),
  ),
];

let failures = 0;

for (const [themeName, tokens] of Object.entries(themes)) {
  console.log(`\n${themeName}`);

  for (const [foreground, background, minimum] of pairs) {
    const ratio = contrast(
      resolve(tokens, foreground),
      resolve(tokens, background),
    );

    const passed = ratio >= minimum;

    if (!passed) {
      failures += 1;
    }

    console.log(
      `${passed ? "  ok  " : "  FAIL"} ${ratio.toFixed(2)}  ${foreground} on ${background}`,
    );
  }
}

if (failures > 0) {
  console.log(`\n${failures} pair(s) below WCAG AA`);
  process.exit(1);
}

console.log("\nall pairs pass WCAG AA");
