import { CATEGORIES, DIFFICULTY_RANK } from "@/constants";
import {
  Sheet,
  SheetTrigger,
  IconButton,
  Icon,
  SheetContent,
  CheckboxButton,
  SheetTitle,
  Button,
  SheetClose,
} from "../ui";

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
      <SheetContent side="bottom" className="flex flex-col gap-3">
        <SheetTitle>Filters</SheetTitle>
        <div className="flex flex-col gap-2">
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
        </div>
        <div className="flex flex-col gap-2">
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
        </div>
        <div className="flex flex-col gap-2">
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
        </div>
        <div className="mt-8 flex  gap-2">
          <SheetClose asChild>
            <Button variant="primary" className="flex-grow">
              Apply Filter
            </Button>
          </SheetClose>
          <Button
            disabled={
              state.filters.category.length === 0 &&
              state.filters.difficulty.length === 0 &&
              state.filters.type === "all"
            }
            variant="tertiary"
            className="flex-grow"
            onClick={() => {
              dispatch({
                type: "filter",
                payload: {
                  category: [],
                  difficulty: [],
                  type: "all",
                },
              });
            }}
          >
            Clear Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
