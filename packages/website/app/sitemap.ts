import { MetadataRoute } from "next";
import { DOMAIN } from "@frontend-challenges/shared";
import { getAllBlogs } from "@frontend-challenges/backend";
import { getChallenges } from "@frontend-challenges/backend";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const challenges = await getChallenges();
  const blogs = await getAllBlogs();

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
