"use client";

import { useEffect, useRef } from "react";
import { useQueryState, type UseQueryStateOptions, type UseQueryStateReturn } from "nuqs";

import { getSessionStorageItem, setSessionStorageItem } from "~/shared/lib/sessionStorage";

/**
 * A wrapper around nuqs useQueryState that syncs with sessionStorage.
 * - On mount: if URL has no value, reads from sessionStorage
 * - On change: updates both URL and sessionStorage
 */
export function useSessionSyncedQueryState<T>(
  key: string,
  options: UseQueryStateOptions<T> & { defaultValue: T },
): UseQueryStateReturn<T, T> {
  const [value, setValue] = useQueryState(key, options);
  const initialized = useRef(false);

  // On mount, sync from sessionStorage if URL doesn't have this param
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has(key)) {
      const sessionValue = getSessionStorageItem(key, null);
      if (sessionValue !== null) {
        setValue(sessionValue);
      }
    }
  }, [key, setValue]);

  // Wrap setValue to also update sessionStorage
  const setValueWithSync = ((newValue: unknown) => {
    const result = setValue(newValue as Parameters<typeof setValue>[0]);

    // Get the actual value to store
    if (typeof newValue === "function") {
      // For functional updates, we need to compute the new value
      const computed = (newValue as (prev: T) => T)(value as T);
      setSessionStorageItem(key, JSON.stringify(computed));
    } else if (newValue === null) {
      setSessionStorageItem(key, JSON.stringify(options.defaultValue));
    } else {
      setSessionStorageItem(key, JSON.stringify(newValue));
    }

    return result;
  }) as typeof setValue;

  return [value, setValueWithSync] as UseQueryStateReturn<T, T>;
}
