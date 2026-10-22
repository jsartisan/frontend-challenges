import { Metadata } from "next";

import { createPageMetadata } from "~/shared/lib/seo";
import { CATEGORIES, getChallengesByCategory } from "~/entities/category";
import { CATEGORY_METADATA } from "~/entities/category/config/metadata";
import { CategoryDetailPage } from "~/screens/categories";

export const dynamic = "force-static";

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    category,
  }));
}

export async function generateMetadata(props: PageProps<"/categories/[category]">): Promise<Metadata> {
  const category = (await props.params).category as (typeof CATEGORIES)[number];
  const { title, description } = CATEGORY_METADATA[category];
  const challenges = await getChallengesByCategory(category);

  return createPageMetadata({
    title: `${title} Challenges | Frontend Challenges`,
    description: `${description} Browse ${challenges.length} ${title} challenges on Frontend Challenges.`,
    path: `/categories/${category}`,
  });
}

export default CategoryDetailPage;
