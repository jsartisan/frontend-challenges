"use client";

import { useRouter } from "next/navigation";
import { useInterview } from "entities/interview/context/InterviewContext";

import { cn } from "~/utils/helpers";
import { Button } from "~/components/ui";

import { LEVELS } from "../model/constants";

type LevelSelectProps = {
  className?: string;
};

export function LevelSelect(props: LevelSelectProps) {
  const { className } = props;
  const { nextRound, setLevel } = useInterview();

  return (
    <div className={cn("mx-auto mt-4 flex justify-center gap-4", className)}>
      {LEVELS.map((level) => (
        <Button
          key={`level-button-${level.name}`}
          variant="secondary"
          onClick={() => {
            setLevel(level.id);
            nextRound();
          }}
        >
          {level.name}
        </Button>
      ))}
    </div>
  );
}
