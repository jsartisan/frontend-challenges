import { getAllBlogs } from "@/db/blogs";
import Footer from "@/components/layout/Footer";
import { BlogList } from "@/components/blog/BlogList";

export default async function Page() {
  const blogs = await getAllBlogs();

  return (
    <>
      <main className="h-full grow px-4 sm:px-6 md:order-1">
        <div className="mx-auto max-w-screen-xl">
          <div className="flex flex-col gap-2 space-y-2 pt-12">
            <div className="text-3xl font-bold">Blog</div>
            <div className="w-2/4 leading-relaxed text-gray-500">
              Learn about the latest frontend technologies and best practices.
            </div>
          </div>
          <div className="mt-10">
            <BlogList blogs={blogs} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
