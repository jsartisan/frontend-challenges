const STORAGE_KEY = "fc-completions";

export async function deleteCompletion({
  challenge_id,
}: {
  challenge_id: number;
  user_id?: string;
}) {
  if (typeof window === "undefined") return { success: false };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const ids: number[] = raw ? JSON.parse(raw) : [];
    const filtered = ids.filter((id) => id !== challenge_id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch {}
  return { success: true };
}
