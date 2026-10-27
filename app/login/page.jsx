import Link from "next/link";

import Button from "@/components/ui/Button/Button";

import {
  login,
  signup,
} from "./actions";

import styles from "./Login.module.css";

export default async function LoginPage({
  searchParams,
}) {
  const params = await searchParams;

  const isSignup =
    params?.mode === "signup";

  const error = params?.error;
  const message = params?.message;

  const showResend =
    params?.showResend === "true";

  return (
    <main className={styles.page}>
      <section className={styles.auth}>

        <header className={styles.header}>
          <h1>
            {isSignup
              ? "Opret en konto"
              : "Velkommen tilbage"}
          </h1>

          <p>
            {isSignup
              ? "Gem dine ord, og saml al din danskøvelse ét sted."
              : "Log ind for at fortsætte med at øve dansk."}
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

        {showResend && (
          <div className={styles.authHelpBlock}>
            <p>
              Har du brug for et nyt bekræftelseslink?
            </p>

            <Link
              href="/resend-confirmation"
              className={styles.authLink}
            >
              Send bekræftelsesmail igen
            </Link>
          </div>
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

          <div className={styles.field}>
            <label htmlFor="password">
              Adgangskode
            </label>

            <input
              id="password"
              name="password"
              type="password"
              autoComplete={
                isSignup
                  ? "new-password"
                  : "current-password"
              }
              minLength={8}
              required
            />

            {isSignup && (
              <span className={styles.hint}>
                At least 8 characters
              </span>
            )}

            {!isSignup && (
              <div className={styles.authHelp}>
                <Link
                  href="/forgot-password"
                  className={styles.authLink}
                >
                  Glemt adgangskode?
                </Link>
              </div>
            )}
          </div>

          <Button
            type="submit"
            fullWidth
            formAction={
              isSignup
                ? signup
                : login
            }
          >
            {isSignup
              ? "Opret konto"
              : "Log ind"}
          </Button>
        </form>

        <div className={styles.switch}>
          <span>
            {isSignup
              ? "Har du allerede en konto?"
              : "Ny på DanskKlar?"}
          </span>

          <Link
            href={
              isSignup
                ? "/login"
                : "/login?mode=signup"
            }
          >
            {isSignup
              ? "Log ind"
              : "Opret en konto"}
          </Link>
        </div>

        <div className={styles.divider}>
          <span>eller</span>
        </div>

        <Link
          href="/"
          className={styles.guest}
        >
          Fortsæt uden at logge ind
        </Link>
      </section>
    </main>
  );
}