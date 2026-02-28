"use client";

import { Card, Skeleton } from "~/components/ui";
import { Avatar, AvatarImage } from "~/components/ui/avatar";

import { useLeaderboard } from "../hooks/useLeaderboard";

export function TopLeaderboardUserList() {
  const { data, isLoading } = useLeaderboard();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {[...Array(7)].map((_, index) => (
          <Skeleton className="h-14 w-full" key={index} />
        ))}
      </div>
    );
  }

  if (data?.length === 0) {
    return <div>No data</div>;
  }

  return (
    <div className="flex flex-col">
      {data?.map((aggregatedUser) => (
        <Card
          className="group/leaderboard-user flex rounded-none border-x-0 border-b border-t-0 bg-transparent px-3 py-2 shadow-none md:px-4"
          key={aggregatedUser.user.login}
          role="listitem"
        >
          <div className="flex grow items-center gap-2">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Avatar className="size-5">
                  <AvatarImage src={aggregatedUser.user.avatar_url} />
                </Avatar>
                <a
                  href={aggregatedUser.html_url}
                  target="_blank"
                  className="text-primary text-base font-medium hover:underline"
                >
                  {aggregatedUser.user.login}
                </a>
              </div>
              <div className="text-muted-foreground/60 text-sm">Solved {aggregatedUser.count} answers</div>
            </div>
            <div className="text-muted-foreground/60 ms-auto text-2xl font-bold opacity-50">
              #{aggregatedUser.rank}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
