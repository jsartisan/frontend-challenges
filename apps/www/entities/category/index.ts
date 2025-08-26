// API layer exports
export { getChallengesByCategory, filterChallengesByCategory } from "./api";

// Model layer exports
export type { Category } from "./model";
export { CATEGORIES } from "./model";

// UI layer exports
export { CategoryList } from "./ui";

// Lib layer exports
export { mapCategoriesWithCount } from "./lib/mapCategoriesWithCount";
