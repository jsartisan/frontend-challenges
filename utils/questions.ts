import YAML from "js-yaml";

import { REPO } from "@/constants";
import { FormValues } from "@/website/app/submit/question/client";
import { QuestionMetaInfo } from "@/types";

/**
 * parses meta info from the yaml file
 *
 * @param s
 * @returns
 */
export function parseMetaInfo(s: string): Partial<QuestionMetaInfo> | undefined {
  const object = YAML.load(s) as any;
  if (!object) return undefined;

  const arrayKeys = ["tags", "related"];

  for (const key of arrayKeys) {
    if (object[key]) {
      object[key] = (object[key] || "")
        .toString()
        .split(",")
        .map((i: string) => i.trim())
        .filter(Boolean);
    } else {
      object[key] = undefined;
    }
  }

  return object;
}

export const getSubmitChallengeURL = (values: FormValues) => {
  let body = ``;
  const { files, template, difficulty, tags, type, readme: readme, title, answer } = values;

  body += `## Info\n\n`;

  body += `\`\`\`yaml
difficulty: ${difficulty}
title: ${title}
type: ${type}\n`;

  if (type === "question") {
    body += `template: ${template}\n`;
  }

  body += `tags: ${tags}
\`\`\`\n\n`;

  body += `## Question\n\n`;
  body += `<!--question-start-->\n\n`;

  body += readme;

  body += `\n\n<!--question-end-->\n\n`;

  if (type === "question" && files && Object.keys(files).length > 0) {
    body += `## Template\n\n`;

    body += `<!--template-start-->\n\n`;

    Object.keys(files).map((filename) => {
      const file = files[filename];

      body += `${filename.replace("/", "")}\n`;
      body += "```";
      body += `${filename.split(".").pop()} ${filename.replace("/", "")}\n`;
      body += file.code;
      body += "\n```\n\n";
    });

    body += `\n\n<!--template-end-->\n\n`;
  }

  if (type === "quiz") {
    body += `## Solution\n\n`;

    body += `<!--solution-start-->\n\n`;

    body += answer;

    body += `\n\n<!--solution-end-->\n\n`;
  }

  const URL = `${REPO}/issues/new?template=new.md&labels=new-challenge,${type},${template}&title=${encodeURIComponent(
    `${title}`,
  )}&body=${encodeURIComponent(body)}`;

  return URL;
};
