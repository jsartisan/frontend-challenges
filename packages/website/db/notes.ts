import { supabase } from "@/web/utils/supabase/client";

export async function createNote({ path, user_id, content }) {
  return supabase.from("notes").insert({
    path,
    user_id,
    content,
  });
}

export async function getNote({ user_id, path }) {
  return supabase.from("notes").select("*").eq("user_id", user_id).eq("path", path).limit(1).single();
}

export async function updateNote({ user_id, path, content }) {
  return supabase.from("notes").upsert({ path, content, user_id }).eq("user_id", user_id).eq("path", path);
}

export async function deleteNote({ path, user_id }) {
  return supabase.from("notes").delete().eq("path", path).eq("user_id", user_id);
}
