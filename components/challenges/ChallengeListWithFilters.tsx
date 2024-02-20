"use client";

import { Challenge } from "@/types";
import { Input } from "../ui/input";
import { useReducer } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui";
import { DIFFICULTY_RANK } from "@/constants";
import { ChallengeList } from "./ChallengeList";

type ChallengeListWithFiltersProps = {
  challenges: Challenge[];
};

interface Action {
  type: "filter-by-difficulty" | "search";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
}

interface State {
  search: string;
  challenges: Challenge[];
  filtered: Challenge[];
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
    case "filter-by-difficulty":
      return { ...state, filtered: state.challenges.filter((question) => question.difficulty === action.payload) };
    default:
      return state;
  }
};

export const ChallengeListWithFilters = (props: ChallengeListWithFiltersProps) => {
  const { challenges } = props;
  const [state, dispatch] = useReducer(reducer, { search: "", challenges: challenges, filtered: challenges });

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between">
        <Input
          className="w-52"
          placeholder="Search"
          onChange={(e) => {
            dispatch({ type: "search", payload: e.target.value });
          }}
        />
        <div>
          <Select
            onValueChange={(value) => {
              dispatch({
                type: "filter-by-difficulty",
                payload: value,
              });
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {DIFFICULTY_RANK.map((difficulty) => (
                  <SelectItem value={difficulty} key={difficulty}>
                    {difficulty}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <ChallengeList challenges={state.filtered} />
    </div>
  );
};
