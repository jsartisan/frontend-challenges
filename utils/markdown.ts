import { bundleMDX } from "mdx-bundler";
import { visit } from "unist-util-visit";

export const bundleMarkdown = async (source: string) => {
  return (
    await bundleMDX({
      source: source,
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
    })
  ).code;
};
