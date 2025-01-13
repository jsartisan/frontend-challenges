import { Card, Icon, Link } from "../ui";

import { getCategoriesWithChallengesCount } from "@/web/utils/categories";

type CategoryListProps = {
  categories: ReturnType<typeof getCategoriesWithChallengesCount>;
};

export function CategoryList(props: CategoryListProps) {
  const { categories } = props;

  return (
    <div className="mb-10 mt-4 grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-4">
      {categories.map((category) => (
        <Link
          prefetch={false}
          href={`/categories/${category.name}`}
          className="rounded "
          key={`category-${category.name}`}
        >
          <Card className="flex items-center gap-3 p-3 hover:bg-[var(--color-bg-hover)]">
            <Icon name={`${category.name}-color`} size="lg" />
            <div>
              <h3 className="text-lg font-bold capitalize">{category.name === "css" ? "CSS" : category.name}</h3>
              <p className="text-[var(--color-fg-subtle)]">{category.challengesCount} Challenges</p>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
