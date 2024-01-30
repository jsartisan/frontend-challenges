import { SandpackState } from "@codesandbox/sandpack-react";

import { TEMPLATES } from "@/templates";
import { DEFAULT_LOCALE, DOMAIN, REPO } from "@/constants";
import { Question, SupportedLocale, SupportedTemplates } from "@/types";

export const PLAYGROUND = `${DOMAIN}/play`;

/**
 * get question 's readme url (repo)
 * @param quiz
 * @param locale
 * @param absolute
 * @returns
 */
export function getQuestionREADME(quiz: Question, locale?: string, absolute = false) {
  const prefix = absolute ? `${REPO}/blob/main` : ".";
  return locale && locale !== DEFAULT_LOCALE && quiz.readme[locale]
    ? `${prefix}/questions/${quiz.path}/README.${locale}.md`
    : `${prefix}/questions/${quiz.path}/README.md`;
}

export function toNearborREADME(quiz: Question, locale?: string) {
  return locale && locale !== DEFAULT_LOCALE && quiz.readme[locale] ? `./README.${locale}.md` : "./README.md";
}

export function toReadmeShort(no: number, locale?: string) {
  return locale !== DEFAULT_LOCALE ? `${DOMAIN}/${no}/${locale}` : `${DOMAIN}/${no}`;
}

/**
 * get questions url (site)
 *
 * @param path
 * @returns
 */
export function getQuestionURL(path: string) {
  return `${DOMAIN}/questions/${path}`;
}

/**
 * get question's solution url (repo)
 *
 * @param no
 * @returns
 */
export function getSolutionsURL(no: number) {
  return `${REPO}/issues?q=label%3A${no}+label%3Aanswer+sort%3Areactions-%2B1-desc`;
}

/**
 * returns the url for submitting a new question (repo)
 * which is a github issue
 *
 * @param props
 * @returns
 */
export const getShareAnswerURL = (props: {
  question: Question;
  locale?: SupportedLocale;
  files?: SandpackState["files"];
  template?: SupportedTemplates;
}) => {
  const { question, files, template, locale = "en" } = props;

  let readme = ``;

  files &&
    template &&
    Object.keys(files).map((filename) => {
      const file = files[filename];

      // adding explicit check for package.json because of special characters like /n
      if (filename === "/package.json") {
        const templatePackageJSON = JSON.stringify(JSON.parse(file.code), null, 2);
        const questionPackageJSON = JSON.stringify(
          JSON.parse(
            {
              ...TEMPLATES[template].files,
              ...question?.templateFiles[template],
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
          ...question?.templateFiles[template],
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
    return `${REPO}/issues/new?labels=answer,${question.no},${encodeURIComponent(
      locale,
    )},${template}&title=${encodeURIComponent(
      `${question?.no} - ${question?.info.en?.title}`,
    )}&body=${encodeURIComponent(readme)}`;
  }

  const URL = `${REPO}/issues/new?labels=answer,${question.no},${template}&title=${encodeURIComponent(
    `${question?.no} - ${question?.info.en?.title}`,
  )}&body=${encodeURIComponent(readme)}`;

  return URL;
};
