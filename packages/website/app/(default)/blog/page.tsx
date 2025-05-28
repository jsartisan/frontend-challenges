import { getAllBlogs } from "@frontend-challenges/backend";

import { BlogList } from "~/components/interfaces/challenges/BlogList";

export default async function Page() {
  const blogs = await getAllBlogs();

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
