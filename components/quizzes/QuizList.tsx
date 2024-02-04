"use client";

import { Quiz } from "@/types";
import { QuizListItem } from "./QuizListItem";

type QuestionListProps = {
  quizzes: Quiz[];
};

export function QuizList(props: QuestionListProps) {
  const { quizzes } = props;

  return (
    <div className="flex flex-col gap-3">
      {quizzes.map((quiz) => (
        <QuizListItem key={quiz.path} quiz={quiz} />
      ))}
    </div>
  );
}
