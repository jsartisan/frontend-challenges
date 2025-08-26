import * as React from "react";

import { cn } from "../../utils/helpers";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "placeholder:[var(--color-fg-neutral-subtle)] bg-(--color-bg) shadow-xs ring-(--color-bd) flex min-h-[60px] w-full rounded-md px-3 py-1 text-sm ring-1 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:outline-hidden focus-visible:ring-(--color-bd-accent) focus-visible:ring-2",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
