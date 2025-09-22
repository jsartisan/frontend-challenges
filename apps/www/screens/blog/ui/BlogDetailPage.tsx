import { BlogDetail } from "~/entities/blog/ui";
import { getBlogBySlug } from "~/entities/blog/api";

async function BlogDetailPage(props: PageProps<"/blog/[slug]">) {
  const blog = await getBlogBySlug((await props.params).slug);

  return <BlogDetail blog={blog} />;
}

export { BlogDetailPage };
