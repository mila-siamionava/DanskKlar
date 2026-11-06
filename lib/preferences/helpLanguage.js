/*
  The learner's help language: a translation shown under Danish
  instructions and rules. Danish always stays on the page.
  Saved in localStorage, so it lasts on this device.

  const language = useHelpLanguage();   // "" | "en" | "ru"
*/

import { useSyncExternalStore } from "react";

export const HELP_LANGUAGE_KEY = "danskklar-help-language";

const CHANGE_EVENT = "danskklar-help-language";

export const helpLanguages = [
  { id: "", name: "Kun dansk", label: "" },
  { id: "en", name: "English", label: "EN" },
  { id: "ru", name: "Русский", label: "RU" },
];

function isHelpLanguage(value) {
  return helpLanguages.some((language) => language.id === value);
}

export function getHelpLanguage() {
  try {
    const saved = localStorage.getItem(HELP_LANGUAGE_KEY) ?? "";

    return isHelpLanguage(saved) ? saved : "";
  } catch {
    return "";
  }
}

export function setHelpLanguage(language) {
  try {
    localStorage.setItem(HELP_LANGUAGE_KEY, language);
  } catch {
    // storage blocked: nothing to remember
  }

  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(onChange) {
  window.addEventListener(CHANGE_EVENT, onChange);

  // another tab changed it
  window.addEventListener("storage", onChange);

  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

// on the server and in the first render: Danish only
export function useHelpLanguage() {
  return useSyncExternalStore(subscribe, getHelpLanguage, () => "");
}
