import { CATEGORIES, DIFFICULTY_RANK } from "@/constants";
import { Sheet, SheetTrigger, IconButton, Icon, SheetHeader, SheetContent, CheckboxButton, SheetTitle } from "../ui";

type ChallengeListFilterMobileProps = {
  state: any;
  dispatch: any;
};

export default function ChallengeListFilterMobile(props: ChallengeListFilterMobileProps) {
  const { state, dispatch } = props;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <IconButton variant="secondary" className="flex lg:hidden">
          <Icon name="filter" />
        </IconButton>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <h4>Difficulty</h4>
          <div className="flex flex-wrap gap-3">
            {DIFFICULTY_RANK.map((difficulty) => (
              <CheckboxButton
                isSelected={state.filters.difficulty.includes(difficulty)}
                key={difficulty}
                onChange={() => {
                  dispatch({
                    type: "filter",
                    payload: {
                      category: state.filters.category,
                      difficulty: state.filters.difficulty.includes(difficulty)
                        ? state.filters.difficulty.filter((d) => d !== difficulty)
                        : [...state.filters.difficulty, difficulty],
                      type: state.filters.type,
                    },
                  });
                }}
              >
                {difficulty}
              </CheckboxButton>
            ))}
          </div>
          <h4>Category</h4>
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((category) => (
              <CheckboxButton
                key={category}
                isSelected={state.filters.category.includes(category)}
                onChange={() => {
                  dispatch({
                    type: "filter",
                    payload: {
                      category: state.filters.category.includes(category)
                        ? state.filters.category.filter((c) => c !== category)
                        : [...state.filters.category, category],
                      difficulty: state.filters.difficulty,
                      type: state.filters.type,
                    },
                  });
                }}
              >
                {category}
              </CheckboxButton>
            ))}
          </div>
          <h4>Type</h4>
          <div className="flex gap-3">
            {["all", "question", "quiz"].map((type) => (
              <CheckboxButton
                isSelected={state.filters.type === type}
                key={type}
                onChange={() => {
                  dispatch({
                    type: "filter",
                    payload: {
                      category: state.filters.category,
                      difficulty: state.filters.difficulty,
                      type: type,
                    },
                  });
                }}
              >
                {type}
              </CheckboxButton>
            ))}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
