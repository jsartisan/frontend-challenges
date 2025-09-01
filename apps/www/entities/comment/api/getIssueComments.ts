import { REPO_API } from "~/shared/config/paths";
import { Comment } from "~/entities/comment/model/types";

export async function getAllIssueComments(issueNumber: number) {
  let page = 1;
  let comments = [] as Comment[];
  const perPage = 100;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const res = await fetch(`${REPO_API}/issues/${issueNumber}/comments?per_page=${perPage}&page=${page}`);

    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status}`);
    }

    const data = await res.json();

    comments = comments.concat(data as Comment[]);

    if (data.length < perPage) break; // no more pages

    page++;
  }

  // filter out comments from bot
  comments = comments.filter((comment) => comment.user?.login !== "github-actions[bot]");

  return comments;
}
