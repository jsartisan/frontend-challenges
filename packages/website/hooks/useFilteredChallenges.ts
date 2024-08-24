import { useEffect, useState } from "react";
import { Category, Challenge, Difficulty, STORAGE_KEY } from "@frontend-challenges/shared";
import { sortChallengesByDate, sortChallengesByDifficulty } from "../utils/challenges";

export interface ChallengeFilterState {
  search: string;
  category: Category[];
  difficulty: Difficulty[];
  type: Challenge["type"] | "all";
  sort_by?: "difficulty" | "published_date";
  sort_order?: "asc" | "desc";
}

export type ChallengeFilterDispatch = (state: Omit<Partial<ChallengeFilterState>, "challenges" | "filtered">) => void;

const defaults: ChallengeFilterState = {
  search: "",
  category: [],
  difficulty: [],
  type: "all",
  sort_by: "published_date",
  sort_order: "desc",
};

function useFilteredChallenges(
  challenges: Challenge[],
  scope = "all",
  filters: Partial<ChallengeFilterState> = defaults,
) {
  const [state, setState] = useState<ChallengeFilterState>({ ...defaults, ...filters });

  const dispatch = (state: Omit<Partial<ChallengeFilterState>, "challenges" | "filtered">) => {
    setState((prevState) => {
      const finalState = { ...prevState, ...state };

      sessionStorage.setItem(`${STORAGE_KEY}:${scope}:difficulty`, JSON.stringify(finalState.difficulty));
      sessionStorage.setItem(`${STORAGE_KEY}:${scope}:category`, JSON.stringify(finalState.category));
      sessionStorage.setItem(`${STORAGE_KEY}:${scope}:type`, finalState.type);

      return finalState;
    });
  };

  let filtered = challenges.filter((question) => {
    return (
      (state.category.length === 0 || state.category.includes(question.category)) &&
      (state.difficulty.length === 0 || state.difficulty.includes(question.difficulty)) &&
      (state.type === "all" || state.type === question.type)
    );
  });

  filtered = filtered.filter((question) => {
    return question.info?.en?.title.toLowerCase().includes(state.search.toLowerCase());
  });

  if (state.sort_by === "difficulty") {
    filtered = sortChallengesByDifficulty(filtered, state.sort_order);
  }

  if (state.sort_by === "published_date") {
    filtered = sortChallengesByDate(filtered, state.sort_order);
  }

  if (scope && scope !== "all") {
    filtered = filtered.filter((question) => question.info?.en?.tags?.includes(scope));
  }

  return { state, filtered, dispatch };
}

export { useFilteredChallenges };
