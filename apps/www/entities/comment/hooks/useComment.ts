import { useQuery } from "@tanstack/react-query";

import { getAllIssueComments } from "~/entities/comment/api/getIssueComments";

export function useComment(challengeNo: number) {
  const commentQuery = useQuery({
    queryKey: ["comment", challengeNo],
    queryFn: async () => {
      return getAllIssueComments(challengeNo);
    },
  });

  return { isLoading: commentQuery.isPending, data: commentQuery.data };
}
