import { CATEGORIES } from "@/shared";
import type { Category } from "@/shared";

import { MultiSelect } from "../../ui/multi-select";
import { ChallengeFilterDispatch, ChallengeFilterState } from "../../../hooks/useFilteredChallenges";

type ChallengeDifficultyFilterProps = {
  dispatch: ChallengeFilterDispatch;
  state: ChallengeFilterState;
};

const categoryOptions = CATEGORIES.map((category) => ({ label: category, value: category }));

export function ChallengeCategoryFilter(props: ChallengeDifficultyFilterProps) {
  const { state, dispatch } = props;

  const onValueChange = (values) =>
    dispatch({
      category: values as Category[],
    });

  return (
    <MultiSelect
      title="Category"
      selectedValues={state.category}
      options={categoryOptions}
      setSelectedValues={onValueChange}
    />
  );
}
