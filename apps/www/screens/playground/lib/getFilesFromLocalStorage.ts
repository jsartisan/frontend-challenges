import { getLocalStorageItem } from "~/shared/lib/localStorage";
import { TEMPLATES } from "~/entities/challenge/model/templates";
import { SupportedTemplates } from "~/entities/challenge/model/types";

export const getFilesFromLocalStorage = (template: SupportedTemplates) => {
  try {
    const parsedFiles = getLocalStorageItem(`/playground-${template}`, null);

    return {
      ...TEMPLATES[template].files,
      ...parsedFiles,
    };
  } catch (e) {
    console.error(e);

    return TEMPLATES[template].files;
  }
};
