import YAML from "js-yaml";
import { SandpackState } from "@codesandbox/sandpack-react";

import { REPO } from "@/constants";
import { TEMPLATES } from "@/templates";
import { FormValues } from "@/app/submit/client";
import { QuestionMetaInfo, SupportedTemplates } from "@/types";

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
  const { files, template, difficulty, tags, readme: readme, title } = values;

  body += `## Info\n\n`;

  body += `\`\`\`yaml
difficulty: ${difficulty}
title: ${title}
template: ${template}
tags: ${tags}
\`\`\`\n\n`;

  body += `<!--question-start-->\n\n`;

  body += `## Question\n\n`;

  body += readme;

  body += `\n\n<!--question-end-->\n\n`;

  if (files && Object.keys(files).length > 0) {
    body += `<!--template-start-->\n\n`;

    body += `## Template\n\n`;

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
  const URL = `${REPO}/issues/new?labels=new-challenge,${template}&title=${encodeURIComponent(
    `${title}`,
  )}&body=${encodeURIComponent(body)}`;

  return URL;
};
