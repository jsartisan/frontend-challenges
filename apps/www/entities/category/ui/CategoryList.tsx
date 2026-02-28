import { Card, Icon, Link } from "~/components/ui";
import { mapCategoriesWithCount } from "~/entities/category/lib/mapCategoriesWithCount";

type CategoryListProps = {
  categories: ReturnType<typeof mapCategoriesWithCount>;
};

export function CategoryList(props: CategoryListProps) {
  const { categories } = props;

  return (
    <div className="mb-12 mt-12 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
      {categories.map((category) => (
        <Link
          prefetch={false}
          href={`/categories/${category.name}`}
          className="rounded"
          key={`category-${category.name}`}
        >
          <Card className="hover:bg-accent flex items-center gap-3 p-3">
            <Icon name={`${category.name}-color`} size="lg" />
            <div>
              <h3 className="text-lg font-bold capitalize">{category.name === "css" ? "CSS" : category.name}</h3>
              <p className="text-muted-foreground">{category.challengesCount} Challenges</p>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
