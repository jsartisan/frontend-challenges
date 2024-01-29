import * as React from "react";

import { cn } from "@/utils/helpers";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isQuiet?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "placeholder:[var(--color-fg-neutral-subtle)] flex h-9 w-full rounded-md bg-[var(--color-bg)] px-3 py-1 text-sm shadow-sm ring-1 ring-[var(--color-border)] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-accent)]",
        props.isQuiet && "bg-transparent shadow-none ring-0",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
