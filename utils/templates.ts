import path from "path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import { Root, RootContent } from "mdast";

import { loadFile } from "@/utils";
import { SUPPORTED_TEMPLATES } from "@/constants";
import { CodeFile, SupportedTemplates } from "@/types";

/**
 * get code files group by template (vanilla, react, vue, etc)
 *
 * @param filepath
 * @returns
 */
export async function getCodeFilesByTemplate(filepath: string) {
  const { ext, dir, name } = path.parse(filepath);
  const data = {} as Record<SupportedTemplates, Record<string, CodeFile>>;

  for (const template of SUPPORTED_TEMPLATES) {
    const file = await loadFile(path.join(dir, `${name}.${template}${ext}`));

    if (file) {
      const result = await unified().use(remarkParse).parse(file);

      data[template] = createFileMap(result);
    }
  }

  return data;
}

/**
 * creates a map of file paths to file contents from a markdown AST
 *
 * @param root
 * @returns
 */
export const createFileMap = (root: Root) => {
  const result = {} as Record<string, CodeFile>;

  root.children.map((child: RootContent) => {
    if (child.type !== "code") return;

    let filePath; // path in the folder structure
    let fileHidden = false; // if the file is available as a tab
    let fileActive = false; // if the file tab is shown by default
    let fileReadOnly = false; // if the file is read only

    if (child.meta) {
      const [name, ...params] = child.meta.split(" ");
      filePath = "/" + name;
      if (params.includes("hidden")) {
        fileHidden = true;
      }
      if (params.includes("active")) {
        fileActive = true;
      }

      if (params.includes("readOnly")) {
        fileReadOnly = true;
      }
    } else {
      if (child.lang === "js") {
        filePath = "/App.js";
      } else if (child.lang === "css") {
        filePath = "/styles.css";
      } else {
        throw new Error(`Code block is missing a filename`);
      }
    }
    if (result[filePath]) {
      throw new Error(`File ${filePath} was defined multiple times. Each file snippet should have a unique path name`);
    }

    result[filePath] = {
      code: (child.value || "") as string,
      hidden: fileHidden,
      active: fileActive,
      readOnly: fileReadOnly,
    };
  });

  return result;
};
