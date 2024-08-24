import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../utils/helpers";

const buttonVariants = cva(
  cn(
    "inline-flex items-center justify-center border border-transparent whitespace-nowrap rounded text-sm font-medium focus-visible:outline-none focus-visible:ring-[var(--color-bd-accent)] focus-visible:ring-2 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50",
    "[&>svg]:size-[1.3em]",
  ),
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-bg-accent)] text-[var(--color-fg-onaccent)] hover:bg-[var(--color-bg-accent-hover)] active:bg-[var(--color-bg-accent-active)]",
        secondary:
          "bg-[var(--color-bg)] text-[var(--color-fg)] border-[var(--color-bd)] hover:bg-[var(--color-bg-hover)] active:bg-[var(--color-bg-active)]",
        tertiary: "hover:bg-[var(--color-bg-hover)] active:bg-[var(--color-bg-active)]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        link: "text-primary underline-offset-4 hover:underline",
        discord: "bg-social-discord text-white hover:bg-discord/90",
        github: "bg-black text-white hover:bg-black/90",
      },
      size: {
        default: "h-8 px-3 py-2 [&_img]:h-5 [&_img]:w-5 gap-2",
        sm: "h-7 rounded-sm px-2 text-xs [&_svg]:h-4 [&_svg]:w-4 gap-1",
        xs: "h-6 rounded-sm px-2 text-xs gap-1",
        lg: "h-9 px-4 py-2 gap-2",
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
