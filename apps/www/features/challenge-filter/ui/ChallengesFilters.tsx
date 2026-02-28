import { useQueryState, parseAsArrayOf, parseAsStringEnum, parseAsStringLiteral } from "nuqs";

import type { Category } from "~/entities/category/model/types";
import type { Difficulty } from "~/entities/challenge/model/types";

import { Icon } from "~/components/ui/icon";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { IconButton } from "~/components/ui/icon-button";
import { MultiSelect } from "~/components/ui/multi-select";
import { ToggleGroup } from "~/components/ui/toggle-group";
import { DropdownMenu } from "~/components/ui/dropdown-menu";
import { ToggleGroupItem } from "~/components/ui/toggle-group";
import { CATEGORIES } from "~/entities/category/model/constants";
import { DropdownMenuContent } from "~/components/ui/dropdown-menu";
import { DIFFICULTY_RANK } from "~/entities/challenge/model/constants";
import { DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { useSessionSyncedQueryState } from "~/features/challenge-filter/hooks/useSessionSyncedQueryState";

const difficultyOptions = DIFFICULTY_RANK.map((difficulty) => ({ label: difficulty, value: difficulty }));
const categoryOptions = CATEGORIES.map((category) => ({ label: category, value: category }));

const difficultyParser = parseAsArrayOf(parseAsStringEnum(DIFFICULTY_RANK)).withDefault([]);
const categoryParser = parseAsArrayOf(parseAsStringLiteral(CATEGORIES)).withDefault([]);

type ChallengesFiltersProps = {
  excludes?: ("category" | "difficulty" | "type" | "sort")[];
};

export function ChallengesFilters(props: ChallengesFiltersProps) {
  const { excludes = [] } = props;

  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [difficulty, setDifficulty] = useSessionSyncedQueryState("difficulty", difficultyParser);
  const [category, setCategory] = useSessionSyncedQueryState("category", categoryParser);
  const [type, setType] = useSessionSyncedQueryState(
    "type",
    parseAsStringLiteral(["all", "question", "quiz"]).withDefault("all"),
  );
  const [sortBy, setSortBy] = useSessionSyncedQueryState(
    "sort_by",
    parseAsStringLiteral(["difficulty", "published_date"]).withDefault("published_date"),
  );
  const [sortOrder, setSortOrder] = useSessionSyncedQueryState(
    "sort_order",
    parseAsStringLiteral(["asc", "desc"]).withDefault("desc"),
  );

  return (
    <div className="flex items-center gap-2">
      <Input
        className="max-w-52"
        placeholder="Search"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      {!excludes.includes("difficulty") && (
        <MultiSelect
          title="Difficulty"
          selectedValues={difficulty}
          options={difficultyOptions}
          setSelectedValues={(values) => {
            setDifficulty(values as Difficulty[]);
          }}
        />
      )}
      {!excludes.includes("category") && (
        <MultiSelect
          title="Category"
          selectedValues={category}
          options={categoryOptions}
          setSelectedValues={(values) => {
            setCategory(values as Category[]);
          }}
        />
      )}
      {!excludes.includes("type") && (
        <ToggleGroup
          className="hidden lg:flex"
          onValueChange={(value) => {
            if (!value) return;

            setType(value as "all" | "question" | "quiz");
          }}
          type="single"
          variant="outline"
          value={type}
        >
          <ToggleGroupItem value="all">All</ToggleGroupItem>
          <ToggleGroupItem value="question">Question</ToggleGroupItem>
          <ToggleGroupItem value="quiz">Quiz</ToggleGroupItem>
        </ToggleGroup>
      )}
      {!excludes.includes("sort") && (
        <div className="ml-auto flex items-center gap-1">
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
                  setSortBy("difficulty");
                }}
              >
                Difficulty
                {sortBy === "difficulty" && <Icon name="check" />}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex justify-between"
                onClick={() => {
                  setSortBy("published_date");
                }}
              >
                Creation Date
                {sortBy === "published_date" && <Icon name="check" />}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <IconButton
            variant="tertiary"
            size="sm"
            onClick={() => {
              setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            }}
          >
            <Icon name={sortOrder === "asc" ? "arrow-up" : "arrow-down"} />
          </IconButton>
        </div>
      )}
    </div>
  );
}
