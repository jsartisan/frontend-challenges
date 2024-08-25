import { Input } from "../../ui/input";
import { ChallengeFilterState } from "../../../hooks/useFilteredChallenges";

type ChallengeSearchFilterProps = {
  state: ChallengeFilterState;
  dispatch: React.Dispatch<any>;
};

export const ChallengeSearchFilter = ({ state, dispatch }: ChallengeSearchFilterProps) => {
  return (
    <Input
      className="max-w-52"
      placeholder="Search"
      value={state.search || ""}
      onChange={(e) => {
        dispatch({ search: e.target.value });
      }}
    />
  );
};
