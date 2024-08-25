"use client";

import dynamic from "next/dynamic";
import { type Challenge } from "@frontend-challenges/shared";

import { ChallengeList } from "./ChallengeList";
import { ChallengeListSort } from "./ChallengeListSort";
import { ChallengeTypeFilter } from "./filters/ChallengeTypeFilter";
import { ChallengeSearchFilter } from "./filters/ChallengeSearchFilter";
import { ChallengeCategoryFilter } from "./filters/ChallengeCategoryFilter";
import { ChallengeDifficultyFilter } from "./filters/ChallengeDifficultyFilter";
import { useInitializeFilters, useSyncScopeToSessionStorage } from "packages/website/hooks";
import { useFilteredChallenges, type ChallengeFilterState } from "../../hooks/useFilteredChallenges";

const ChallengeListFilterMobile = dynamic(() => import("./ChallengeListFilterMobile"), {
  ssr: false,
});

export type ChallengeListWithFiltersProps = {
  challenges: Challenge[];
  scope?: string;
  filters?: Partial<ChallengeFilterState>;
  includes?: ("category" | "difficulty")[];
};

export const ChallengeListWithFilters = (props: ChallengeListWithFiltersProps) => {
  const { challenges, scope, filters, includes = ["category", "difficulty"] } = props;
  const { state, dispatch, filtered } = useFilteredChallenges(challenges, scope, filters);

  useInitializeFilters(scope, filters, dispatch);
  useSyncScopeToSessionStorage(scope);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <ChallengeSearchFilter state={state} dispatch={dispatch} />
        {includes.includes("difficulty") && <ChallengeDifficultyFilter state={state} dispatch={dispatch} />}
        {includes.includes("category") && <ChallengeCategoryFilter state={state} dispatch={dispatch} />}
        <ChallengeTypeFilter state={state} dispatch={dispatch} />
        <div className="mx-auto"></div>
        <ChallengeListFilterMobile state={state} dispatch={dispatch} />
        <ChallengeListSort state={state} dispatch={dispatch} />
      </div>
      <ChallengeList challenges={filtered} />
    </div>
  );
};
