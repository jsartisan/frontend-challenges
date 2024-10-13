import {
  Challenge,
  DEFAULT_LOCALE,
  Question,
  REPO,
  REPO_API,
  SUPPORTED_TEMPLATES,
  SupportedLocales,
  SupportedTemplates,
  TEMPLATES,
  createFileMap,
} from "@frontend-challenges/shared";
import { unified } from "unified";
import remarkParse from "remark-parse";
import { SandpackState } from "@codesandbox/sandpack-react";

export const getAnswersOfQuestion = async (challenge: Question) => {
  const response = await fetch(`${REPO_API}/issues?labels=${challenge.no}`);
  const data = await response.json();

  const answers = [];

  for (const datum of data) {
    if (datum.body && datum.labels.some((label) => label.name === "answer")) {
      const meta = {
        title: datum.title,
        no: datum.number,
        url: datum.html_url,
        author: datum.user?.login || "jsartisan",
        author_url: datum.user?.html_url || "https://github.com/jsartisan",
        author_avatar_url: datum.user?.avatar_url || "https://avatars.githubusercontent.com/u/10251037?v=4",
        template:
          datum.labels
            .map((label) => {
              if (typeof label === "object") {
                return label.name as SupportedTemplates;
              }

              return label as SupportedTemplates;
            })
            .find((label) => SUPPORTED_TEMPLATES.includes(label)) || "react",
      };

      const parsedRemark = await unified().use(remarkParse).parse(datum.body);

      const files = {
        ...challenge.templateFiles[meta.template],
        ...(await createFileMap(parsedRemark)),
      };

      answers.push({
        files: files,
        ...meta,
      });
    }
  }

  return answers;
};

/**
 * returns the url for submitting a new question (repo)
 * which is a github issue
 *
 * @param props
 * @returns
 */
export const getShareAnswerURL = (props: {
  challenge: Challenge;
  locale?: SupportedLocales;
  files?: SandpackState["files"];
  template?: SupportedTemplates;
}) => {
  const { challenge, files, template, locale = "en" } = props;
  const BASE_URL = `${REPO}/issues/new?template=answer.md&labels=answer,${challenge.no}`;

  if (challenge.type === "quiz") {
    return `${BASE_URL},quiz&title=${encodeURIComponent(
      `${challenge.no} - ${challenge.info[locale]?.title} - ${template}`,
    )}`;
  }

  let readme = ``;

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
