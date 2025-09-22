import { getAllBlogs, getBlogBySlug } from "~/entities/blog/api";
import { BlogDetailPage } from "~/screens/blog/ui/BlogDetailPage";

export function generateStaticParams() {
  const posts = getAllBlogs();

  const transformedPosts = posts.map((p) => ({
    slug: p.slug,
  }));

  return transformedPosts;
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">) {
  const blog = await getBlogBySlug((await props.params).slug);
  return { title: blog.title };
}

export default BlogDetailPage;
