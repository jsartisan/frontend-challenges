import * as React from "react";

import { cn } from "../../utils/helpers";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isQuiet?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "border-border bg-background shadow-input ring-border placeholder:text-muted-foreground/60 flex h-8 w-full rounded-md border px-3 py-1 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-ring focus-visible:outline-hidden focus-visible:ring-ring focus-visible:ring-1",
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
