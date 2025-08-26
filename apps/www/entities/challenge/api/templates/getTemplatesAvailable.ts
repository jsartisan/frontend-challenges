import path from "path";

import { loadFile } from "~/shared/lib/fs";
import { SupportedTemplates } from "~/entities/challenge/model/types";
import { SUPPORTED_TEMPLATES } from "~/entities/challenge/model/constants";

export async function getTemplatesAvailable(filepath: string): Promise<SupportedTemplates[]> {
  const { dir, ext, name } = path.parse(filepath);
  const data = [] as SupportedTemplates[];

  for (const template of SUPPORTED_TEMPLATES) {
    const file = await loadFile(path.join(dir, `${name}.${template}${ext}`));

    if (file) {
      data.push(template);
    }
  }

  return data;
}
