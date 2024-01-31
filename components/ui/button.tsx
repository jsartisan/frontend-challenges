import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/helpers";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius)] text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-bg-accent)] text-[var(--color-fg-onaccent)] shadow hover:bg-[var(--color-bg-accent-hover)] active:bg-[var(--color-bg-accent-active)]",
        secondary:
          "bg-[var(--color-bg)] text-[var(--color-fg)] border border-[var(--color-border)] shadow-sm hover:bg-[var(--color-bg-hover)] active:bg-[var(--color-bg-active)]",
        tertiary: "hover:bg-[var(--color-bg-hover)] active:bg-[var(--color-bg-active)]",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        link: "text-primary underline-offset-4 hover:underline",
        discord: "bg-social-discord text-white shadow-sm hover:bg-discord/90",
      },
      size: {
        default: "h-9 px-4 py-2 [&>svg]:h-5 [&>svg]:w-5",
        sm: "h-8 py-1 rounded-[var(--radius-sm)] px-3 text-xs [&>svg]:h-4 [&>svg]:w-4",
        lg: "h-10 rounded-md px-8 [&>svg]:h-7 [&>svg]:w-7",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
