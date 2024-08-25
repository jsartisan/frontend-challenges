import { CheckboxButton } from "../../ui/checkbox-button";
import { CATEGORIES, Category } from "@frontend-challenges/shared";
import { ChallengeFilterState } from "../../../hooks/useFilteredChallenges";

type ChallengeCategoryFilterMobileProps = {
  state: ChallengeFilterState;
  dispatch: React.Dispatch<any>;
};

export const ChallengeCategoryFilterMobile = ({ state, dispatch }: ChallengeCategoryFilterMobileProps) => {
  const handleCategoryChange = (category: string) => {
    dispatch({
      category: state.category.includes(category as Category)
        ? state.category.filter((c) => c !== category)
        : [...state.category, category],
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <h4>Category</h4>
      <div className="flex flex-wrap gap-3">
        {CATEGORIES.map((category) => (
          <CheckboxButton
            key={category}
            isSelected={state.category.includes(category)}
            onChange={() => handleCategoryChange(category)}
          >
            {category}
          </CheckboxButton>
        ))}
      </div>
    </div>
  );
};
