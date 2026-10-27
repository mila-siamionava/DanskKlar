"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

function getSiteUrl() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL;

  if (!siteUrl) {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL is not configured",
    );
  }

  return siteUrl.replace(/\/$/, "");
}

export async function login(formData) {
  const supabase = await createClient();

  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    redirect(
      "/login?error=Email and password are required.",
    );
  }

  const { error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (error) {
    redirect(
      `/login?error=${encodeURIComponent(
        error.message,
      )}`,
    );
  }

  revalidatePath("/", "layout");

  redirect("/");
}

export async function signup(formData) {
  const supabase = await createClient();

  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    redirect(
      "/login?mode=signup&error=Email and password are required.",
    );
  }

  if (password.length < 8) {
    redirect(
      "/login?mode=signup&error=Password must be at least 8 characters.",
    );
  }

  const siteUrl = getSiteUrl();

  const { data, error } =
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo:
          `${siteUrl}/auth/confirm`,
      },
    });

  if (error) {
    redirect(
      `/login?mode=signup&error=${encodeURIComponent(
        error.message,
      )}`,
    );
  }

  // email confirmation is off, so the new user is already signed in
  if (data.session) {
    revalidatePath("/", "layout");

    redirect("/");
  }

  redirect(
    "/login?message=Account created. You can sign in now.",
  );
}

export async function resendConfirmation(
  formData,
) {
  const supabase = await createClient();

  const email = formData.get("email");

  if (!email) {
    redirect(
      "/resend-confirmation?error=Email is required.",
    );
  }

  const siteUrl = getSiteUrl();

  const { error } =
    await supabase.auth.resend({
      type: "signup",
      email,
      options: {
        emailRedirectTo:
          `${siteUrl}/auth/confirm`,
      },
    });

  if (error) {
    redirect(
      `/resend-confirmation?error=${encodeURIComponent(
        error.message,
      )}`,
    );
  }

  redirect(
    "/resend-confirmation?message=If this email belongs to an unconfirmed account, a new confirmation email has been sent.",
  );
}

export async function requestPasswordReset(
  formData,
) {
  const supabase = await createClient();

  const email = formData.get("email");

  if (!email) {
    redirect(
      "/forgot-password?error=Email is required.",
    );
  }

  const siteUrl = getSiteUrl();

  const { error } =
    await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo:
          `${siteUrl}/auth/confirm?next=/update-password`,
      },
    );

  if (error) {
    redirect(
      `/forgot-password?error=${encodeURIComponent(
        error.message,
      )}`,
    );
  }

  redirect(
    "/forgot-password?message=If an account exists for this email, a password reset link has been sent.",
  );
}

export async function updatePassword(
  formData,
) {
  const supabase = await createClient();

  const password =
    formData.get("password");

  const confirmPassword =
    formData.get("confirmPassword");

  if (!password || !confirmPassword) {
    redirect(
      "/update-password?error=Both password fields are required.",
    );
  }

  if (password.length < 8) {
    redirect(
      "/update-password?error=Password must be at least 8 characters.",
    );
  }

  if (password !== confirmPassword) {
    redirect(
      "/update-password?error=Passwords do not match.",
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(
      "/login?error=Your password reset link is invalid or has expired. Please request a new one.",
    );
  }

  const { error } =
    await supabase.auth.updateUser({
      password,
    });

  if (error) {
    redirect(
      `/update-password?error=${encodeURIComponent(
        error.message,
      )}`,
    );
  }

  await supabase.auth.signOut();

  redirect(
    "/login?message=Your password has been updated. You can sign in with your new password.",
  );
}