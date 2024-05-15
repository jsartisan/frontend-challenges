import { useQuery } from "@tanstack/react-query";
import { getCompletions } from "@/db/completions";

export function useCompletions() {
  const completionsQuery = useQuery({
    queryKey: ["completions"],
    queryFn: () => {
      return getCompletions();
    },
  });

  const completions = completionsQuery.data ?? [];

  return { completions };
}
