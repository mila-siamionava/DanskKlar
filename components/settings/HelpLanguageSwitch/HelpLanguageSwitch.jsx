"use client";

import { Check } from "lucide-react";

import {
  helpLanguages,
  setHelpLanguage,
  useHelpLanguage,
} from "@/lib/preferences/helpLanguage";

import styles from "@/components/theme/PaletteSwitch/PaletteSwitch.module.css";
import own from "./HelpLanguageSwitch.module.css";

// same look as the palette switch, so the account menu stays calm
export default function HelpLanguageSwitch() {
  const language = useHelpLanguage();

  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>Hjælpesprog</legend>

      <p className={own.hint}>
        Vis instruktioner og regler også på dit eget sprog.
      </p>

      <div className={styles.options}>
        {helpLanguages.map((option) => {
          const isSelected = option.id === language;

          return (
            <label
              key={option.id || "da"}
              className={[
                styles.option,
                isSelected ? styles.optionSelected : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <input
                type="radio"
                name="help-language"
                value={option.id}
                checked={isSelected}
                onChange={() => setHelpLanguage(option.id)}
                className={styles.input}
              />

              <span
                className={styles.name}
                lang={option.id || "da"}
              >
                {option.name}
              </span>

              {isSelected && (
                <Check
                  className={styles.check}
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              )}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
