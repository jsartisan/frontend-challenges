import { useQuery } from "@tanstack/react-query";

import { Level } from "~/entities/challenge/model/types";
import { Framework } from "~/entities/interview/context/InterviewContext";

import { Round } from "../model/constants";
import { getMockInterviewChallenges } from "../api/getMockInterviewChallenges";

type useChallengesForMockInterviewProps = {
  level: Level | null;
  framework: Framework | null;
  round: Round;
};

export function useChallengesForMockInterview<T>(props: useChallengesForMockInterviewProps) {
  const { framework, level, round } = props;

  return useQuery({
    queryKey: ["mock-interview", level, framework, round],
    queryFn: () =>
      getMockInterviewChallenges({ framework: framework!, level: level!, round: round }).then(
        (response) => response.json() as Promise<T>,
      ),
    enabled: level !== null && framework !== null && round !== null,
    staleTime: 0,
  });
}
