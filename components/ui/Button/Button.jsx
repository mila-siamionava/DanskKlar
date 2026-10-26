import Link from "next/link";

import styles from "./Button.module.css";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  type = "button",
  onClick,
  formAction,
  href,
  ariaCurrent,
  className = "",
}) {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth
      ? styles.fullWidth
      : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        aria-current={ariaCurrent}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      formAction={formAction}
    >
      {children}
    </button>
  );
}