export function getLocalStorageItem(key: string, defaultValue: any) {
  if (typeof window === "undefined") return defaultValue;

  const item = localStorage.getItem(key);

  if (!item) return defaultValue;

  try {
    return JSON.parse(item);
  } catch {
    return defaultValue;
  }
}
