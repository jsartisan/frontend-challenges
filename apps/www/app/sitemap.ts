import { MetadataRoute } from "next";

import { absoluteUrl } from "~/shared/lib/seo";
import { CATEGORIES } from "~/entities/category";
import { getRoadmaps } from "~/entities/roadmap/api";
import { getAllBlogs } from "~/entities/blog/api/getAllBlogs";
import { getChallenges } from "~/entities/challenge/api/getChallenges";
import { filterChallengesByCategory } from "~/entities/category/api/getChallengesByCategory";

export const dynamic = "force-static";

/**
 * Indexable, canonical content URLs only. Editor / playground / submit pages are intentionally left out.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const challenges = await getChallenges();
  const roadmaps = await getRoadmaps();
  const blogs = getAllBlogs();
  // only categories that actually have challenges
  const categories = CATEGORIES.filter((category) => filterChallengesByCategory(challenges, category).length > 0);

  return [
    { url: absoluteUrl("/") },
    { url: absoluteUrl("/challenges") },
    { url: absoluteUrl("/roadmaps") },
    { url: absoluteUrl("/blog") },
    ...categories.map((category) => ({
      url: absoluteUrl(`/categories/${category}`),
    })),
    ...roadmaps.map((roadmap) => ({
      url: absoluteUrl(`/roadmaps/${roadmap.path}`),
    })),
    ...challenges.map((challenge) => ({
      url: absoluteUrl(`/challenges/${challenge.path}`),
    })),
    ...blogs.map((blog) => ({
      url: absoluteUrl(`/${blog.path}`),
    })),
  ];
}
