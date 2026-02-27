"use server";

import { db } from "~/shared/lib/db";
import { completions } from "~/shared/lib/db/schema";

export async function createCompletion({
  challenge_id,
  user_id,
}: {
  challenge_id: number;
  user_id: string;
}) {
  await db.insert(completions).values({
    challengeId: challenge_id,
    userId: user_id,
  });

  return { success: true };
}
