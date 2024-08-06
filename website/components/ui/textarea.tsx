import * as React from "react";

import { cn } from "@/website/utils/helpers";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "placeholder:[var(--color-fg-neutral-subtle)] flex min-h-[60px] w-full rounded-md bg-[var(--color-bg)] px-3 py-1 text-sm shadow-sm ring-1 ring-[var(--color-bd)] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-bd-accent)]",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
