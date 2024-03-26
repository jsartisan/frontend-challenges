import * as React from "react";
import { getAllBlogs, getBlogBySlug } from "@/db/blogs";

import Client from "./client";
import { getChallenges } from "@/db/challenge";
import { Header } from "@/components/layout/Header";

export async function generateStaticParams() {
  const posts = await getAllBlogs();

  const transformedPosts = posts.map((p) => ({
    slug: p.slug,
  }));

  return transformedPosts;
}

export default async function Page(props: any) {
  const blog = await getBlogBySlug(props.params.slug);
  const challenges = await getChallenges();

  return (
    <>
      <Header challenges={challenges.map((challenge) => ({ path: challenge.path, title: challenge.info.en?.title }))} />
      <Client blog={blog} />
    </>
  );
}

export async function generateMetadata({ params }: { params: any }) {
  const post = await getBlogBySlug(params.slug);

  return { title: post.title };
}
