import YAML from "js-yaml";
import fs from "fs-extra";
import type { Action } from "../../types";

export const getOthers = <A, B>(condition: boolean, a: A, b: B): A | B => (condition ? a : b);

const action: Action = async (github, context, core) => {
  const no = context.issue.number;
  const files = await github.rest.pulls.listFiles({
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: no,
  });

  const filePath = `../../${files.data.find((file) => file.filename.includes("info.yml"))?.filename}`;

  core.info(`-----${filePath}-----`);

  if (filePath) {
    const infoRaw = fs.readFileSync(filePath, "utf-8");

    let info: any;

    try {
      info = YAML.load(infoRaw || "");
    } catch {
      info = null;
    }

    core.info(`-----${JSON.stringify(info)}-----`);

    // check if if there is something missing in the issue
    if (!info) {
      core.info("-----Invalid Issue-----");
      return;
    }

    // create discussion with octokit graphql
    if (info.discussion == undefined) {
      const { data: response } = await github.graphql<any>(
        `mutation {
            createDiscussion(input: {
              repositoryId: 721944613,
              title: "${info.title}",
              categoryId: "DIC_kwDOKwgAJc4CfYsh",
              body: "This is a discussion for #${no} - ${info.title}",
            }) {
              discussion {
              id
            }
          }
            }`,
      );

      info.createDiscussion.discussion = response.discussion.id;

      core.info("-----Discussion Created-----");
      core.info(JSON.stringify(response, null, 2));
    }

    fs.writeFile(filePath, `${YAML.dump(info)}\n`);
  } else {
    core.info("No matched labels, skipped");
  }
};

export default action;
