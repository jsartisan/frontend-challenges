import { authClient } from "~/shared/lib/auth/client";

export async function signInWithOAuth(redirectTo?: string) {
  await authClient.signIn.social({
    provider: "github",
    callbackURL: redirectTo || "/",
  });
}
