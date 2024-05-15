import YAML from "js-yaml";
import slug from "limax";
import fs from "fs-extra";
import type { Action } from "../../types";
import { DEFAULT_LOCALE } from "../../constants";

export const getOthers = <A, B>(condition: boolean, a: A, b: B): A | B => (condition ? a : b);

const action: Action = async (github, context, core) => {
  const no = context.issue.number;
  const files = await github.rest.pulls.listFiles({
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: no,
  });

  if (files.data.some((file) => file.filename === "info.yml")) {
    const infoRaw = files.data.find((file) => file.filename === "info.yml")?.patch;

    let info: any;

    try {
      info = YAML.load(infoRaw || "");
    } catch {
      info = null;
    }

    core.info("-----Playload-----");
    core.info(JSON.stringify(context.payload, null, 2));

    // check if if there is something missing in the issue
    if (!info) {
      core.info("-----Invalid Issue-----");
      return;
    }

    // create discussion with octokit graphql
    if (info.discussion !== undefined) {
      const { data: response } = await github.graphql<any>(
        `mutation {
            createDiscussion(input: {
              repositoryId: "${context.repo.repo}",
              title: "${info.title}",
              body: "This is a discussion for #${no} - ${info.title}",
            }) {
              discussion {
              id
            }
          }
            }`,
      );

      info.discussion = response.discussion.id;

      core.info("-----Discussion Created-----");
      core.info(JSON.stringify(response, null, 2));
    }

    const dir = `challenges/${getQuestionFullName(no, info.difficulty, info.title)}`;

    fs.writeFile(resolveFilePath(dir, "info", "yml", "en"), `${YAML.dump(info)}\n`);
  } else {
    core.info("No matched labels, skipped");
  }
};

export function getQuestionFullName(no: number, difficulty: string, title: string) {
  return `${String(no).padStart(5, "0")}-${difficulty}-${slug(title.replace(/\./g, "-").replace(/<.*>/g, ""), {
    tone: false,
  })}`;
}

export function resolveFilePath(dir: string, name: string, ext: string, locale: string) {
  if (locale === DEFAULT_LOCALE) return `${dir}/${name}.${ext}`;
  else return `${dir}/${name}.${locale}.${ext}`;
}

export default action;
