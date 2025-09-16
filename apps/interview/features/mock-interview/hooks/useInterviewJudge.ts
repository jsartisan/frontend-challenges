import { useQuery } from "@tanstack/react-query";
import { useInterview } from "entities/interview/context/InterviewContext";

import { getMockInterviewResult } from "../api/getMockInterviewResult";

export function useInterviewJudge() {
  const { answers, level, questions } = useInterview();

  return useQuery({
    queryKey: ["mock-interview-judge", level],
    queryFn: () => getMockInterviewResult({ level: level, questions, answers }).then((response) => response.json()),
    enabled: level !== null && questions !== null && answers !== null,
  });
}
