import { DIFFICULTY_RANK } from "@/shared";
import type { Difficulty } from "@/shared";

import { MultiSelect } from "../../ui/multi-select";
import { ChallengeFilterDispatch, ChallengeFilterState } from "../../../hooks/useFilteredChallenges";

type ChallengeDifficultyFilterProps = {
  dispatch: ChallengeFilterDispatch;
  state: ChallengeFilterState;
};

const difficultyOptions = DIFFICULTY_RANK.map((difficulty) => ({ label: difficulty, value: difficulty }));

export function ChallengeDifficultyFilter(props: ChallengeDifficultyFilterProps) {
  const { state, dispatch } = props;

  const onValueChange = (values) =>
    dispatch({
      difficulty: values as Difficulty[],
    });

  return (
    <MultiSelect
      title="Difficulty"
      selectedValues={state.difficulty}
      options={difficultyOptions}
      setSelectedValues={onValueChange}
    />
  );
}
