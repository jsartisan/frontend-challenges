"use client";

import { cn } from "~/utils/helpers";
import { useInterview } from "~/entities/interview/context/InterviewContext";
import { Icon, IconProps, ToggleGroup, ToggleGroupItem } from "~/components/ui";

type LevelSelectProps = {
  className?: string;
};

export function FrameworkSelect(props: LevelSelectProps) {
  const { className } = props;
  const { framework, setFramework } = useInterview();

  return (
    <div className={cn("mx-auto mt-4 flex justify-center gap-4", className)}>
      <ToggleGroup
        variant="outline"
        size="icon"
        type="single"
        value={framework as "react" | "javascript"}
        onValueChange={(value: "react" | "javascript") => {
          if (!value) return;

          setFramework(value);
        }}
      >
        {["javascript", "react"].map((template) => {
          return (
            <ToggleGroupItem key={template} value={template}>
              <Icon name={`${template}-color` as IconProps["name"]} />
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>
    </div>
  );
}
