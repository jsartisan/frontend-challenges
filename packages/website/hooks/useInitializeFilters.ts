import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CATEGORIES, Category, Difficulty, DIFFICULTY_RANK, STORAGE_KEY } from "@frontend-challenges/shared";

import { ChallengeFilterState } from "./useFilteredChallenges";
import { getSessionStorageItem } from "../utils/sessionStorage";

export function useInitializeFilters(scope: string, filters: Partial<ChallengeFilterState>, dispatch: any) {
  const searchParams = useSearchParams();
  const typeFromURL = ["quiz", "question"].includes(searchParams.get("type") as any)
    ? (searchParams.get("type") as any)
    : undefined;
  const sortByFromURL = ["difficulty", "published_date"].includes(searchParams.get("sort_by") as any)
    ? (searchParams.get("sort_by") as any)
    : undefined;
  const sortOrderFromURL = ["asc", "desc"].includes(searchParams.get("sort_order") as any)
    ? (searchParams.get("sort_order") as any)
    : undefined;
  const categoryFromURL =
    searchParams
      .get("category")
      ?.split(",")
      .filter((c) => CATEGORIES.includes(c as Category)) ?? undefined;
  const difficultyFromURL =
    searchParams
      .get("difficulty")
      ?.split(",")
      .filter((d) => DIFFICULTY_RANK.includes(d as Difficulty)) ?? undefined;

  console.log({ difficultyFromURL, searchParams: searchParams.get("difficulty") });
  useEffect(() => {
    const category = categoryFromURL || getSessionStorageItem(`${STORAGE_KEY}:${scope}:category`, []);
    const difficulty = difficultyFromURL || getSessionStorageItem(`${STORAGE_KEY}:${scope}:difficulty`, []);
    const type =
      typeFromURL ||
      ((sessionStorage.getItem(`${STORAGE_KEY}:${scope}:type`) || "all") as ChallengeFilterState["type"]);
    const sort_by = sortByFromURL || sessionStorage.getItem(`${STORAGE_KEY}:${scope}:sort_by`) || "published_date";
    const sort_order = sortOrderFromURL || sessionStorage.getItem(`${STORAGE_KEY}:${scope}:sort_order`) || "desc";

    dispatch({ category, difficulty, type, sort_by, sort_order });
  }, []);
}
