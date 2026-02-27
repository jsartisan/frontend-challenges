"use server";

import { eq } from "drizzle-orm";

import { db } from "~/shared/lib/db";
import { completions } from "~/shared/lib/db/schema";

export async function getCompletions({ user_id }: { user_id: string }) {
  const data = await db
    .select()
    .from(completions)
    .where(eq(completions.userId, user_id));

  return { data };
}
