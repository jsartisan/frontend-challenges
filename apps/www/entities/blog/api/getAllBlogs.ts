import fs from "fs";
import path from "path";
import glob from "fast-glob";
import matter from "gray-matter";

import type { Blog } from "~/entities/blog/model/types";

import { CONTENT_PATH } from "~/shared/config/paths";

export const getAllBlogs = (): Blog[] => {
  const PATH = path.join(CONTENT_PATH, "blog");
  const paths = glob.sync(`${PATH}/**/*.md`);

  return paths
    .map((filePath) => {
      const source = fs.readFileSync(path.join(filePath), "utf8");
      const { data } = matter(source);

      return {
        ...data,
        slug: filePath.replace(`${PATH}/`, "").replace("/index.md", ""),
        path: filePath.replace(`${CONTENT_PATH.replace("./", "")}/`, "").replace("/index.md", ""),
      };
    })

    .sort((a: any, b: any) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))) as Blog[];
};
