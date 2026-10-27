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
      `/login?error=${encodeURIComponent(
        "Skriv både e-mail og adgangskode.",
      )}`,
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
      `/login?mode=signup&error=${encodeURIComponent(
        "Skriv både e-mail og adgangskode.",
      )}`,
    );
  }

  if (password.length < 8) {
    redirect(
      `/login?mode=signup&error=${encodeURIComponent(
        "Adgangskoden skal have mindst 8 tegn.",
      )}`,
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
    `/login?message=${encodeURIComponent(
        "Din konto er oprettet. Du kan logge ind nu.",
      )}`,
  );
}

export async function resendConfirmation(
  formData,
) {
  const supabase = await createClient();

  const email = formData.get("email");

  if (!email) {
    redirect(
      `/resend-confirmation?error=${encodeURIComponent(
        "Skriv din e-mail.",
      )}`,
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
    `/resend-confirmation?message=${encodeURIComponent(
        "Hvis e-mailen hører til en konto, der ikke er bekræftet, har vi sendt en ny bekræftelsesmail.",
      )}`,
  );
}

export async function requestPasswordReset(
  formData,
) {
  const supabase = await createClient();

  const email = formData.get("email");

  if (!email) {
    redirect(
      `/forgot-password?error=${encodeURIComponent(
        "Skriv din e-mail.",
      )}`,
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
    `/forgot-password?message=${encodeURIComponent(
        "Hvis der findes en konto med denne e-mail, har vi sendt et link til en ny adgangskode.",
      )}`,
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
      `/update-password?error=${encodeURIComponent(
        "Udfyld begge felter med adgangskode.",
      )}`,
    );
  }

  if (password.length < 8) {
    redirect(
      `/update-password?error=${encodeURIComponent(
        "Adgangskoden skal have mindst 8 tegn.",
      )}`,
    );
  }

  if (password !== confirmPassword) {
    redirect(
      `/update-password?error=${encodeURIComponent(
        "Adgangskoderne er ikke ens.",
      )}`,
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(
      `/login?error=${encodeURIComponent(
        "Linket til ny adgangskode er ugyldigt eller udløbet. Bestil et nyt.",
      )}`,
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
    `/login?message=${encodeURIComponent(
        "Din adgangskode er ændret. Du kan logge ind med den nye adgangskode.",
      )}`,
  );
}