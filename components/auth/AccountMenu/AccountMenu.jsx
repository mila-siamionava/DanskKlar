"use client";

import { useEffect, useRef, useState } from "react";
import { LogOut, UserRound } from "lucide-react";

import ThemeToggle from "@/components/theme/ThemeToggle/ThemeToggle";

import styles from "./AccountMenu.module.css";

export default function AccountMenu({ email }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside,
    );

    document.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );

      document.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, []);

  return (
    <div
      className={styles.accountMenu}
      ref={menuRef}
    >
      <button
        type="button"
        className={styles.accountButton}
        aria-label={
          isOpen
            ? "Luk kontomenu"
            : "Åbn kontomenu"
        }
        aria-expanded={isOpen}
        onClick={() =>
          setIsOpen((current) => !current)
        }
      >
        <UserRound
          size={20}
          strokeWidth={1.8}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div className={styles.accountDropdown}>
          <div className={styles.accountInfo}>
            <span className={styles.accountLabel}>
              Logget ind som
            </span>

            <span className={styles.accountEmail}>
              {email}
            </span>
          </div>

          <div className={styles.accountDivider} />

          <ThemeToggle />

          <div className={styles.accountDivider} />

          <form
            action="/auth/signout"
            method="post"
          >
            <button
              type="submit"
              className={styles.menuItem}
            >
              <LogOut
                size={17}
                strokeWidth={1.7}
                aria-hidden="true"
              />

              Log ud
            </button>
          </form>
        </div>
      )}
    </div>
  );
}