import { supabase } from "~/shared/api/supabase/client";

export async function createCompletion({ challenge_id, user_id }) {
  return supabase.from("completions").insert({
    challenge_id: challenge_id,
    user_id: user_id,
  });
}
