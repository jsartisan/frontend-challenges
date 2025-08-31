import { useQuery } from "@tanstack/react-query";

import { getLeadboardUsersWithCount } from "~/features/leaderboard/api/getLeadboardUsers";

export function useLeaderboard() {
  return useQuery({
    queryKey: ["leaderboard"],
    queryFn: () => getLeadboardUsersWithCount(),
  });
}
