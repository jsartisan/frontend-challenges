"use client";

import { useQueryState, parseAsArrayOf, parseAsStringEnum, parseAsStringLiteral } from "nuqs";
import type { Difficulty, Category } from "@/shared";
import { DIFFICULTY_RANK, CATEGORIES } from "@/shared";

import { Input } from "~/components/ui/input";
import { MultiSelect } from "~/components/ui/multi-select";
import { ToggleGroupItem } from "~/components/ui/toggle-group";
import { ToggleGroup } from "~/components/ui/toggle-group";
import { DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { DropdownMenuContent } from "~/components/ui/dropdown-menu";
import { DropdownMenu } from "~/components/ui/dropdown-menu";
import { IconButton } from "~/components/ui/icon-button";
import { Icon } from "~/components/ui/icon";
import { Button } from "~/components/ui/button";

const difficultyOptions = DIFFICULTY_RANK.map((difficulty) => ({ label: difficulty, value: difficulty }));
const categoryOptions = CATEGORIES.map((category) => ({ label: category, value: category }));

const difficultyParser = parseAsArrayOf(parseAsStringEnum(DIFFICULTY_RANK)).withDefault([]);
const categoryParser = parseAsArrayOf(parseAsStringLiteral(CATEGORIES)).withDefault([]);

export function ChallengesFilters() {
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [difficulty, setDifficulty] = useQueryState("difficulty", difficultyParser);
  const [category, setCategory] = useQueryState("category", categoryParser);
  const [type, setType] = useQueryState("type", parseAsStringLiteral(["all", "question", "quiz"]).withDefault("all"));
  const [sortBy, setSortBy] = useQueryState(
    "sort_by",
    parseAsStringLiteral(["difficulty", "published_date"]).withDefault("published_date"),
  );
  const [sortOrder, setSortOrder] = useQueryState(
    "sort_order",
    parseAsStringLiteral(["asc", "desc"]).withDefault("asc"),
  );

  return (
    <div className="flex items-center gap-2">
      <Input className="max-w-52" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
      <MultiSelect
        title="Difficulty"
        selectedValues={difficulty}
        options={difficultyOptions}
        setSelectedValues={(values) => setDifficulty(values as Difficulty[])}
      />
      <MultiSelect
        title="Category"
        selectedValues={category}
        options={categoryOptions}
        setSelectedValues={(values) => setCategory(values as Category[])}
      />
      <ToggleGroup
        className="hidden lg:flex"
        onValueChange={(value) => setType(value as "all" | "question" | "quiz")}
        type="single"
        variant="outline"
        value={type}
      >
        <ToggleGroupItem value="all">All</ToggleGroupItem>
        <ToggleGroupItem value="question">Question</ToggleGroupItem>
        <ToggleGroupItem value="quiz">Quiz</ToggleGroupItem>
      </ToggleGroup>
      <div className="ml-auto" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">
            <Icon name="sort" /> Sort
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuItem className="flex justify-between" onClick={() => setSortBy("difficulty")}>
            Difficulty
            {sortBy === "difficulty" && <Icon name="check" />}
          </DropdownMenuItem>
          <DropdownMenuItem className="flex justify-between" onClick={() => setSortBy("published_date")}>
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
  );
}
