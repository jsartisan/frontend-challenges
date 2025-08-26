import { REPO } from "~/shared/config/paths";
import { TEMPLATES } from "~/entities/challenge/model/templates";

export const generateSubmitChallengeURL = (values: any) => {
  let body = ``;
  const { answer, difficulty, files, readme: readme, tags, template, title, type } = values;

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

  if (type === "question" || type === "quiz") {
    body += `## Question\n\n`;
    body += `<!--question-start-->\n\n`;

    body += readme;

    body += `\n\n<!--question-end-->\n\n`;
  }

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

  if (type === "quiz" || type === "theory") {
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
