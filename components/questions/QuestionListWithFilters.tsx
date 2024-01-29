"use client";

import { Question } from "@/types";
import { QuestionList } from "./QuestionList";
import { Input } from "../ui/input";
import { useReducer } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui";
import { DIFFICULTY_RANK } from "@/constants";

type QuestionListWithFiltersProps = {
  questions: Question[];
};

interface Action {
  type: "filter-by-difficulty" | "search";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
}

interface State {
  search: string;
  questions: Question[];
  filtered: Question[];
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "search":
      return {
        ...state,
        search: action.payload,
        filtered: state.questions.filter((question) => {
          return question.info?.en?.title?.toLowerCase().includes(action.payload.toLowerCase());
        }),
      };
    case "filter-by-difficulty":
      return { ...state, filtered: state.questions.filter((question) => question.difficulty === action.payload) };
    default:
      return state;
  }
};

export const QuestionListWithFilters = (props: QuestionListWithFiltersProps) => {
  const { questions } = props;
  const [state, dispatch] = useReducer(reducer, { search: "", questions: questions, filtered: questions });

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
      <QuestionList questions={state.filtered} />
    </div>
  );
};
