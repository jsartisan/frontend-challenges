import { Question, SupportedTemplates, TEMPLATES } from "@/shared";
import { useLocalStorage } from "./useLocalStorage";

export function useChallengeFiles(challenge: Question, template: SupportedTemplates) {
  const cachedFiles = useLocalStorage(`/challenges/${challenge.path}-${template}`);

  const allFiles = { ...TEMPLATES[template].files, ...challenge.templateFiles[template], ...cachedFiles };

  const availableFiles = Object.keys(allFiles)
    .filter((file) => !allFiles[file].hidden)
    .reduce((acc, file) => {
      acc[file] = allFiles[file];
      return acc;
    }, {});

  return { availableFiles, allFiles };
}
