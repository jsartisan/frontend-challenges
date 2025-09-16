import { useQuery } from "@tanstack/react-query";
import { Framework, useInterview } from "entities/interview/context/InterviewContext";

import { Level, Round } from "../model/constants";
import { getMockInterviewChallenges } from "../api/getMockInterviewChallenges";

type useChallengesForMockInterviewProps = {
  level: Level | null;
  framework: Framework | null;
  round: Round;
};

export function useChallengesForMockInterview<T>(props: useChallengesForMockInterviewProps) {
  const { framework, level, round } = props;
  const { questions, setQuestions } = useInterview();

  return useQuery({
    queryKey: ["mock-interview", level, framework, round],
    queryFn: () =>
      getMockInterviewChallenges({ framework: framework!, level: level!, round: round })
        .then((response) => response.json() as Promise<T>)
        .then((response) => {
          if (Array.isArray(response)) {
            setQuestions({
              ...questions,
              [round]: response.reduce((acc, item, index) => {
                acc[index] = item;
                return acc;
              }, {}),
            });

            return response;
          }

          setQuestions({ ...questions, [round]: response });

          return response;
        }),
    enabled: level !== null && framework !== null && round !== null,
  });
}
