import { STORAGE_KEY } from "@frontend-challenges/shared";
import { useEffect } from "react";

export function useSyncScopeToSessionStorage(scope: string) {
  useEffect(() => {
    sessionStorage.setItem(`${STORAGE_KEY}:scope`, scope);
  }, [scope]);
}
