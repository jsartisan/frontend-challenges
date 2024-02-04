"use client";

import { Question } from "@/types";
import { QuestionListItem } from "./QuestionListItem";

type QuestionListProps = {
  questions: Question[];
};

export function QuestionList(props: QuestionListProps) {
  const { questions } = props;

  return (
    <div className="flex flex-col gap-3">
      {questions.map((question) => (
        <QuestionListItem key={question.path} question={question} />
      ))}
    </div>
  );
}
