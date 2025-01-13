import { STORAGE_KEY } from "@/shared";

export function useLocalStorage(path: string) {
  try {
    const files = localStorage.getItem(`${STORAGE_KEY}:${path}`);

    return JSON.parse(files);
  } catch {
    return {};
  }
}
