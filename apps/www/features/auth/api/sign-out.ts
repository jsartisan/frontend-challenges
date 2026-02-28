"use server";

import { headers } from "next/headers";

import { auth } from "~/shared/lib/auth";

export async function signOut() {
  await auth.api.signOut({
    headers: await headers(),
  });
}
