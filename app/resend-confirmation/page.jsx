import Link from "next/link";

import Button from "@/components/ui/Button/Button";

import {
  resendConfirmation,
} from "../login/actions";

import styles from "../login/Login.module.css";

export default async function ResendConfirmationPage({
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
            Resend confirmation email
          </h1>

          <p>
            Enter the email address you used
            when creating your account.
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
              Email
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
            formAction={resendConfirmation}
          >
            Resend confirmation email
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