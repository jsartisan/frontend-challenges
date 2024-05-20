import * as React from "react";
import { getAllBlogs, getBlogBySlug } from "@/db/blogs";

import Client from "./client";

export async function generateStaticParams() {
  const posts = await getAllBlogs();

  const transformedPosts = posts.map((p) => ({
    slug: p.slug,
  }));

  return transformedPosts;
}

export async function generateMetadata({ params }: { params: any }) {
  const post = await getBlogBySlug(params.slug);

  return { title: post.title };
}

export default async function Page(props: any) {
  const blog = await getBlogBySlug(props.params.slug);

  return <Client blog={blog} />;
}
