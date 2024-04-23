import { useQuery } from "@tanstack/react-query";
import { getCompletions } from "@/db/completions";

import { useAuth } from "./useAuth";

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

  return { completions };
}
