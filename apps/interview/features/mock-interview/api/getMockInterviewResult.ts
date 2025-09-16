import { Level } from "features/mock-interview/model/constants";

type getMockInterviewResultProps = {
  questions: any;
  level: Level;
  answers: any;
};

export function getMockInterviewResult(props: getMockInterviewResultProps) {
  const { answers, level, questions } = props;

  return fetch("/api/mock-interview/judge", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ level, questions, answers }),
  });
}
