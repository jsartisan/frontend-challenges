"use server";

import { signOut as authSignOut } from "~/shared/lib/auth";

export async function signOut() {
  await authSignOut();
}
