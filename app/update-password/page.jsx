import Link from "next/link";

import Button from "@/components/ui/Button/Button";

import {
  updatePassword,
} from "../login/actions";

import styles from "../login/Login.module.css";

export default async function UpdatePasswordPage({
  searchParams,
}) {
  const params = await searchParams;

  const error = params?.error;

  return (
    <main className={styles.page}>
      <section className={styles.auth}>

        <header className={styles.header}>
          <h1>
            Choose a new password
          </h1>

          <p>
            Your new password must contain
            at least 8 characters.
          </p>
        </header>

        {error && (
          <p
            className={styles.error}
            role="alert"
          >
            {error}
          </p>
        )}

        <form className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="password">
              New password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
            />

            <span className={styles.hint}>
              At least 8 characters
            </span>
          </div>

          <div className={styles.field}>
            <label htmlFor="confirmPassword">
              Confirm new password
            </label>

            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
            />
          </div>

          <Button
            type="submit"
            fullWidth
            formAction={updatePassword}
          >
            Update password
          </Button>
        </form>

        <Link
          href="/login"
          className={styles.backLink}
        >
          Back to sign in
        </Link>
      </section>
    </main>
  );
}