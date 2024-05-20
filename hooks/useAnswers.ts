// https://api.github.com/repos/jsartisan/frontend-challenges/issues?labels=1

import { getAnswersOfQuestion } from "@/db/answers";
import { useQuery } from "@tanstack/react-query";

export function useAnswers(...args: Parameters<typeof getAnswersOfQuestion>) {
  const answersQuery = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      return getAnswersOfQuestion(...args);
    },
  });

  return { isLoading: answersQuery.isPending, answers: answersQuery.data };
}
