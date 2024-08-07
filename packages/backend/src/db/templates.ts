import path from "path";
import { unified } from "unified";
import remarkParse from "remark-parse";

import { loadFile } from "./fs";
import { CodeFile, SupportedTemplates } from "@frontend-challenges/shared";
import { createFileMap, SUPPORTED_TEMPLATES } from "@frontend-challenges/shared";

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
