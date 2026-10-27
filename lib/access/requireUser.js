import "server-only";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

// For pages that are only for signed-in learners
export async function requireUser() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getClaims();

  const user = data?.claims ?? null;

  if (!user?.sub) {
    redirect("/login");
  }

  return user;
}
