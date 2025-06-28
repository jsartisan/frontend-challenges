import { MetadataRoute } from "next";
import { DOMAIN } from "@/shared";
import { getAllBlogs } from "@/backend";
import { getChallenges } from "@/backend";

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
