import path from "path";
import { unified } from "unified";
import remarkParse from "remark-parse";

import { loadFile } from "~/shared/lib/fs";
import { createFileMap } from "~/features/code-editor/lib/createFileMap";
import { SUPPORTED_TEMPLATES } from "~/entities/challenge/model/constants";
import { CodeFile, SupportedTemplates } from "~/entities/challenge/model/types";

export async function getCodeFilesByTemplate(filepath: string) {
  const { dir, ext, name } = path.parse(filepath);
  const data = {} as Record<SupportedTemplates, Record<string, CodeFile>>;

  for (const template of SUPPORTED_TEMPLATES) {
    const file = await loadFile(path.join(dir, `${name}.${template}${ext}`));

    if (file) {
      const result = unified().use(remarkParse).parse(file);

      data[template] = createFileMap(result);
    }
  }

  return data;
}
