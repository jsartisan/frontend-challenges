"use server";

import { eq, and } from "drizzle-orm";

import { db } from "~/shared/lib/db";
import { completions } from "~/shared/lib/db/schema";

export async function deleteCompletion({
  challenge_id,
  user_id,
}: {
  challenge_id: number;
  user_id: string;
}) {
  await db
    .delete(completions)
    .where(
      and(
        eq(completions.challengeId, challenge_id),
        eq(completions.userId, user_id)
      )
    );

  return { success: true };
}
