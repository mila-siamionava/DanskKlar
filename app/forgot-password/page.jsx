import Link from "next/link";

import Button from "@/components/ui/Button/Button";

import {
  requestPasswordReset,
} from "../login/actions";

import styles from "../login/Login.module.css";

export default async function ForgotPasswordPage({
  searchParams,
}) {
  const params = await searchParams;

  const error = params?.error;
  const message = params?.message;

  return (
    <main className={styles.page}>
      <section className={styles.auth}>

        <header className={styles.header}>
          <h1>
            Nulstil din adgangskode
          </h1>

          <p>
            Skriv din e-mailadresse, så
            sender vi dig et link til en
            ny adgangskode.
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

        {message && (
          <p
            className={styles.message}
            role="status"
          >
            {message}
          </p>
        )}

        <form className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="email">
              E-mail
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
          </div>

          <Button
            type="submit"
            fullWidth
            formAction={requestPasswordReset}
          >
            Send link til ny adgangskode
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