import { unified } from "unified";
import { Octokit } from "octokit";
import remarkParse from "remark-parse";

import { createFileMap } from "@frontend-challenges/shared";
import { SUPPORTED_TEMPLATES } from "@frontend-challenges/shared";
import { CodeFile, Question, SupportedTemplates } from "@frontend-challenges/shared";

const octokit = new Octokit({
  auth: process.env.GITHUB_PAT,
});

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

  try {
    const { data } = await octokit.request("GET /repos/{owner}/{repo}/issues", {
      owner: "jsartisan",
      repo: "frontend-challenges",
      labels: `${no},answer`,
      state: "all",
    });

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
  } catch {
    console.error("Failed at fetching answers");
  }

  return answers;
}
