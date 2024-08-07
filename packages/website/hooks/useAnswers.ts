import { useQuery } from "@tanstack/react-query";
import { getAnswersOfQuestion } from "../utils/answers";

export function useAnswers(...args: Parameters<typeof getAnswersOfQuestion>) {
  const answersQuery = useQuery({
    queryKey: ["answers", args["0"].no],
    queryFn: async () => {
      return getAnswersOfQuestion(...args);
    },
  });

  return { isLoading: answersQuery.isPending, answers: answersQuery.data };
}
