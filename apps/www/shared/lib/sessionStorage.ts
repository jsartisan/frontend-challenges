import { STORAGE_KEY } from "../config/storage";

export function getSessionStorageItem(key: string, defaultValue: any) {
  if (typeof window === "undefined") {
    return defaultValue;
  }

  const item = sessionStorage.getItem(`${STORAGE_KEY}:${key}`);

  if (!item) {
    return defaultValue;
  }

  try {
    return JSON.parse(item);
  } catch {
    return defaultValue;
  }
}

export function setSessionStorageItem(key: string, value: any) {
  if (typeof window === "undefined") return;

  sessionStorage.setItem(`${STORAGE_KEY}:${key}`, value);
}
