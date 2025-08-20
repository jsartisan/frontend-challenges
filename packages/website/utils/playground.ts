import { SUPPORTED_TEMPLATES, SupportedTemplates, TEMPLATES } from "@/shared";
import { getLocalStorageItem } from "./localStorage";

export const getTemplateFromURL = (searchParams: URLSearchParams): SupportedTemplates => {
  const template = searchParams.get("template");

  if (template && SUPPORTED_TEMPLATES.includes(template as SupportedTemplates)) {
    return template as SupportedTemplates;
  }

  if (
    getLocalStorageItem("playground-template", null) &&
    SUPPORTED_TEMPLATES.includes(getLocalStorageItem("playground-template", null) as SupportedTemplates)
  ) {
    return getLocalStorageItem("playground-template", "vanilla") as SupportedTemplates;
  }

  return "vanilla";
};

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

export const formatFileName = (fileName: string) => {
  return fileName.replace(/^\//, "");
};
