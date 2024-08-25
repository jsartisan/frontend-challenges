// ChallengeTypeFilterMobile.tsx
import { CheckboxButton } from "../../ui/checkbox-button";
import { ChallengeFilterState } from "../../../hooks/useFilteredChallenges";

type ChallengeTypeFilterMobileProps = {
  state: ChallengeFilterState;
  dispatch: React.Dispatch<any>;
};

export const ChallengeTypeFilterMobile = ({ state, dispatch }: ChallengeTypeFilterMobileProps) => {
  const handleTypeChange = (type: string) => {
    dispatch({
      type: type,
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <h4>Type</h4>
      <div className="flex gap-3">
        {["all", "question", "quiz"].map((type) => (
          <CheckboxButton isSelected={state.type === type} key={type} onChange={() => handleTypeChange(type)}>
            {type}
          </CheckboxButton>
        ))}
      </div>
    </div>
  );
};
