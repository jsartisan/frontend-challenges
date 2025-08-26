import { useQuery } from "@tanstack/react-query";

import { useAuth } from "~/features/auth/hooks/useAuth";
import { getCompletions } from "~/entities/completions/api/getCompletions";

export function useCompletions() {
  const auth = useAuth();
  const completionsQuery = useQuery({
    queryKey: ["completions"],
    queryFn: () => {
      return getCompletions({ user_id: auth.user.id });
    },
    enabled: !!auth.user,
  });

  const completions = completionsQuery.data?.data?.map((c) => c.challenge_id) ?? [];

  return { completions, isLoading: completionsQuery.isFetching };
}
