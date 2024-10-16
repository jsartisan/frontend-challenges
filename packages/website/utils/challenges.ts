import { Challenge, REPO, TEMPLATES } from "@frontend-challenges/shared";
import { DEFAULT_LOCALE, DIFFICULTY_RANK } from "@frontend-challenges/shared";

import { FormValues } from "../app/submit/question/client";

export function sortChallengesByDate(challenges: Challenge[], sort_order?: "asc" | "desc") {
  return challenges.sort((a, b) => {
    const aDate = new Date(a.info[DEFAULT_LOCALE]?.published_date || "1970-01-01");
    const bDate = new Date(b.info[DEFAULT_LOCALE]?.published_date || "1970-01-01");

    return (bDate.getTime() - aDate.getTime()) * (sort_order === "asc" ? 1 : -1);
  });
}

export function sortChallengesByDifficulty(challenges: Challenge[], sort_order?: "asc" | "desc") {
  return challenges.sort(
    (a, b) =>
      (DIFFICULTY_RANK.indexOf(a.difficulty) - DIFFICULTY_RANK.indexOf(b.difficulty)) * (sort_order === "asc" ? 1 : -1),
  );
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

      if (filename === "/tsconfig.json") {
        return;
      }

      if (filename === "/package.json") {
        const templatePackageJSON = JSON.stringify(JSON.parse(file.code), null, 2);
        const questionPackageJSON = JSON.stringify(
          JSON.parse(
            {
              ...TEMPLATES[template].files,
            }[filename]?.code,
          ),
          null,
          2,
        );

        if (templatePackageJSON === questionPackageJSON) {
          return;
        }
      }

      const isFileChanged =
        file.code !==
        {
          ...TEMPLATES[template].files,
        }[filename]?.code;

      if (isFileChanged) {
        body += `${filename.replace("/", "")}\n`;
        body += "```";
        body += `${filename.split(".").pop()} ${filename.replace("/", "")}\n`;
        body += file.code;
        body += "\n```\n\n";
      }
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

export function getSortedChallengesByDate(challenges: Challenge[], limit?: number) {
  const sorted = challenges.sort((a, b) => {
    const aDate = new Date(a.info[DEFAULT_LOCALE]?.published_date || "1970-01-01");
    const bDate = new Date(b.info[DEFAULT_LOCALE]?.published_date || "1970-01-01");
    return bDate.getTime() - aDate.getTime();
  });

  return limit ? sorted.slice(0, limit) : sorted;
}

export function filterChallengesByCategory(challenges: Challenge[], category: string) {
  return challenges.filter((challenge) => challenge.info?.en?.tags?.includes(category));
}
