import { getAllBlogs } from "@/db/blogs";
import Footer from "@/components/layout/Footer";
import { BlogList } from "@/components/blog/BlogList";
import { Layout } from "@/components/layout/Layout";

export default async function Page() {
  const blogs = await getAllBlogs();

  return (
    <>
      <Layout>
        <div className="flex flex-col gap-2 space-y-2 pt-12">
          <div className="text-3xl font-bold">Blog</div>
          <div className="w-2/4 leading-relaxed text-gray-500">
            Learn about the latest frontend technologies and best practices.
          </div>
        </div>
        <div className="mt-6">
          <BlogList blogs={blogs} />
        </div>
      </Layout>
      <Footer />
    </>
  );
}
