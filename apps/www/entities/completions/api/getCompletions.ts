import { supabase } from "~/shared/api/supabase/client";

export async function getCompletions({ user_id }) {
  return supabase.from("completions").select("*").eq("user_id", user_id);
}
