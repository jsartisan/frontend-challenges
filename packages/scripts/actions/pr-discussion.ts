import YAML from "js-yaml";
import fs from "fs-extra";

import type { Action } from "../types";

const REPOSITORY_CLIENT_ID = `MDQ6VXNlcjY2MzYzNjA=`;
const DISCUSSIONS_REPOSITORY_ID = `R_kgDOLK6p3w`;
const DISCUSSIONS_CHALLENGES_CATEGORY_ID = `DIC_kwDOLK6p384Cfb6l`;

const action: Action = async (github, context, core) => {
  const no = context.issue.number;
  const files = await github.rest.pulls.listFiles({
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: no,
  });

  const dir = files.data[0].filename.split("/")[1];
  const challengeNo = Number(dir.replace(/^(\d+)-.*/, "$1"));
  const filePath = `../../../${files.data.find((file) => file.filename.includes("info.yml"))?.filename}`;

  if (filePath) {
    const infoRaw = fs.readFileSync(filePath, "utf-8");

    let info: any;

    try {
      info = YAML.load(infoRaw || "");
    } catch {
      info = null;
    }

    // check if if there is something missing in the issue
    if (!info) {
      core.info("-----Invalid Issue-----");
      return;
    }

    // create discussion with octokit graphql
    if (info.discussionNo == undefined) {
      const response = await github.graphql<any>(
        `mutation {
            createDiscussion(input: {
              repositoryId: "${DISCUSSIONS_REPOSITORY_ID}",
              title: "${challengeNo} - ${info.title}",
              categoryId: "${DISCUSSIONS_CHALLENGES_CATEGORY_ID}",
              body: "This is an auto-generated discussion for #${challengeNo} - ${info.title}. Feel free to discuss anything related to this challenge here. Good luck! 🚀",
              clientMutationId: "${REPOSITORY_CLIENT_ID}"
            }) {
              discussion {
              id
              number
            }
          }
            }`,
      );

      info.discussionNo = response.createDiscussion.discussion.number;
    }

    fs.writeFileSync(filePath, `${YAML.dump(info)}\n`);
  } else {
    core.info("No matched labels, skipped");
  }
};

export default action;
