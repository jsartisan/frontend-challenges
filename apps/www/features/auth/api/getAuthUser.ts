import { supabase } from "~/shared/api/supabase/client";

export async function getAuthUser() {
  const session = await supabase.auth.getSession();

  if (!session.data.session) return Promise.resolve(null);

  const userData = await supabase.auth.getUser();

  if (!userData.data.user) return Promise.resolve(null);

  return supabase.from("profiles").select("*").eq("id", userData.data.user.id);
}
