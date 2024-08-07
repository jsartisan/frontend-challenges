import { bundleMDX } from "mdx-bundler";
import { visit } from "unist-util-visit";
import { Challenge } from "@frontend-challenges/shared";

export const bundleMarkdown = async (source: string) => {
  return await bundleMDX({
    source: source,
    mdxOptions(options) {
      options.remarkPlugins = [...(options.remarkPlugins ?? [])];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        function rehypeMetaAsAttributes() {
          return (tree) => {
            visit(tree, "element", (node) => {
              if (node.tagName === "code" && node.data && node.data.meta) {
                node.properties.meta = node.data.meta;
              }
            });
          };
        },
      ];

      return options;
    },
  });
};

export const bundleMarkdownOfChallenge = async (challenge: Challenge) => {
  if (challenge.type === "quiz") {
    for (const locale of Object.keys(challenge.readme)) {
      challenge.readme[locale] = (await bundleMarkdown(challenge.readme[locale])).code;
    }

    for (const locale of Object.keys(challenge.solution)) {
      challenge.solution[locale] = (await bundleMarkdown(challenge.solution[locale])).code;
    }

    return challenge;
  }

  for (const locale of Object.keys(challenge.readme)) {
    challenge.readme[locale] = (await bundleMarkdown(challenge.readme[locale])).code;
  }

  return challenge;
};
