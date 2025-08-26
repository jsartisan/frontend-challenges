import { supabase } from "~/shared/api/supabase/client";

export async function deleteCompletion({ challenge_id, user_id }) {
  return supabase.from("completions").delete().eq("challenge_id", challenge_id).eq("user_id", user_id);
}
