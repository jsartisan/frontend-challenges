"use client";

import * as React from "react";
import { Separator as RACSeparator, type SeparatorProps } from "react-aria-components";

import { cn } from "~/utils/helpers";

export function Separator(props: SeparatorProps) {
  const { className, orientation = "horizontal", ...rest } = props;

  return (
    <RACSeparator
      data-slot="separator"
      orientation={orientation}
      className={cn("bg-border shrink-0", orientation === "horizontal" ? "h-px w-full" : "h-full w-px", className)}
      {...rest}
    />
  );
}

Separator.displayName = "Separator";
