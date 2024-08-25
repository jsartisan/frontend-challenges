import { useEffect } from "react";
import { STORAGE_KEY } from "@frontend-challenges/shared";

import { ChallengeFilterState } from "./useFilteredChallenges";
import { getSessionStorageItem } from "../utils/sessionStorage";

export function useInitializeFilters(scope: string, filters: Partial<ChallengeFilterState>, dispatch: any) {
  useEffect(() => {
    const category = getSessionStorageItem(`${STORAGE_KEY}:${scope}:category`, filters?.category || []);
    const difficulty = getSessionStorageItem(`${STORAGE_KEY}:${scope}:difficulty`, filters?.difficulty || []);
    const type = (sessionStorage.getItem(`${STORAGE_KEY}:${scope}:type`) ||
      filters.type ||
      "all") as ChallengeFilterState["type"];

    dispatch({ category, difficulty, type });
  }, []);
}
