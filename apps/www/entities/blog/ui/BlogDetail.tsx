"use client";

import { Card } from "~/components/ui";
import { MDXComponent } from "~/shared/ui/mdx/MDXComponent";

import type { BlogDetailProps } from "../model";

/**
 * Displays a single blog post with its content
 */
export function BlogDetail({ blog }: BlogDetailProps) {
  return (
    <>
      <div className="flex flex-col gap-2 space-y-2">
        <div className="text-2xl">{blog.emoji}</div>
        <h1 className="text-3xl font-bold">{blog.title}</h1>
      </div>
      <div className="overflow-y-auto">
        <Card className="max-w-(--breakpoint-lg) mb-10 mt-6 p-6">
          <MDXComponent code={blog.code} />
        </Card>
      </div>
    </>
  );
}
