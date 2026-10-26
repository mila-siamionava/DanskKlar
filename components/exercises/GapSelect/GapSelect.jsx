"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import styles from "./GapSelect.module.css";

export default function GapSelect({
  question,
  value = "",
  checked = false,
  onChange,
  className = "",
}) {
  const [isOpen, setIsOpen] =
    useState(false);

  const [activeIndex, setActiveIndex] =
    useState(0);

  const [openUpward, setOpenUpward] =
    useState(false);

  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const optionRefs = useRef([]);

  const isCorrect =
    checked &&
    value === question.correctOptionId;

  const isWrong =
    checked &&
    value &&
    value !== question.correctOptionId;

  const selectedOption =
    question.options.find(
      (option) => option.id === value,
    );

  const classes = [
    styles.trigger,
    isCorrect ? styles.correct : "",
    isWrong ? styles.wrong : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        rootRef.current &&
        !rootRef.current.contains(
          event.target,
        )
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener(
      "pointerdown",
      handleOutsideClick,
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        handleOutsideClick,
      );
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const selectedIndex =
      question.options.findIndex(
        (option) =>
          option.id === value,
      );

    const nextIndex =
      selectedIndex >= 0
        ? selectedIndex
        : 0;

    setActiveIndex(nextIndex);

    requestAnimationFrame(() => {
      optionRefs.current[
        nextIndex
      ]?.focus();
    });
  }, [
    isOpen,
    question.options,
    value,
  ]);

  function openDropdown() {
    const rect =
      rootRef.current?.getBoundingClientRect();

    if (rect) {
      const spaceBelow =
        window.innerHeight -
        rect.bottom;

      const spaceAbove =
        rect.top;

      const estimatedDropdownHeight =
        Math.min(
          question.options.length * 52 +
            16,
          260,
        );

      const shouldOpenUpward =
        spaceBelow <
          estimatedDropdownHeight &&
        spaceAbove >
          spaceBelow;

      setOpenUpward(
        shouldOpenUpward,
      );
    }

    setIsOpen(true);
  }

  function closeDropdown({
    returnFocus = false,
  } = {}) {
    setIsOpen(false);

    if (returnFocus) {
      requestAnimationFrame(() => {
        triggerRef.current?.focus();
      });
    }
  }

  function toggleDropdown() {
    if (isOpen) {
      closeDropdown();
      return;
    }

    openDropdown();
  }

  function selectOption(option) {
    onChange?.(
      question.id,
      option.id,
    );

    closeDropdown({
      returnFocus: true,
    });
  }

  function handleTriggerKeyDown(event) {
    if (
      event.key === "Enter" ||
      event.key === " " ||
      event.key === "ArrowDown" ||
      event.key === "ArrowUp"
    ) {
      event.preventDefault();

      if (!isOpen) {
        openDropdown();
      }
    }

    if (
      event.key === "Escape" &&
      isOpen
    ) {
      event.preventDefault();

      closeDropdown({
        returnFocus: true,
      });
    }
  }

  function focusOption(index) {
    const count =
      question.options.length;

    if (!count) {
      return;
    }

    const nextIndex =
      (index + count) % count;

    setActiveIndex(nextIndex);

    optionRefs.current[
      nextIndex
    ]?.focus();
  }

  function handleOptionKeyDown(
    event,
    option,
    index,
  ) {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        focusOption(index + 1);
        break;

      case "ArrowUp":
        event.preventDefault();
        focusOption(index - 1);
        break;

      case "Home":
        event.preventDefault();
        focusOption(0);
        break;

      case "End":
        event.preventDefault();
        focusOption(
          question.options.length - 1,
        );
        break;

      case "Enter":
      case " ":
        event.preventDefault();
        selectOption(option);
        break;

      case "Escape":
        event.preventDefault();

        closeDropdown({
          returnFocus: true,
        });
        break;

      case "Tab":
        closeDropdown();
        break;

      default:
        break;
    }
  }

  return (
    <div
      ref={rootRef}
      className={styles.root}
    >
      <button
        ref={triggerRef}
        type="button"
        className={classes}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={`gap-options-${question.id}`}
        onClick={toggleDropdown}
        onKeyDown={
          handleTriggerKeyDown
        }
      >
        <span
          className={
            selectedOption
              ? styles.value
              : styles.placeholder
          }
        >
          {isCorrect && (
            <>
              <span aria-hidden="true">✓ </span>
              <span className="u-visually-hidden">
                Correct:
              </span>
            </>
          )}

          {isWrong && (
            <>
              <span aria-hidden="true">✕ </span>
              <span className="u-visually-hidden">
                Wrong:
              </span>
            </>
          )}

          {selectedOption
            ? selectedOption.text
            : `(${question.id}) Choose answer`}
        </span>

        <span
          className={`${styles.chevron} ${
            isOpen
              ? styles.chevronOpen
              : ""
          }`}
          aria-hidden="true"
        >
          ↓
        </span>
      </button>

      {isOpen && (
        <div
          id={`gap-options-${question.id}`}
          className={`${styles.dropdown} ${
            openUpward
              ? styles.dropdownUp
              : ""
          }`}
          role="listbox"
          aria-label={`Question ${question.id} answers`}
        >
          {question.options.map(
            (option, index) => {
              const isSelected =
                option.id === value;

              return (
                <button
                  key={option.id}
                  ref={(element) => {
                    optionRefs.current[
                      index
                    ] = element;
                  }}
                  type="button"
                  role="option"
                  aria-selected={
                    isSelected
                  }
                  tabIndex={
                    index === activeIndex
                      ? 0
                      : -1
                  }
                  className={`${styles.option} ${
                    isSelected
                      ? styles.selectedOption
                      : ""
                  }`}
                  onClick={() =>
                    selectOption(option)
                  }
                  onKeyDown={(event) =>
                    handleOptionKeyDown(
                      event,
                      option,
                      index,
                    )
                  }
                  onMouseEnter={() =>
                    setActiveIndex(index)
                  }
                >
                  {option.text}
                </button>
              );
            },
          )}
        </div>
      )}
    </div>
  );
}