import { DOMAIN } from "@/constants";
import { getAllBlogs } from "@/utils/blogs";
import { getChallenges } from "@/utils/challenges";
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
