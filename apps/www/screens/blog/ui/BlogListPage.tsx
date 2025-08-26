import { BlogList } from "~/entities/blog/ui";
import { getAllBlogs } from "~/entities/blog/api";

function BlogListPage() {
  const blogs = getAllBlogs();

  return (
    <>
      <div className="flex flex-col gap-2 space-y-2">
        <div className="text-3xl font-bold">Blog</div>
        <div className="w-2/4 leading-relaxed text-gray-500">
          Learn about the latest frontend technologies and best practices.
        </div>
      </div>
      <div className="mt-6">
        <BlogList blogs={blogs} />
      </div>
    </>
  );
}

export { BlogListPage };
