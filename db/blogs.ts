import fs from "fs";
import path from "path";
import glob from "fast-glob";
import { Blog } from "@/types";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";
import { CONTENT_PATH } from "@/constants";
import { visit } from "unist-util-visit";

export const getAllBlogs = (): Blog[] => {
  const PATH = path.join(CONTENT_PATH, "blog");
  const paths = glob.sync(`${PATH}/**/*.mdx`);

  return paths
    .map((filePath) => {
      const source = fs.readFileSync(path.join(filePath), "utf8");
      const { data } = matter(source);

      return {
        ...data,
        slug: filePath.replace(`${PATH}/`, "").replace("/index.mdx", ""),
        path: filePath.replace(`${CONTENT_PATH}/`, "").replace("/index.mdx", ""),
      };
    })

    .sort((a: any, b: any) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))) as Blog[];
};

export const getBlogBySlug = async (slug: string) => {
  const source = fs.readFileSync(path.join(CONTENT_PATH, "blog", `${slug}/index.mdx`), "utf8");
  const { code, frontmatter } = await bundleMDX({
    source: source,
    cwd: path.join(CONTENT_PATH, "blog", slug),
    mdxOptions(options) {
      options.remarkPlugins = [...(options.remarkPlugins ?? [])];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? [
          function rehypeMetaAsAttributes() {
            return (tree) => {
              visit(tree, "element", (node) => {
                if (node.tagName === "code" && node.data && node.data.meta) {
                  node.properties.meta = node.data.meta;
                }
              });
            };
          },
        ]),
      ];

      return options;
    },
  });

  return {
    ...frontmatter,
    code,
  } as Blog;
};
