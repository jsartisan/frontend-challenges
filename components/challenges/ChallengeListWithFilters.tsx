"use client";

import { Category, Challenge, Difficulty } from "@/types";
import { Input } from "../ui/input";
import { useReducer } from "react";
import { Button, Icon, ToggleGroupItem } from "@/components/ui";
import { CATEGORIES, DIFFICULTY_RANK } from "@/constants";
import { ChallengeList } from "./ChallengeList";
import { ChallengeListFilter } from "./ChallengeListFilter";
import { ToggleGroup } from "@/components/ui";

type ChallengeListWithFiltersProps = {
  challenges: Challenge[];
};

interface Action {
  type: "filter" | "search";
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
}

const difficultyOptions = DIFFICULTY_RANK.map((difficulty) => ({ label: difficulty, value: difficulty }));
const categoryOptions = CATEGORIES.map((category) => ({ label: category, value: category }));

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
    default:
      return state;
  }
};

export const ChallengeListWithFilters = (props: ChallengeListWithFiltersProps) => {
  const { challenges } = props;
  const [state, dispatch] = useReducer(reducer, {
    search: "",
    challenges: challenges,
    filtered: challenges,
    filters: {
      category: [],
      difficulty: [],
      type: "all",
    },
  });

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <Input
          className="w-52"
          placeholder="Search"
          onChange={(e) => {
            dispatch({ type: "search", payload: e.target.value });
          }}
        />
        <ChallengeListFilter
          title="Difficulty"
          selectedValues={state.filters.difficulty}
          options={difficultyOptions}
          setSelectedValues={(values) =>
            dispatch({
              type: "filter",
              payload: {
                ...state.filters,
                difficulty: values,
              },
            })
          }
        />
        <ChallengeListFilter
          title="Category"
          selectedValues={state.filters.category}
          options={categoryOptions}
          setSelectedValues={(values) =>
            dispatch({
              type: "filter",
              payload: {
                ...state.filters,
                category: values,
              },
            })
          }
        />
        <ToggleGroup
          onValueChange={(value) => {
            dispatch({
              type: "filter",
              payload: {
                ...state.filters,
                type: value,
              },
            });
          }}
          type="single"
          variant="outline"
          defaultValue="all"
        >
          <ToggleGroupItem value="all">All</ToggleGroupItem>
          <ToggleGroupItem value="question">Question</ToggleGroupItem>
          <ToggleGroupItem value="quiz">Quiz</ToggleGroupItem>
        </ToggleGroup>
        {(state.filters.category.length > 0 || state.filters.difficulty.length > 0 || state.filters.type !== "all") && (
          <Button
            variant="tertiary"
            onClick={() => {
              dispatch({
                type: "filter",
                payload: {
                  category: [],
                  difficulty: [],
                  type: "all",
                },
              });
            }}
          >
            Reset
            <Icon name="cross" className="!h-4 !w-4" />
          </Button>
        )}
      </div>
      <ChallengeList challenges={state.filtered} />
    </div>
  );
};
