import React, { useState } from "react";

import { cn } from "~/utils/helpers";
import { Button, Card } from "~/components/ui";
import { MDXComponent } from "~/shared/ui/mdx/MDXComponent";

type SolutionProps = {
  options?: string[];
  right_answer?: string;
  solution: string;
};

function Solution(props: SolutionProps) {
  const { options, right_answer, solution } = props;
  const [showSolution, setShowSolution] = useState(false); // answer revealed
  const [showExplanation, setShowExplanation] = useState(false); // explanation visible
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const isMCQ = options && right_answer;

  return (
    <Card
      className={cn({
        "h-full p-4": true,
        "overflow-y-auto": showSolution && showExplanation,
        "overflow-hidden": !showSolution || !showExplanation,
      })}
    >
      {/* Initial overlay */}
      {!showSolution && !showExplanation && (
        <div
          className={cn(
            "bg-(--color-bg) absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 p-4 text-center",
            !isMCQ && "hover:bg-bg-hover cursor-pointer",
          )}
          onClick={() => {
            if (!isMCQ) {
              setShowExplanation(true);
            }
          }}
        >
          {/* Non-MCQ prompt */}
          {!isMCQ && (
            <>
              <span className="text-3xl">👀</span>
              <p>Click here to see the solution</p>
            </>
          )}

          {/* MCQ options list */}
          {isMCQ && selectedAnswer === null && (
            <div className="flex flex-col gap-3">
              <p>Select one of the following:</p>
              <div className="flex max-w-md flex-col gap-2">
                {options.map((option) => (
                  <Button
                    variant="secondary"
                    key={option}
                    className="h-auto whitespace-normal break-words"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedAnswer(option);
                      setShowSolution(true);
                    }}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* MCQ feedback overlay after answer picked, before explanation */}
      {isMCQ && showSolution && !showExplanation && (
        <div className="bg-(--color-bg) absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 p-4 text-center">
          <p className="text-lg font-semibold">{selectedAnswer === right_answer ? "✅ Correct!" : "❌ Incorrect."}</p>
          <p>
            Correct answer: <span className="font-medium">{right_answer}</span>
          </p>
          <Button variant="secondary" onClick={() => setShowExplanation(true)}>
            View Explanation
          </Button>
        </div>
      )}

      {/* Explanation (MDX) */}
      <div className="flex flex-col gap-2">
        <MDXComponent code={solution} />
      </div>
    </Card>
  );
}

export { Solution };
