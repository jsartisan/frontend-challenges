import { STORAGE_KEY } from "@/shared";

export function getLocalStorageItem(key: string, defaultValue: any) {
  if (typeof window === "undefined") return defaultValue;

  const item = localStorage.getItem(`${STORAGE_KEY}:${key}`);

  if (!item) return defaultValue;

  try {
    return JSON.parse(item);
  } catch {
    return defaultValue;
  }
}

export function setLocalStorageItem(key: string, value: any) {
  if (typeof window === "undefined") return;

  localStorage.setItem(`${STORAGE_KEY}:${key}`, JSON.stringify(value));
}

export function removeLocalStorageItem(key: string) {
  if (typeof window === "undefined") return;

  localStorage.removeItem(`${STORAGE_KEY}:${key}`);
}
