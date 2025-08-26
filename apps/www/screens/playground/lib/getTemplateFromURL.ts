import { getLocalStorageItem } from "~/shared/lib/localStorage";
import { SupportedTemplates } from "~/entities/challenge/model/types";
import { SUPPORTED_TEMPLATES } from "~/entities/challenge/model/constants";

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
