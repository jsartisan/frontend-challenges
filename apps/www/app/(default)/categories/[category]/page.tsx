import { CATEGORIES } from "~/entities/category";
import { CategoryDetailPage } from "~/screens/categories";

export const revalidate = false;
export const dynamic = "force-static";

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    category,
  }));
}

export default CategoryDetailPage;
