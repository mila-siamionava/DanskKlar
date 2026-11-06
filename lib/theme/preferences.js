/*
  Colour preferences, saved in localStorage and applied to <html>.
  data-theme = palette, data-appearance = light or dark.
*/

export const PALETTE_KEY = "danskklar-palette";
export const APPEARANCE_KEY = "danskklar-appearance";

export const DEFAULT_PALETTE = "warm";

export const palettes = [
  {
    id: "warm",
    name: "Varm",
    swatches: ["#f7f4ee", "#d8c7a6", "#856a40"],
  },
  {
    id: "nordic",
    name: "Nordisk blå",
    swatches: ["#eef2f6", "#b9cde0", "#2f5577"],
  },
  {
    id: "sage",
    name: "Salvie",
    swatches: ["#f1f3ec", "#c5d3b5", "#4b6641"],
  },
  {
    id: "clay",
    name: "Terrakotta",
    swatches: ["#f8f1ec", "#e6b9a2", "#964c30"],
  },
];

export function isPalette(value) {
  return palettes.some((palette) => palette.id === value);
}

function save(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // storage blocked: the choice lasts until reload
  }
}

export function applyPalette(palette) {
  document.documentElement.dataset.theme = palette;
  save(PALETTE_KEY, palette);
}

export function applyAppearance(appearance) {
  document.documentElement.dataset.appearance = appearance;
  save(APPEARANCE_KEY, appearance);
}

/*
  Runs in <head> before the page paints, so a saved palette
  or dark appearance shows without a flash of the default.
*/
export const restorePreferencesScript = `(function () {
  try {
    var root = document.documentElement;
    var palette = localStorage.getItem("${PALETTE_KEY}");
    var appearance = localStorage.getItem("${APPEARANCE_KEY}");
    if (${JSON.stringify(palettes.map((palette) => palette.id))}.indexOf(palette) !== -1) {
      root.dataset.theme = palette;
    }
    if (appearance === "dark" || appearance === "light") {
      root.dataset.appearance = appearance;
    }
  } catch (error) {}
})();`;
