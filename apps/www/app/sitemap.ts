import { MetadataRoute } from "next";

import type { ChallengeSlim } from "~/entities/challenge/model/types";

import { absoluteUrl } from "~/shared/lib/seo";
import { CATEGORIES } from "~/entities/category";
import { toIsoDate } from "~/shared/lib/structuredData";
import { getRoadmaps } from "~/entities/roadmap/api";
import { DEFAULT_LOCALE } from "~/shared/config/locale";
import { getAllBlogs } from "~/entities/blog/api/getAllBlogs";
import { getChallenges } from "~/entities/challenge/api/getChallenges";
import { filterChallengesByCategory } from "~/entities/category/api/getChallengesByCategory";

export const dynamic = "force-static";

function challengeDate(challenge: ChallengeSlim) {
  return toIsoDate(challenge.info?.[DEFAULT_LOCALE]?.published_date);
}

/**
 * Latest date in the list. A hub page lists its challenges, so it changes whenever a newer challenge is added;
 * that newest published_date is an honest lastmod for it.
 */
function latest(dates: (string | undefined)[]) {
  const valid = dates.filter((date): date is string => Boolean(date)).sort();

  return valid.length ? valid[valid.length - 1] : undefined;
}

/**
 * Indexable, canonical content URLs only. Editor / playground / submit pages are intentionally left out.
 * `lastModified` comes from content dates (never build time), so Google can trust it to schedule recrawls.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const challenges = await getChallenges();
  const roadmaps = await getRoadmaps();
  const blogs = getAllBlogs();
  // only categories that actually have challenges
  const categories = CATEGORIES.filter((category) => filterChallengesByCategory(challenges, category).length > 0);

  const newestChallenge = latest(challenges.map(challengeDate));
  const newestBlog = latest(blogs.map((blog) => toIsoDate(blog.published_at)));

  const entry = (path: string, lastModified?: string) => ({
    url: absoluteUrl(path),
    ...(lastModified ? { lastModified } : {}),
  });

  return [
    entry("/", newestChallenge),
    entry("/challenges", newestChallenge),
    entry("/roadmaps"),
    entry("/blog", newestBlog),
    ...categories.map((category) =>
      entry(
        `/categories/${category}`,
        latest(filterChallengesByCategory(challenges, category).map(challengeDate)),
      ),
    ),
    ...roadmaps.map((roadmap) =>
      entry(
        `/roadmaps/${roadmap.path}`,
        latest(roadmap.topics.flatMap((topic) => topic.challenges.map(challengeDate))),
      ),
    ),
    ...challenges.map((challenge) => entry(`/challenges/${challenge.path}`, challengeDate(challenge))),
    ...blogs.map((blog) => entry(`/${blog.path}`, toIsoDate(blog.published_at))),
  ];
}
