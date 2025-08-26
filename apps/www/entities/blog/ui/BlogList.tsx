"use client";

import { Card, Link } from "~/components/ui";

import type { BlogListProps } from "../model";

/**
 * Displays a grid of blog post cards
 */
export function BlogList({ blogs }: BlogListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog) => (
        <Card key={blog.path} className="flex items-center space-x-6 px-4 py-4 md:px-6" role="listitem">
          <div className="flex grow flex-col gap-2">
            <div className="space-y-1">
              <div className="flex flex-col space-y-2">
                <div className="text-2xl">{blog.emoji}</div>
                <div className="text-xs font-medium text-gray-500">{blog.published_at}</div>
                <Link className="text-base font-medium hover:underline" href={`${blog.path}`}>
                  {blog.title}
                </Link>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
