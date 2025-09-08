import { unified } from "unified";
import remarkParse from "remark-parse";

import { REPO_API } from "~/shared/config/paths";
import { createFileMap } from "~/features/code-editor/lib/createFileMap";
import { SUPPORTED_TEMPLATES } from "~/entities/challenge/model/constants";
import { type CodeFile, SupportedTemplates, type Question } from "~/entities/challenge/model/types";

export const getAnswersOfQuestion = async (challenge: Question) => {
  const response = await fetch(`${REPO_API}/issues?labels=${challenge.no}`);
  const data = await response.json();

  const answers = [] as {
    files: Record<string, CodeFile>;
    title: string;
    no: number;
    url: string;
    author: string;
    author_url: string;
    author_avatar_url: string;
    template: SupportedTemplates;
  }[];

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
      } as const;

      const parsedRemark = unified().use(remarkParse).parse(datum.body);

      const files = {
        ...challenge.templateFiles[meta.template],
        ...createFileMap(parsedRemark),
      } as Record<string, CodeFile>;

      answers.push({
        files: files,
        ...meta,
      });
    }
  }

  return answers;
};
