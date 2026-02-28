import { useState, useEffect } from "react";

import { Category } from "~/entities/category/model/types";
import { sortChallengesByDate } from "~/entities/challenge/lib/sortChallengesByDate";
import { Challenge, ChallengeList, Difficulty } from "~/entities/challenge/model/types";
import { sortChallengesByDifficulty } from "~/entities/challenge/lib/sortChallengesByDifficulty";
import { getSessionStorageItem, setSessionStorageItem } from "~/shared/lib/sessionStorage";

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

function usePersistedChallengeFilters(challenges: ChallengeList) {
  const [state, setState] = useState<ChallengeFilterState>(defaults);

  // Sync from sessionStorage on mount (client-side only)
  useEffect(() => {
    setState({
      search: "",
      category: getSessionStorageItem("category", []),
      difficulty: getSessionStorageItem("difficulty", []),
      type: getSessionStorageItem("type", "all"),
      sort_by: getSessionStorageItem("sort_by", "published_date"),
      sort_order: getSessionStorageItem("sort_order", "desc"),
    });
  }, []);

  const dispatch = (newState: Omit<Partial<ChallengeFilterState>, "challenges" | "filtered">) => {
    setState((prevState) => {
      const finalState = { ...prevState, ...newState };

      setSessionStorageItem("difficulty", JSON.stringify(finalState.difficulty));
      setSessionStorageItem("category", JSON.stringify(finalState.category));
      setSessionStorageItem("type", JSON.stringify(finalState.type));
      setSessionStorageItem("sort_by", JSON.stringify(finalState.sort_by || "published_date"));
      setSessionStorageItem("sort_order", JSON.stringify(finalState.sort_order || "desc"));

      return finalState;
    });
  };

  const dispatchWithURLUpdate = (state: Omit<Partial<ChallengeFilterState>, "challenges" | "filtered">) => {
    dispatch(state);

    const searchParams = new URLSearchParams();

    if (state.difficulty) {
      searchParams.set("difficulty", state.difficulty.join(","));
    }

    if (state.sort_by) {
      searchParams.set("sort_by", state.sort_by);
    }

    if (state.sort_order) {
      searchParams.set("sort_order", state.sort_order);
    }

    if (state.category) {
      searchParams.set("category", state.category.join(","));
    }

    if (state.type) {
      searchParams.set("type", state.type);
    }

    if (state.search) {
      searchParams.set("search", state.search);
    }

    window.history.replaceState({}, "", `?${searchParams.toString()}`);
  };

  let filtered = challenges.filter((question) => {
    return (
      (state.category.length === 0 || state.category.includes(question?.category ?? "javascript")) &&
      (state.difficulty.length === 0 || state.difficulty.includes(question?.difficulty ?? "")) &&
      (state.type === "all" || state.type === question.type)
    );
  });

  filtered = filtered.filter((question) => {
    return question.info?.en?.title?.toLowerCase().includes(state.search.toLowerCase());
  });

  if (state.sort_by === "difficulty") {
    filtered = sortChallengesByDifficulty(filtered, state.sort_order);
  }

  if (state.sort_by === "published_date") {
    filtered = sortChallengesByDate(filtered, state.sort_order || "desc");
  }

  return { state, filtered, dispatch, dispatchWithURLUpdate };
}

export { usePersistedChallengeFilters };
