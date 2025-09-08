import type { CodeFile, Question, SupportedTemplates } from "~/entities/challenge/model/types";

import { getLocalStorageItem } from "~/shared/lib/localStorage";
import { TEMPLATES } from "~/entities/challenge/model/templates";

export function useChallengeFiles(challenge: Question, template: SupportedTemplates) {
  const cachedFiles = getLocalStorageItem(`/challenges/${challenge.path}-${template}`, {}) as Record<string, CodeFile>;

  const allFiles = { ...TEMPLATES[template].files, ...challenge.templateFiles[template], ...cachedFiles } as Record<
    string,
    CodeFile
  >;

  const availableFiles = Object.keys(allFiles)
    .filter((file) => !allFiles[file].hidden)
    .reduce((acc, file) => {
      acc[file] = allFiles[file];
      return acc;
    }, {});

  return { availableFiles, allFiles };
}
