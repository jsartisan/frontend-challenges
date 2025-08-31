import { REPO, REPO_API } from "~/shared/config/paths";

async function fetchIssues(page = 1) {
  const res = await fetch(`${REPO_API}/issues?labels=answer&state=all&per_page=100&page=${page}`);

  return res.json();
}

export async function getLeadboardUsersWithCount() {
  let page = 1;
  let issues = [] as any[];

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const data = await fetchIssues(page);

    if (!data.length) break;

    issues = issues.concat(data);
    page++;
  }

  const counts = {} as Record<
    string,
    {
      count: number;
      user: {
        avatar_url: string;
        login: string;
      };
    }
  >;

  for (const issue of issues) {
    const user = issue.user;

    if (user.login === "jsartisan") continue;

    counts[user.login] = {
      count: (counts[user.login]?.count || 0) + 1,
      user: {
        avatar_url: user.avatar_url,
        login: user.login,
      },
    };
  }

  const leaderboard = Object.entries(counts)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 5)
    .map(([, count], i) => {
      return {
        count: count.count,
        rank: i + 1,
        user: count.user,
        html_url: `${REPO}/issues?q=author:${count.user.login}&labels=answer`,
      };
    });

  return leaderboard;
}
