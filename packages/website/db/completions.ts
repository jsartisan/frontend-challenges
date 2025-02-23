import { supabase } from "@/web/utils/supabase/client";

export async function createCompletion({ challenge_id, user_id }) {
  return supabase.from("completions").insert({
    challenge_id: challenge_id,
    user_id: user_id,
  });
}

export async function deleteCompletion({ challenge_id, user_id }) {
  return supabase.from("completions").delete().eq("challenge_id", challenge_id).eq("user_id", user_id);
}

export async function getCompletions({ user_id }) {
  return supabase.from("completions").select("*").eq("user_id", user_id);
}
