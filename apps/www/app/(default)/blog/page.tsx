import { Metadata } from "next";

import { createPageMetadata } from "~/shared/lib/seo";
import { BlogListPage } from "~/screens/blog/ui/BlogListPage";

export const metadata: Metadata = createPageMetadata({
  title: "Blog | Frontend Challenges",
  description: "Articles and guides from the Frontend Challenges open source project.",
  path: "/blog",
});

export default BlogListPage;
