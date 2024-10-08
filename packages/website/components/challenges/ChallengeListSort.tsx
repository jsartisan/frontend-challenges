import { Button, Icon, IconButton } from "../ui";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

type ChallengeListProps = {
  dispatch: any;
  state: any;
};

export function ChallengeListSort(props: ChallengeListProps) {
  const { dispatch, state } = props;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">
            <Icon name="sort" /> Sort
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuItem
            className="flex justify-between"
            onClick={() => {
              dispatch({
                sort_by: "difficulty",
              });
            }}
          >
            Difficulty
            {state.sort_by === "difficulty" && <Icon name="check" />}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex justify-between"
            onClick={() => {
              dispatch({
                sort_by: "published_date",
              });
            }}
          >
            Creation Date
            {state.sort_by === "published_date" && <Icon name="check" />}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <IconButton
        variant="tertiary"
        size="sm"
        onClick={() => {
          dispatch({
            sort_order: state.sort_order === "asc" ? "desc" : "asc",
          });
          dispatch({
            sort_by: state.sort_by,
          });
        }}
      >
        <Icon name={state.sort_order === "asc" ? "arrow-up" : "arrow-down"} />
      </IconButton>
    </>
  );
}
