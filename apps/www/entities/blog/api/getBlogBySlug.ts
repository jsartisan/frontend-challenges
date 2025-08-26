import fs from "fs";
import path from "path";

import type { Blog } from "~/entities/blog/model/types";

import { CONTENT_PATH } from "~/shared/config/paths";
import { bundleMarkdown } from "~/shared/lib/bundleMarkdown";

export const getBlogBySlug = async (slug: string) => {
  const source = fs.readFileSync(path.join(CONTENT_PATH, "blog", `${slug}/index.md`), "utf8");
  const { code, frontmatter } = await bundleMarkdown(source);

  return { ...frontmatter, code } as Blog;
};
