import { Sheet, SheetTrigger, IconButton, Icon, SheetContent, SheetTitle, Button, SheetClose } from "../ui";
import { ChallengeDifficultyFilterMobile } from "./filters-mobile/ChallengeDifficultyFilterMobile";
import { ChallengeCategoryFilterMobile } from "./filters-mobile/ChallengeCategoryFilterMobile";
import { ChallengeTypeFilterMobile } from "./filters-mobile/ChallengeTypeFilterMobile";

type ChallengeListFilterMobileProps = {
  state: any;
  dispatch: any;
};

export default function ChallengeListFilterMobile(props: ChallengeListFilterMobileProps) {
  const { state, dispatch } = props;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <IconButton variant="secondary" className="flex flex-shrink-0 lg:hidden">
          <Icon name="filter" />
        </IconButton>
      </SheetTrigger>
      <SheetContent side="bottom" className="flex flex-col gap-3">
        <SheetTitle>Filters</SheetTitle>
        <ChallengeDifficultyFilterMobile state={state} dispatch={dispatch} />
        <ChallengeCategoryFilterMobile state={state} dispatch={dispatch} />
        <ChallengeTypeFilterMobile state={state} dispatch={dispatch} />
        <div className="mt-8 flex  gap-2">
          <SheetClose asChild>
            <Button variant="primary" className="flex-grow">
              Apply Filter
            </Button>
          </SheetClose>
          <Button
            disabled={state.category.length === 0 && state.difficulty.length === 0 && state.type === "all"}
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
