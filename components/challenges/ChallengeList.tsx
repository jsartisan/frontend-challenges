"use client";

import { Challenge } from "@/types";
import { QuizListItem } from "../quizzes/QuizListItem";
import { QuestionListItem } from "../questions/QuestionListItem";

type ChallengeListProps = {
  challenges: Challenge[];
  showTypeIcon?: boolean;
};

export function ChallengeList(props: ChallengeListProps) {
  const { challenges } = props;

  return (
    <div className="flex flex-col gap-3">
      {challenges.map((challenge) => {
        return challenge.type === "question" ? (
          <QuestionListItem showTypeIcon key={challenge.path} question={challenge} />
        ) : (
          <QuizListItem showTypeIcon key={challenge.path} quiz={challenge} />
        );
      })}
    </div>
  );
}
