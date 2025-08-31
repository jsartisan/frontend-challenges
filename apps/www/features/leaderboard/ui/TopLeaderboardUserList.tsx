"use client";

import { Card, Skeleton } from "~/components/ui";
import { Avatar, AvatarImage } from "~/components/ui/avatar";

import { useLeaderboard } from "../hooks/useLeaderboard";

export function TopLeaderboardUserList() {
  const { data, isLoading } = useLeaderboard();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {[...Array(5)].map((_, index) => (
          <Skeleton className="h-20 w-full" key={index} />
        ))}
      </div>
    );
  }

  if (data?.length === 0) {
    return <div>No data</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {data?.map((aggregatedUser) => (
        <Card className="group/leaderboard-user flex px-4 py-3 md:px-4" key={aggregatedUser.user.login} role="listitem">
          <div className="flex grow items-center gap-2">
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <Avatar className="size-6">
                  <AvatarImage src={aggregatedUser.user.avatar_url} />
                </Avatar>
                <a
                  href={aggregatedUser.html_url}
                  target="_blank"
                  className="text-(--color-fg-accent) text-base font-medium hover:underline"
                >
                  {aggregatedUser.user.login}
                </a>
              </div>
              <div className="text-(--color-fg-neutral-subtle) text-sm"> {aggregatedUser.count} answers</div>
            </div>
            <div className="text-(--color-fg-neutral-subtle) ms-auto text-2xl font-bold opacity-50">
              #{aggregatedUser.rank}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
