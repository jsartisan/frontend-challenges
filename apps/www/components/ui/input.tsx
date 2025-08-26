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
        "border-(--color-bd) bg-(--color-bg) shadow-input ring-(--color-bd) placeholder:text-(--color-fg-neutral-subtle) flex h-8 w-full rounded-md border px-3 py-1 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-(--color-bd-accent) focus-visible:outline-hidden focus-visible:ring-(--color-bd-accent) focus-visible:ring-1",
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
