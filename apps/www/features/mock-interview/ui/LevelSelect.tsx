"use client";

import { useRouter } from "next/navigation";

import { cn } from "~/utils/helpers";
import { Button } from "~/components/ui";
import { useInterview } from "~/entities/interview/context/InterviewContext";

import { LEVELS } from "../model/constants";

type LevelSelectProps = {
  className?: string;
};

export function LevelSelect(props: LevelSelectProps) {
  const { className } = props;
  const { setLevel } = useInterview();
  const router = useRouter();

  return (
    <div className={cn("mx-auto mt-4 flex justify-center gap-4", className)}>
      {LEVELS.map((level) => (
        <Button
          key={`level-button-${level.name}`}
          variant="secondary"
          onClick={() => {
            setLevel(level.id);
            router.push(`/mock-interview/round/1`);
          }}
        >
          {level.name}
        </Button>
      ))}
    </div>
  );
}
