import { CATEGORIES } from "~/entities/category";
import { CategoryDetailPage } from "~/screens/categories";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    category,
  }));
}

export default CategoryDetailPage;
