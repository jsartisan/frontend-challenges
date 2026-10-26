import { JsonLd } from "~/shared/ui/JsonLd";
import { toDescription } from "~/shared/lib/seo";
import { blogPostJsonLd } from "~/shared/lib/structuredData";
import { BlogDetail } from "~/entities/blog/ui";
import { getBlogBySlug } from "~/entities/blog/api";

async function BlogDetailPage(props: PageProps<"/blog/[slug]">) {
  const slug = (await props.params).slug;
  const blog = await getBlogBySlug(slug);

  return (
    <>
      <JsonLd
        data={blogPostJsonLd({
          title: blog.title,
          description: toDescription(blog.excerpt ?? `${blog.title} - an article on Frontend Challenges.`),
          path: `/blog/${slug}`,
          publishedAt: blog.published_at,
        })}
      />
      <BlogDetail blog={blog} />
    </>
  );
}

export { BlogDetailPage };
