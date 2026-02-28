import { cn } from "~/utils/helpers";

import { TopLeaderboardUserList } from "./TopLeaderboardUserList";

type LeaderboardProps = {
  className?: string;
};

export function Leaderboard(props: LeaderboardProps) {
  const { className } = props;

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-bold">🏆 Leaderboard</h3>
        <p className="text-muted-foreground">The top contributors 🌟</p>
      </div>
      <TopLeaderboardUserList />
    </div>
  );
}
