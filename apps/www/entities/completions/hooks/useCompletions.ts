import { useQuery } from "@tanstack/react-query";

import { getCompletions } from "~/entities/completions/api/getCompletions";

export function useCompletions() {
  const completionsQuery = useQuery({
    queryKey: ["completions"],
    queryFn: () => getCompletions(),
  });

  const completions = completionsQuery.data?.data?.map((c) => c.challengeId) ?? [];

  return { completions, isLoading: completionsQuery.isFetching };
}
