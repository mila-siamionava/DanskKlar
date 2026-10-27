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
            Vælg en ny adgangskode
          </h1>

          <p>
            Din nye adgangskode skal
            have mindst 8 tegn.
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
              Ny adgangskode
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
              Gentag ny adgangskode
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
            Gem ny adgangskode
          </Button>
        </form>

        <Link
          href="/login"
          className={styles.backLink}
        >
          Tilbage til log ind
        </Link>
      </section>
    </main>
  );
}