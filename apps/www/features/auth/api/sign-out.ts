import { authClient } from "~/shared/lib/auth/client";

export async function signOut() {
  await authClient.signOut();
}
