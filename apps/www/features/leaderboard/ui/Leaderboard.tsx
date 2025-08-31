import { TopLeaderboardUserList } from "./TopLeaderboardUserList";

export function Leaderboard() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-bold">Leaderboard</h3>
        <p className="text-(--color-fg-subtle)">The top contributors</p>
      </div>
      <TopLeaderboardUserList />
    </div>
  );
}
