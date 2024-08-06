import { useReducer } from "react";
import { Category, Challenge, Difficulty } from "@/types";
import { sortChallengesByDate, sortChallengesByDifficulty } from "@/website/utils/challenges";

interface Action {
  type: "filter" | "search" | "sort_by" | "sort_order";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
}

interface State {
  search: string;
  challenges: Challenge[];
  filtered: Challenge[];
  filters: {
    category: Category[];
    difficulty: Difficulty;
    type: Challenge["type"];
  };
  sort_by?: "difficulty" | "published_date";
  sort_order?: "asc" | "desc";
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "search":
      return {
        ...state,
        search: action.payload,
        filtered: state.challenges.filter((question) => {
          return question.info?.en?.title?.toLowerCase().includes(action.payload.toLowerCase());
        }),
      };
    case "filter":
      return {
        ...state,
        filters: {
          ...state.filters,
          category: action.payload.category,
          difficulty: action.payload.difficulty,
          type: action.payload.type,
        },
        filtered: state.challenges.filter((question) => {
          return (
            (action.payload.category.length === 0 || action.payload.category.includes(question.category)) &&
            (action.payload.difficulty.length === 0 || action.payload.difficulty.includes(question.difficulty)) &&
            (action.payload.type === "all" || action.payload.type === question.type)
          );
        }),
      };
    case "sort_by":
      if (action.payload.type === "difficulty") {
        return {
          ...state,
          sort_by: action.payload.type,
          filtered: sortChallengesByDifficulty(state.filtered, state.sort_order),
        };
      }

      return {
        ...state,
        sort_by: action.payload.type,
        filtered: sortChallengesByDate(state.filtered, state.sort_order),
      };
    case "sort_order":
      return {
        ...state,
        sort_order: action.payload.sort_order,
      };
    default:
      return state;
  }
};

function useFilteredChallenges(challenges: Challenge[]) {
  const [state, dispatch] = useReducer(reducer, {
    search: "",
    challenges,
    filtered: sortChallengesByDifficulty(sortChallengesByDate(challenges, "asc"), "asc"),
    filters: {
      category: [],
      difficulty: [],
      type: "all",
    },
    sort_order: "asc",
    sort_by: "difficulty",
  });

  return { state, dispatch };
}

export { useFilteredChallenges };
