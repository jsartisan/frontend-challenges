import { useRouter } from "next/navigation";

import type { Challenge } from "~/entities/challenge/model/types";

import { cn } from "~/utils/helpers";
import { CATEGORIES } from "~/entities/category/model/constants";
import { ChallengeList } from "~/entities/challenge/ui/ChallengeList";
import { DIFFICULTY_RANK } from "~/entities/challenge/model/constants";
import { useChallenges } from "~/entities/challenge/context/ChallengeProvider";
import { usePersistedChallengeFilters } from "~/features/challenge-filter/hooks/usePersistedChallengeFilters";
import {
  CheckboxButton,
  Icon,
  IconButton,
  Link,
  Sheet,
  SheetContent,
  SheetTrigger,
  BreadcrumbItem,
  BreadcrumbLink,
  Breadcrumb as BreadcrumRoot,
} from "~/components/ui";

type BreadcrumbProps = {
  challenge: Challenge;
  className?: string;
};

export function Breadcrumb(props: BreadcrumbProps) {
  const { challenge, className } = props;
  const router = useRouter();
  const { challenges } = useChallenges();

  const { dispatch, filtered, state } = usePersistedChallengeFilters(challenges);
  const nextChallenge = filtered[filtered.findIndex((c) => c.path === challenge.path) + 1];
  const previousChallenge = filtered[filtered.findIndex((c) => c.path === challenge.path) - 1];

  return (
    <>
      <div className="flex items-center gap-4">
        <BreadcrumRoot separator="/">
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} href="/">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <div className={cn("flex items-center justify-center gap-1", className)}>
              <Sheet>
                <SheetTrigger asChild>
                  <div className="group flex cursor-pointer items-center gap-1 text-sm">
                    Challenges
                    <IconButton variant="tertiary" size="xs" className="group-hover:bg-(--color-bg-hover) p-1">
                      <Icon name="chevron-down" />
                    </IconButton>
                  </div>
                </SheetTrigger>
                <SheetContent side="left" className="w-5/12 overflow-auto">
                  <h3 className="text-2xl font-bold">Challenges</h3>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                      <h4>Difficulty</h4>
                      <div className="flex flex-wrap gap-3">
                        {DIFFICULTY_RANK.map((difficulty) => (
                          <CheckboxButton
                            isSelected={state.difficulty.includes(difficulty)}
                            key={difficulty}
                            onChange={() => {
                              dispatch({
                                category: state.category,
                                difficulty: state.difficulty.includes(difficulty)
                                  ? state.difficulty.filter((d) => d !== difficulty)
                                  : [...state.difficulty, difficulty],
                                type: state.type,
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
                            isSelected={state.category.includes(category)}
                            onChange={() => {
                              dispatch({
                                category: state.category.includes(category)
                                  ? state.category.filter((c) => c !== category)
                                  : [...state.category, category],
                                difficulty: state.difficulty,
                                type: state.type,
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
                            isSelected={state.type === type}
                            key={type}
                            onChange={() => {
                              dispatch({
                                category: state.category,
                                difficulty: state.difficulty,
                                type: type as any,
                              });
                            }}
                          >
                            {type}
                          </CheckboxButton>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <ChallengeList variant="compact" challenges={filtered} />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </BreadcrumbItem>
        </BreadcrumRoot>
        <div className="flex items-center gap-1">
          <IconButton
            variant="secondary"
            size="xs"
            disabled={!previousChallenge}
            onClick={() => router.push(`/challenges/${previousChallenge.path}`)}
          >
            <Icon name="chevron-left" />
          </IconButton>
          <IconButton
            variant="secondary"
            size="xs"
            disabled={!nextChallenge}
            onClick={() => router.push(`/challenges/${nextChallenge.path}`)}
          >
            <Icon name="chevron-right" />
          </IconButton>
        </div>
      </div>
    </>
  );
}
