import { BlogDetail } from "~/entities/blog/ui";
import { getBlogBySlug } from "~/entities/blog/api";

interface BlogDetailPageProps {
  params: {
    slug: string;
  };
}

async function BlogDetailPage(props: BlogDetailPageProps) {
  const { slug } = props.params;
  const blog = await getBlogBySlug(slug);

  return <BlogDetail blog={blog} />;
}

export { BlogDetailPage };
