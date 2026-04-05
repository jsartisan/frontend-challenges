const STORAGE_KEY = "fc-completions";

export async function createCompletion({
  challenge_id,
}: {
  challenge_id: number;
  user_id?: string;
}) {
  if (typeof window === "undefined") return { success: false };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const ids: number[] = raw ? JSON.parse(raw) : [];
    if (!ids.includes(challenge_id)) {
      ids.push(challenge_id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    }
  } catch {}
  return { success: true };
}
