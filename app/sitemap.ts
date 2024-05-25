import { DOMAIN } from "@/constants";
import { getAllBlogs } from "@/db/blogs";
import { getChallenges } from "@/db/challenge";
import { MetadataRoute } from "next";

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
