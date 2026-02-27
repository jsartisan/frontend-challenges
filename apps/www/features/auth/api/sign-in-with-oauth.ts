"use server";

import { signIn } from "~/shared/lib/auth";

export async function signInWithOAuth(redirectTo?: string) {
  await signIn("github", { redirectTo: redirectTo || "/" });
}
