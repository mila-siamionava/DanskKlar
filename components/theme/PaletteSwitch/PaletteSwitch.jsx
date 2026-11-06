"use client";

import { useState } from "react";
import { Check } from "lucide-react";

import {
  DEFAULT_PALETTE,
  applyPalette,
  isPalette,
  palettes,
} from "@/lib/theme/preferences";

import styles from "./PaletteSwitch.module.css";

export default function PaletteSwitch() {
  // only rendered inside the open account menu, so document exists;
  // the head script has already applied the saved palette
  const [palette, setPalette] = useState(() => {
    const current =
      typeof document !== "undefined" &&
      document.documentElement.dataset.theme;

    return isPalette(current) ? current : DEFAULT_PALETTE;
  });

  function handleChange(event) {
    const nextPalette = event.target.value;

    setPalette(nextPalette);
    applyPalette(nextPalette);
  }

  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>Farvepalet</legend>

      <div className={styles.options}>
        {palettes.map((option) => {
          const isSelected = option.id === palette;

          return (
            <label
              key={option.id}
              className={[
                styles.option,
                isSelected ? styles.optionSelected : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <input
                type="radio"
                name="palette"
                value={option.id}
                checked={isSelected}
                onChange={handleChange}
                className={styles.input}
              />

              <span
                className={styles.swatches}
                aria-hidden="true"
              >
                {option.swatches.map((color) => (
                  <span
                    key={color}
                    className={styles.swatch}
                    style={{ background: color }}
                  />
                ))}
              </span>

              <span className={styles.name}>{option.name}</span>

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
