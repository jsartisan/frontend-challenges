import { Level, Round } from "~/features/mock-interview/model/constants";
import { Framework } from "~/entities/interview/context/InterviewContext";

type GetMockInterviewChallengesProps = {
  level: Level;
  framework: Framework;
  round: Round;
};

export function getMockInterviewChallenges(props: GetMockInterviewChallengesProps) {
  const { framework, level, round } = props;

  return fetch(`/api/mock-interview?level=${level}&framework=${framework}&round=${round}`);
}
