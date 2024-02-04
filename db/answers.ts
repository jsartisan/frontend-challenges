import axios from "axios";
import { unified } from "unified";
import remarkParse from "remark-parse";

import { createFileMap } from "@/utils";
import { SUPPORTED_TEMPLATES } from "@/constants";
import { CodeFile, Question, SupportedTemplates } from "@/types";

/**
 * get answers of question
 *
 * @param no
 * @param quiz
 * @returns
 */
export async function getAnswersOfQuestion(
  no: number,
  templateFiles: Record<SupportedTemplates, Record<string, CodeFile>>,
) {
  const answers: Question["answers"] = [];

  const { data } = await axios.get(
    `https://api.github.com/repos/jsartisan/frontend-challenges/issues?labels=answer,${no}`,
  );

  for (const datum of data) {
    if (datum.body) {
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
        ...templateFiles[meta.template],
        ...(await createFileMap(parsedRemark)),
      };

      answers.push({
        files: files,
        ...meta,
      });
    }
  }

  return answers;
}
