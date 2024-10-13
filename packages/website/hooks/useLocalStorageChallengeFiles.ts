export function useLocalStorageChallengeFiles(path: string) {
  try {
    const files = localStorage.getItem(path);
    return JSON.parse(files);
  } catch {
    return {};
  }
}
