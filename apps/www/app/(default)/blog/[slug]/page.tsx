import { Metadata } from "next";

import { toDescription, createPageMetadata } from "~/shared/lib/seo";
import { getAllBlogs, getBlogBySlug } from "~/entities/blog/api";
import { BlogDetailPage } from "~/screens/blog/ui/BlogDetailPage";

export function generateStaticParams() {
  const posts = getAllBlogs();

  const transformedPosts = posts.map((p) => ({
    slug: p.slug,
  }));

  return transformedPosts;
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const slug = (await props.params).slug;
  const blog = await getBlogBySlug(slug);
  const published = blog.published_at ? new Date(blog.published_at) : undefined;

  return createPageMetadata({
    title: blog.title,
    description: toDescription(blog.excerpt ?? `${blog.title} - an article on Frontend Challenges.`),
    path: `/blog/${slug}`,
    type: "article",
    publishedTime: published && !Number.isNaN(published.getTime()) ? published.toISOString() : undefined,
  });
}

export default BlogDetailPage;
