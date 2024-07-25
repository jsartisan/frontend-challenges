"use client";

import dynamic from "next/dynamic";
import { Input } from "../ui/input";
import type { Challenge } from "@/types";
import { ToggleGroup } from "@/components/ui";
import { ChallengeList } from "./ChallengeList";
import { ChallengeListSort } from "./ChallengeListSort";
import { CATEGORIES, DIFFICULTY_RANK } from "@/constants";
import { ChallengeListFilter } from "./ChallengeListFilter";
import { Button, Icon, ToggleGroupItem } from "@/components/ui";
import { useFilteredChallenges } from "@/hooks/useFilteredChallenges";

const ChallengeListFilterMobile = dynamic(() => import("./ChallengeListFilterMobile"), {
  ssr: false,
});

type ChallengeListWithFiltersProps = {
  challenges: Challenge[];
  includes?: ("category" | "difficulty")[];
};

const difficultyOptions = DIFFICULTY_RANK.map((difficulty) => ({ label: difficulty, value: difficulty }));
const categoryOptions = CATEGORIES.map((category) => ({ label: category, value: category }));

export const ChallengeListWithFilters = (props: ChallengeListWithFiltersProps) => {
  const { challenges, includes = ["category", "difficulty"] } = props;
  const { state, dispatch } = useFilteredChallenges(challenges);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Input
          className="max-w-52"
          placeholder="Search"
          onChange={(e) => {
            dispatch({ type: "search", payload: e.target.value });
          }}
        />
        {includes.includes("difficulty") && (
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
        )}
        {includes.includes("category") && (
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
        )}
        <ToggleGroup
          className="hidden lg:flex"
          onValueChange={(value) => {
            if (!value) return;

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
          value={state.filters.type}
        >
          <ToggleGroupItem value="all">All</ToggleGroupItem>
          <ToggleGroupItem value="question">Question</ToggleGroupItem>
          <ToggleGroupItem value="quiz">Quiz</ToggleGroupItem>
        </ToggleGroup>
        <div className="mx-auto"></div>

        {(state.filters.category.length > 0 || state.filters.difficulty.length > 0 || state.filters.type !== "all") && (
          <Button
            className="hidden lg:flex"
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
        <ChallengeListFilterMobile state={state} dispatch={dispatch} />
        <ChallengeListSort state={state} dispatch={dispatch} />
      </div>
      <ChallengeList challenges={state.filtered} />
    </div>
  );
};
