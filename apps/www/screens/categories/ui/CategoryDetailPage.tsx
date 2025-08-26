import type { Category } from "~/entities/category/model/types";

import { getChallengesByCategory } from "~/entities/category/api";
import CompletionStats from "~/entities/completions/ui/CompletionStats";
import { ChallengeListWithFilters } from "~/entities/challenge/ui/ChallengeListWithFilters";

interface CategoryDetailPageProps {
  params: {
    category: Category;
  };
}

async function CategoryDetailPage(props: CategoryDetailPageProps) {
  const { category } = props.params;
  const challengesByCategory = await getChallengesByCategory(category);

  return (
    <>
      <header className="flex justify-between">
        <div>
          <div className="text-3xl font-bold">Challenges</div>
          <p className="text-(--color-fg-neutral) w-full pb-6 pt-3 leading-relaxed md:w-2/4">
            Frontend Challenges is a collection of frontend interview questions and answers. It is designed to help you
            prepare for frontend interviews. It&apos;s free and open source.
          </p>
        </div>
        <CompletionStats challenges={challengesByCategory} />
      </header>
      <ChallengeListWithFilters challenges={challengesByCategory} />
    </>
  );
}

export { CategoryDetailPage };
