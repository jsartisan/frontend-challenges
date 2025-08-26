import { MetadataRoute } from "next";

import { DOMAIN } from "~/shared/config/paths";
import { getAllBlogs } from "~/entities/blog/api/getAllBlogs";
import { getChallenges } from "~/entities/challenge/api/getChallenges";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const challenges = await getChallenges();
  const blogs = getAllBlogs();

  return [
    {
      url: DOMAIN,
    },
    {
      url: `${DOMAIN}/challenges`,
    },
    {
      url: `${DOMAIN}/blog`,
    },
    ...challenges.map((challenge) => ({
      url: `${DOMAIN}/challenges/${challenge.path}`,
    })),
    ...blogs.map((blog) => ({
      url: `${DOMAIN}/${blog.path}`,
    })),
  ];
}
