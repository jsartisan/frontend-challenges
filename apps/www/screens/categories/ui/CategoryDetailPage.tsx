import type { Category } from "~/entities/category/model/types";

import { Icon } from "~/components/ui/icon";
import { getChallengesByCategory } from "~/entities/category/api";
import CompletionStats from "~/entities/completions/ui/CompletionStats";
import { CATEGORY_METADATA } from "~/entities/category/config/metadata";
import { SyncCategoryToSession } from "~/entities/challenge/ui/SyncCategoryToSession";
import { ChallengeListWithFilters } from "~/entities/challenge/ui/ChallengeListWithFilters";

async function CategoryDetailPage(props: PageProps<"/categories/[category]">) {
  const category = (await props.params).category as Category;
  const challengesByCategory = await getChallengesByCategory(category);

  return (
    <>
      <SyncCategoryToSession category={category} />
      <header className="flex justify-between">
        <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] gap-2 pb-8">
          <Icon name={CATEGORY_METADATA[category].icon} size="lg" className="row-span-2 me-2" />
          <div className="text-3xl font-bold">{CATEGORY_METADATA[category].title} Challenges</div>
          <p className="text-(--color-fg-subtle) row-span-1 w-full leading-relaxed">
            {CATEGORY_METADATA[category].description}
          </p>
        </div>
        <CompletionStats challenges={challengesByCategory} />
      </header>
      <ChallengeListWithFilters challenges={challengesByCategory} excludes={["category"]} />
    </>
  );
}

export { CategoryDetailPage };
