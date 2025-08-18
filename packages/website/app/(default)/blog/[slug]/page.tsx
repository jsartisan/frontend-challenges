import * as React from "react";
import { Blog } from "@/shared";
import { Card } from "~/components/ui";
import { MDXComponent } from "~/components/common/MDXComponent";
import { bundleMarkdown, getAllBlogs, getBlogBySlug } from "@/backend";

export async function generateStaticParams() {
  const posts = await getAllBlogs();

  const transformedPosts = posts.map((p) => ({
    slug: p.slug,
  }));

  return transformedPosts;
}

export async function generateMetadata({ params }: { params: any }) {
  const source = await getBlogBySlug(params.slug);
  const { frontmatter, code } = await bundleMarkdown(source);
  const post = { ...frontmatter, code } as Blog;

  return { title: post.title };
}

export default async function Page(props: any) {
  const source = await getBlogBySlug(props.params.slug);
  const { frontmatter, code } = await bundleMarkdown(source);
  const post = { ...frontmatter, code } as Blog;

  return (
    <>
      <div className="flex flex-col gap-2 space-y-2">
        <div className="text-2xl">{post.emoji}</div>
        <h1 className="text-3xl font-bold">{post.title}</h1>
      </div>
      <div className="overflow-y-auto">
        <Card className="max-w-(--breakpoint-lg) mb-10 mt-6 p-6">
          <MDXComponent code={code} />
        </Card>
      </div>
    </>
  );
}
