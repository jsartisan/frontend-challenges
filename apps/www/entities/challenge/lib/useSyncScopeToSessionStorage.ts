"use client";

import { useEffect } from "react";

import { STORAGE_KEY } from "~/shared/config/storage";

/**
 * Sync the scope to session storage.
 *
 * This allows the scope to be used on the challenges page. The scope acts
 * as a context for both the challenge list page and individual challenge pages.
 * For example, if you navigate to React challenges, the scope will be "react".
 * When you then navigate to a specific challenge, the scope remains "react",
 * ensuring that the challenge list displays only React challenges.
 *
 * @param scope
 */
export function useSyncScopeToSessionStorage(scope: string) {
  useEffect(() => {
    sessionStorage.setItem(`${STORAGE_KEY}:scope`, scope);
  }, [scope]);
}
