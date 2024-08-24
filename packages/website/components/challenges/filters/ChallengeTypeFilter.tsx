import { ToggleGroup, ToggleGroupItem } from "../../ui";
import { ChallengeFilterDispatch, ChallengeFilterState } from "../../../hooks/useFilteredChallenges";

type ChallegneTypeFilterProps = {
  dispatch: ChallengeFilterDispatch;
  state: ChallengeFilterState;
};

export function ChallengeTypeFilter(props: ChallegneTypeFilterProps) {
  const { state, dispatch } = props;

  const onValueChange = (value) => {
    if (!value) return;

    dispatch({
      type: value as any,
    });
  };

  return (
    <ToggleGroup
      className="hidden lg:flex"
      onValueChange={onValueChange}
      type="single"
      variant="outline"
      value={state.type}
    >
      <ToggleGroupItem value="all">All</ToggleGroupItem>
      <ToggleGroupItem value="question">Question</ToggleGroupItem>
      <ToggleGroupItem value="quiz">Quiz</ToggleGroupItem>
    </ToggleGroup>
  );
}
