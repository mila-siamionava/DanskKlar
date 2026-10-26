import styles from "./FilterChip.module.css";

export default function FilterChip({
  children,
  active = false,
  onClick,
}) {
  return (
    <button
      type="button"
      className={`${styles.chip} ${
        active ? styles.active : ""
      }`}
      aria-pressed={active}
      onClick={onClick}
    >
      {children}
    </button>
  );
}