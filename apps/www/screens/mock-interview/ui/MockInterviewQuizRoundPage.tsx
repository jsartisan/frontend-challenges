"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { IconCircle, IconCircleDot } from "@tabler/icons-react";

import { cn } from "~/utils/helpers";
import { Button } from "~/components/ui";
import { Icon } from "~/components/ui/icon-2";
import { Quiz } from "~/entities/challenge/model/types";
import { MDXComponent } from "~/shared/ui/mdx/MDXComponent";
import { Round } from "~/features/mock-interview/model/constants";
import { useInterview } from "~/entities/interview/context/InterviewContext";
import { useChallengesForMockInterview } from "~/features/mock-interview/hooks/useChallengesForMockInterview";

type MockInterviewQuizRoundPageProps = {
  round: Round;
};

export function MockInterviewQuizRoundPage(props: MockInterviewQuizRoundPageProps) {
  const { round } = props;
  const router = useRouter();
  const { answers, framework, level, saveAnswers } = useInterview();
  const { data: quizzes, isLoading } = useChallengesForMockInterview<Quiz[]>({
    framework,
    level,
    round,
  });

  useEffect(() => {
    if (!level) {
      return router.push("/mock-interview");
    }
  }, [level]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const canProceedToRound2 = (() => {
    const allAnswersEntered = Object.keys(answers.round1 || {}).length === quizzes?.length;

    if (!allAnswersEntered) {
      return false;
    }

    return true;
  })();

  return (
    <div className="h-[valc(100%-var(--navbar-height))] w-[min(100vw,1400px)] p-6">
      <h1 className="box-trim text-2xl font-bold">Round {round}: Quiz Round</h1>
      <p className="text-fg-subtle mt-2">In this round, we will test your knowledge around Javascript/Typescript.</p>

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
                        answers.round1?.[quiz.no] === option && "shadow-bg-pressed bg-bg-hover",
                      )}
                      onClick={() => saveAnswers({ round1: { ...answers?.round1, [quiz.no]: option } })}
                    >
                      <Icon
                        icon={answers.round1?.[quiz.no] === option ? IconCircleDot : IconCircle}
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

      <Button
        disabled={!canProceedToRound2}
        onClick={() => {
          router.push(`/mock-interview/round/2`);
        }}
      >
        Proceed to Round 2
      </Button>
    </div>
  );
}
