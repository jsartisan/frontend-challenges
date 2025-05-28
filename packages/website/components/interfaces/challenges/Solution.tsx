import React, { useState } from "react";

import { cn } from "~/utils/helpers";
import { Card } from "~/components/ui";
import { MDXComponent } from "~/components/common/MDXComponent";

type SolutionProps = {
  solution: string;
};

function Solution(props: SolutionProps) {
  const { solution } = props;
  const [showSolution, setShowSolution] = useState(false);

  return (
    <Card
      className={cn({
        "h-full p-4": true,
        "overflow-y-auto": showSolution,
        "overflow-hidden": !showSolution,
      })}
    >
      {!showSolution && (
        <button
          className="absolute inset-0 z-10 flex cursor-pointer flex-col items-center justify-center gap-2 bg-[var(--color-bg)] hover:bg-[var(--color-bg-hover)]"
          onClick={() => {
            setShowSolution(true);
          }}
        >
          <span className="text-3xl">👀</span>
          <p>Click here to see the solution</p>
        </button>
      )}
      <div className="flex flex-col gap-2">
        <MDXComponent code={solution} />
      </div>
    </Card>
  );
}

export { Solution };
