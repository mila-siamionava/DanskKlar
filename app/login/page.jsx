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
              ? "Create your account"
              : "Welcome back"}
          </h1>

          <p>
            {isSignup
              ? "Save your words and keep your Danish practice in one place."
              : "Sign in to continue your Danish practice."}
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
              Need a new confirmation link?
            </p>

            <Link
              href="/resend-confirmation"
              className={styles.authLink}
            >
              Resend confirmation email
            </Link>
          </div>
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

          <div className={styles.field}>
            <label htmlFor="password">
              Password
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
                  Forgot password?
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
              ? "Create account"
              : "Sign in"}
          </Button>
        </form>

        <div className={styles.switch}>
          <span>
            {isSignup
              ? "Already have an account?"
              : "New to DanskKlar?"}
          </span>

          <Link
            href={
              isSignup
                ? "/login"
                : "/login?mode=signup"
            }
          >
            {isSignup
              ? "Sign in"
              : "Create an account"}
          </Link>
        </div>

        <div className={styles.divider}>
          <span>or</span>
        </div>

        <Link
          href="/"
          className={styles.guest}
        >
          Continue without signing in
        </Link>
      </section>
    </main>
  );
}