import { Card } from "@/components/ui";

import React, { useState } from "react";
import { MDXComponent } from "@/components/common/MDXComponent";

type SolutionProps = {
  solution: string;
};

function Solution(props: SolutionProps) {
  const { solution } = props;
  const [showSolution, setShowSolution] = useState(false);

  return (
    <Card className="h-full overflow-hidden p-4">
      {!showSolution && (
        <button
          className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-2 bg-background hover:bg-[var(--color-bg-hover)]"
          onClick={() => {
            setShowSolution(true);
          }}
        >
          <span className="text-3xl">👀</span>
          <p>Click here to see the solution</p>
        </button>
      )}
      <MDXComponent code={solution} />
    </Card>
  );
}

export { Solution };
