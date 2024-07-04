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
        "flex h-8 w-full rounded-md border border-[var(--color-bd)] bg-[var(--color-bg)] px-3 py-1 text-sm shadow-sm ring-[var(--color-bd)] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[var(--color-fg-neutral-subtle)] disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-[var(--color-bd-accent)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-bd-accent)]",
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
