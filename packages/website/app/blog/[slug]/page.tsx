import * as React from "react";
import { Blog } from "@/shared";
import { getAllBlogs, getBlogBySlug } from "@frontend-challenges/backend";

import Client from "./client";
import { bundleMarkdown } from "../../../utils/markdown";

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

  return <Client blog={post} />;
}
