import { getLocalStorageItem } from "~/shared/lib/localStorage";
import { TEMPLATES } from "~/entities/challenge/model/templates";
import { SupportedTemplates } from "~/entities/challenge/model/types";

import { getFilesFromLocalStorage } from "./getFilesFromLocalStorage";

export const getFilesFromURL = (searchParams: URLSearchParams, template: SupportedTemplates) => {
  const files = searchParams.get("code");

  if (files) {
    try {
      const parsedFiles = JSON.parse(files);

      return {
        ...TEMPLATES[template].files,
        ...parsedFiles,
      };
    } catch (e) {
      console.error(e);
    }
  }

  if (getLocalStorageItem(`/playground-${template}`, null)) {
    return getFilesFromLocalStorage(template);
  }

  return TEMPLATES[template].files;
};
