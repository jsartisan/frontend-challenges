import { supabase } from "@/utils/supabase/client";

/**
 * Mark a challenge as completed
 *
 * @param param0
 * @returns
 */
export async function createCompletion({ challenge_id, user_id }) {
  return supabase.from("completions").insert({
    challenge_id: challenge_id,
    user_id: user_id,
  });
}

/**
 * Mark a challenge as incomplete
 *
 * @param {number} challenge_no
 * @param {string} user_id
 * @returns
 */
export async function deleteCompletion({ challenge_id, user_id }) {
  return supabase.from("completions").delete().eq("challenge_id", challenge_id).eq("user_id", user_id);
}

/**
 * Get all completed challenges for a user
 *
 * @param user_id
 * @returns
 */
export async function getCompletions({ user_id }) {
  return supabase.from("completions").select("*").eq("user_id", user_id);
}
