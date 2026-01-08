"use client";

import * as React from "react";
import { tv, VariantProps } from "tailwind-variants";
import { composeRenderProps, InputProps as RACInputProps, Input as RACInput } from "react-aria-components";

export const inputStyles = tv({
  base: [
    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-md border bg-transparent shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:border-0 file:bg-transparent file:font-medium [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none",
  ],
  variants: {
    size: {
      default: "h-9 px-3 py-1 text-base file:h-7 file:text-sm md:text-sm",
      xs: "h-7 px-2 py-0.5 text-xs file:h-5 file:text-xs",
      sm: "h-8 px-2.5 py-1 text-sm file:h-6 file:text-xs",
      lg: "h-10 px-4 py-2 text-base file:h-8 file:text-sm",
    },
    isDisabled: {
      true: "pointer-events-none cursor-not-allowed opacity-50",
    },
    isFocused: {
      true: "border-ring ring-ring/50 z-10 ring-[3px]",
    },
    isFocusVisible: {
      true: "border-ring ring-ring/50 ring-[3px]",
    },
    isInvalid: {
      true: "ring-destructive/20 dark:ring-destructive/40 border-destructive",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface InputProps extends Omit<RACInputProps, "size"> {
  /** @default 'default' */
  size?: VariantProps<typeof inputStyles>["size"];
}

function Input({ className, size, type, ...props }: InputProps) {
  return (
    <RACInput
      type={type}
      data-slot="input"
      className={composeRenderProps(className, (className, renderProps) =>
        inputStyles({ ...renderProps, className, size }),
      )}
      {...props}
    />
  );
}

export { Input };
