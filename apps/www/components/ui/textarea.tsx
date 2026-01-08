"use client";

import * as React from "react";
import { TextArea as RACTextarea } from "react-aria-components";

import { cn } from "~/utils/helpers";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <RACTextarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 field-sizing-content shadow-xs flex min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base outline-none transition-[color,box-shadow] focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus:border-ring focus:ring-ring/50 focus:ring-[3px]",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
