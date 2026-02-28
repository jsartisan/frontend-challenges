"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { auth } from "~/shared/lib/auth";

export async function signInWithOAuth(redirectTo?: string) {
  const result = await auth.api.signInSocial({
    body: {
      provider: "github",
      callbackURL: redirectTo || "/",
    },
    headers: await headers(),
  });

  if (result.redirect && result.url) {
    redirect(result.url);
  }
}
