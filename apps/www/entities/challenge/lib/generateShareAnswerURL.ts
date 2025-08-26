import type { SandpackState } from "@codesandbox/sandpack-react";

import { REPO } from "~/shared/config/paths";
import { DEFAULT_LOCALE } from "~/shared/config/locale";
import { SupportedLocales } from "~/shared/config/locale";
import { TEMPLATES } from "~/entities/challenge/model/templates";
import { Challenge, SupportedTemplates } from "~/entities/challenge/model/types";

export const generateShareAnswerURL = (props: {
  challenge: Challenge;
  locale?: SupportedLocales;
  files?: SandpackState["files"];
  template?: SupportedTemplates;
}) => {
  const { challenge, files, locale = "en", template } = props;
  const BASE_URL = `${REPO}/issues/new?template=answer.md&labels=answer,${challenge.no}`;

  if (challenge.type === "quiz" || challenge.type === "theory") {
    return;
  }

  let readme = ``;

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  files &&
    template &&
    Object.keys(files).map((filename) => {
      const file = files[filename];

      // skipping tsconfig.json because it will be never changed
      if (filename === "/tsconfig.json") {
        return;
      }

      // adding explicit check for package.json because of special characters like /n
      if (filename === "/package.json") {
        const templatePackageJSON = JSON.stringify(JSON.parse(file.code), null, 2);
        const questionPackageJSON = JSON.stringify(
          JSON.parse(
            {
              ...TEMPLATES[template].files,
              ...challenge?.templateFiles[template],
            }[filename]?.code,
          ),
          null,
          2,
        );

        if (templatePackageJSON !== questionPackageJSON) {
          readme += `${filename.replace("/", "")}\n`;
          readme += "```";
          readme += `${filename.split(".").pop()} ${filename.replace("/", "")}\n`;
          readme += file.code;
          readme += "\n```\n\n";
        }

        return;
      }

      const isFileChanged =
        file.code !==
        {
          ...TEMPLATES[template].files,
          ...challenge?.templateFiles[template],
        }[filename]?.code;

      if (isFileChanged) {
        readme += `${filename.replace("/", "")}\n`;
        readme += "```";
        readme += `${filename.split(".").pop()} ${filename.replace("/", "")}\n`;
        readme += file.code;
        readme += "\n```\n\n";
      }
    });

  if (locale && locale !== DEFAULT_LOCALE) {
    return `${BASE_URL},${encodeURIComponent(locale)},${template}&title=${encodeURIComponent(
      `${challenge?.no} - ${challenge?.info.en?.title} - ${template}`,
    )}&body=${encodeURIComponent(readme)}`;
  }

  const URL = `${BASE_URL},${template}&title=${encodeURIComponent(
    `${challenge?.no} - ${challenge?.info.en?.title} - ${template}`,
  )}&body=${encodeURIComponent(readme)}`;

  return URL;
};
