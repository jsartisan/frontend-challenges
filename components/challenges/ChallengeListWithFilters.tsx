"use client";

import { Category, Challenge, Difficulty } from "@/types";
import { Input } from "../ui/input";
import { useReducer } from "react";
import { Button, Icon, IconButton, ToggleGroupItem } from "@/components/ui";
import { CATEGORIES, DEFAULT_LOCALE, DIFFICULTY_RANK } from "@/constants";
import { ChallengeList } from "./ChallengeList";
import { ChallengeListFilter } from "./ChallengeListFilter";
import { ToggleGroup } from "@/components/ui";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

type ChallengeListWithFiltersProps = {
  challenges: Challenge[];
};

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
    case "sort_by":
      if (action.payload.type === "difficulty") {
        return {
          ...state,
          sort_by: action.payload.type,
          filtered: state.filtered.sort(
            (a, b) =>
              (DIFFICULTY_RANK.indexOf(a.difficulty) - DIFFICULTY_RANK.indexOf(b.difficulty)) *
              (state.sort_order === "asc" ? 1 : -1),
          ),
        };
      }

      return {
        ...state,
        sort_by: action.payload.type,
        filtered: state.filtered.sort((a, b) => {
          const aDate = new Date(a.info[DEFAULT_LOCALE]?.published_date || "1970-01-01");
          const bDate = new Date(b.info[DEFAULT_LOCALE]?.published_date || "1970-01-01");

          return (bDate.getTime() - aDate.getTime()) * (state.sort_order === "asc" ? 1 : -1);
        }),
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
    sort_order: "asc",
    sort_by: "difficulty",
  });

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
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
            variant="secondary"
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="ml-auto" variant="secondary">
              <Icon name="sort" /> Sort
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuItem
              onClick={() => {
                dispatch({
                  type: "sort_by",
                  payload: {
                    type: "difficulty",
                  },
                });
              }}
            >
              Difficulty
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                dispatch({
                  type: "sort_by",
                  payload: {
                    type: "published_date",
                  },
                });
              }}
            >
              Creation Date
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <IconButton
          variant="tertiary"
          size="sm"
          onClick={() => {
            dispatch({
              type: "sort_order",
              payload: {
                sort_order: state.sort_order === "asc" ? "desc" : "asc",
              },
            });
            dispatch({
              type: "sort_by",
              payload: {
                type: state.sort_by,
              },
            });
          }}
        >
          <Icon name={state.sort_order === "asc" ? "arrow-up" : "arrow-down"} />
        </IconButton>
      </div>
      <ChallengeList challenges={state.filtered} />
    </div>
  );
};
