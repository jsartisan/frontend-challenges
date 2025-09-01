import { REPO_API } from "~/shared/config/paths";

export async function getAllIssueComments(issueNumber) {
  let page = 1;
  let comments = [];
  const perPage = 100;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const res = await fetch(`${REPO_API}/issues/${issueNumber}/comments?per_page=${perPage}&page=${page}`);

    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status}`);
    }

    const data = await res.json();

    comments = comments.concat(data);

    if (data.length < perPage) break; // no more pages

    page++;
  }

  return comments;
}
