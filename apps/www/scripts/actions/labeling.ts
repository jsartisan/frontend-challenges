import type { Action } from "./types";

const action: Action = async (github, context, core) => {
  const payload = context.payload;
  const issue = payload.issue;

  if (!issue) return;

  core.info("-----payload-----");
  core.info(JSON.stringify(payload, null, 2));
  core.info("-----issue-----");
  core.info(JSON.stringify(issue, null, 2));

  const labels: string[] = (issue.labels || []).map((i: any) => i && i.name).filter(Boolean);

  if (labels.includes("answer") == false) {
    core.info("No answer label, skipped");

    return;
  }

  const issueNoMatch = issue.title.match(/^(\d+) - /);
  // the tile is of format "123 - Title - react", where last word is the template
  const issueTemplateMatch = issue.title.match(/ - (\w+)$/);

  if (issueNoMatch && issueNoMatch[1] && issueTemplateMatch && issueTemplateMatch[1]) {
    const no = Number(issueNoMatch[1]);
    const template = issueTemplateMatch[1] || "vanilla";

    if (Number.isNaN(no)) return;

    const name = no.toString();

    if (labels.includes("trigger-bot")) {
      await github.rest.issues.removeLabel({
        issue_number: context.issue.number,
        owner: context.repo.owner,
        repo: context.repo.repo,
        name: "trigger-bot",
      });
    }

    if (labels.includes(name)) return;

    try {
      await github.rest.issues.getLabel({
        owner: context.repo.owner,
        repo: context.repo.repo,
        name,
      });
    } catch {
      await github.rest.issues.createLabel({
        owner: context.repo.owner,
        repo: context.repo.repo,
        name,
        color: "ffffff",
      });
    }

    await github.rest.issues.addLabels({
      issue_number: context.issue.number,
      owner: context.repo.owner,
      repo: context.repo.repo,
      labels: [name, template],
    });
  }
};

export default action;
