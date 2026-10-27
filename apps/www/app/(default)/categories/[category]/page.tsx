import { Metadata } from "next";

import { createPageMetadata } from "~/shared/lib/seo";
import { CategoryDetailPage } from "~/screens/categories";
import { CATEGORY_METADATA } from "~/entities/category/config/metadata";
import { CATEGORIES, getChallengesByCategory } from "~/entities/category";

export const dynamic = "force-static";

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    category,
  }));
}

export async function generateMetadata(props: PageProps<"/categories/[category]">): Promise<Metadata> {
  const category = (await props.params).category as (typeof CATEGORIES)[number];
  const { description, heading, title } = CATEGORY_METADATA[category];
  const challenges = await getChallengesByCategory(category);

  return createPageMetadata({
    title: `${heading} | Frontend Challenges`,
    description: `Practice ${challenges.length} ${title} interview questions as hands-on coding challenges with tests. ${description}`,
    path: `/categories/${category}`,
  });
}

export default CategoryDetailPage;
