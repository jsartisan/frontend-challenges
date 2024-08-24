"use client";

import dynamic from "next/dynamic";
import { STORAGE_KEY, type Category, type Challenge, type Difficulty } from "@frontend-challenges/shared";

import { Input } from "../ui/input";
import { ChallengeList } from "./ChallengeList";
import { ChallengeListSort } from "./ChallengeListSort";
import { useFilteredChallenges, type ChallengeFilterState } from "../../hooks/useFilteredChallenges";
import { ChallengeTypeFilter } from "./filters/ChallengeTypeFilter";
import { ChallengeCategoryFilter } from "./filters/ChallengeCategoryFilter";
import { ChallengeDifficultyFilter } from "./filters/ChallengeDifficultyFilter";
import { useEffect } from "react";
import { getSessionStorageItem } from "packages/website/utils/sessionStorage";

const ChallengeListFilterMobile = dynamic(() => import("./ChallengeListFilterMobile"), {
  ssr: false,
});

export type ChallengeListWithFiltersProps = {
  challenges: Challenge[];
  scope?: string;
  filters: Partial<ChallengeFilterState>;
  includes?: ("category" | "difficulty")[];
};

export const ChallengeListWithFilters = (props: ChallengeListWithFiltersProps) => {
  const { challenges, scope, filters, includes = ["category", "difficulty"] } = props;
  const { state, dispatch, filtered } = useFilteredChallenges(challenges, scope, filters);

  useEffect(() => {
    dispatch({
      category: getSessionStorageItem(`${STORAGE_KEY}:${scope}:category`, filters.category || []),
      difficulty: getSessionStorageItem(`${STORAGE_KEY}:${scope}:difficulty`, filters.difficulty || []),
      type: (sessionStorage.getItem(`${STORAGE_KEY}:${scope}:type`) ||
        filters.type ||
        "all") as ChallengeFilterState["type"],
    });
  }, [scope]);

  useEffect(() => {
    sessionStorage.setItem(`${STORAGE_KEY}:scope`, scope);
  }, [scope]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Input
          className="max-w-52"
          placeholder="Search"
          onChange={(e) => {
            dispatch({ search: e.target.value });
          }}
        />
        {includes.includes("difficulty") && <ChallengeDifficultyFilter state={state} dispatch={dispatch} />}
        {includes.includes("category") && <ChallengeCategoryFilter state={state} dispatch={dispatch} />}
        <ChallengeTypeFilter state={state} dispatch={dispatch} />
        <div className="mx-auto"></div>
        {/* <ChallengeListFilterMobile state={state} dispatch={dispatch} /> */}
        <ChallengeListSort state={state} dispatch={dispatch} />
      </div>
      <ChallengeList challenges={filtered} />
    </div>
  );
};
