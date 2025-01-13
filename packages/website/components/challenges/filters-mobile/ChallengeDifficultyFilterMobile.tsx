import { Difficulty, DIFFICULTY_RANK } from "@/shared";
import { CheckboxButton } from "../../../components/ui/checkbox-button";
import { ChallengeFilterState } from "../../../hooks/useFilteredChallenges";

type ChallengeDifficultyFilterMobileProps = {
  state: ChallengeFilterState;
  dispatch: React.Dispatch<any>;
};

export const ChallengeDifficultyFilterMobile = ({ state, dispatch }: ChallengeDifficultyFilterMobileProps) => {
  const handleDifficultyChange = (difficulty: string) => {
    dispatch({
      difficulty: state.difficulty.includes(difficulty as Difficulty)
        ? state.difficulty.filter((d) => d !== difficulty)
        : [...state.difficulty, difficulty],
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <h4>Difficulty</h4>
      <div className="flex flex-wrap gap-3">
        {DIFFICULTY_RANK.map((difficulty) => (
          <CheckboxButton
            isSelected={state.difficulty.includes(difficulty)}
            key={difficulty}
            onChange={() => handleDifficultyChange(difficulty)}
          >
            {difficulty}
          </CheckboxButton>
        ))}
      </div>
    </div>
  );
};
