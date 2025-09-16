"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { IconCircle, IconCircleDot } from "@tabler/icons-react";
import { Round } from "features/mock-interview/model/constants";
import { useInterview } from "entities/interview/context/InterviewContext";
import { NextRoundButton } from "features/mock-interview/ui/NextRoundButton";
import { useChallengesForMockInterview } from "features/mock-interview/hooks/useChallengesForMockInterview";

import { cn } from "~/utils/helpers";
import { Button } from "~/components/ui";
import { Icon } from "~/components/ui/icon-2";
import { Quiz } from "~/entities/challenge/model/types";
import { MDXComponent } from "~/shared/ui/mdx/MDXComponent";

type MockInterviewQuizRoundPageProps = {
  round: Round;
};

export function MockInterviewQuizRoundPage(props: MockInterviewQuizRoundPageProps) {
  const { round } = props;
  const router = useRouter();
  const { answers, currentRound, framework, level, nextRound, saveAnswers } = useInterview();
  const { data: quizzes, isLoading } = useChallengesForMockInterview<Quiz[]>({
    framework,
    level,
    round,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (currentRound === null) {
    return <div>Loading...</div>;
  }

  console.log({ answers });
  return (
    <div className="h-[valc(100%-var(--navbar-height))] w-[min(100vw,1400px)] p-6">
      <div className="flex">
        <div>
          <h1 className="box-trim text-2xl font-bold">Round {round}: Quiz Round</h1>
          <p className="text-fg-subtle mt-2">
            In this round, we will test your knowledge around Javascript/Typescript.
          </p>
        </div>
        <div className="ms-auto">
          <NextRoundButton />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-12">
        {(quizzes || [])?.map((quiz, index) => (
          <div key={quiz.no}>
            <h2 className="text-xl font-bold">Question {index + 1}</h2>
            <div className="grid grid-cols-2 gap-8">
              <MDXComponent code={quiz.readme["en"]} className="mt-1 flex flex-col gap-2" />
              <div className="flex flex-col gap-3">
                <p>Select one of the following:</p>
                <div className="flex max-w-md flex-col gap-2">
                  {(quiz?.info["en"]?.options as string[])?.map((option) => (
                    <Button
                      variant="secondary"
                      key={option}
                      className={cn(
                        "h-auto cursor-pointer justify-start whitespace-normal break-words text-left",
                        answers[currentRound]?.[index] === option && "shadow-bg-pressed bg-bg-hover",
                      )}
                      onClick={() => {
                        saveAnswers({ ...answers, [currentRound]: { ...answers[currentRound], [index]: option } });
                      }}
                    >
                      <Icon
                        icon={answers[currentRound]?.[index] === option ? IconCircleDot : IconCircle}
                        className="size-4"
                      />
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
