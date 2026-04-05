const STORAGE_KEY = "fc-completions";

function readCompletions(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function getCompletions() {
  return { data: readCompletions().map((id) => ({ challengeId: id })) };
}
