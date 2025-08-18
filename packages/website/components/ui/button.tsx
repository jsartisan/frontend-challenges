import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { Icon } from "./icon";
import { cn } from "../../utils/helpers";

const buttonVariants = cva(
  cn(
    "relative inline-flex items-center justify-center overflow-hidden border border-transparent whitespace-nowrap rounded text-sm font-medium focus-visible:outline-none focus-visible:ring-[var(--color-bd-accent)] focus-visible:ring-2 focus-visible:ring-offset-1",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&>svg]:size-[1.3em]",
    "[&:has(+_[data-loader])_*]:opacity-0 [&:has(+_[data-loader])]:text-transparent",
  ),
  {
    variants: {
      variant: {
        primary:
          "shadow bg-[var(--color-bg-accent)] text-[var(--color-fg-onaccent)] hover:bg-[var(--color-bg-accent-hover)] active:bg-[var(--color-bg-accent-active)]",
        secondary:
          "shadow-[var(--shadow-bg)] bg-[var(--color-bg)] text-[var(--color-fg)] border-[var(--color-bd)] hover:bg-[var(--color-bg-hover)] active:bg-[var(--color-bg-active)]",
        tertiary: "hover:bg-[var(--color-bg-hover)] active:bg-[var(--color-bg-active)]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        link: "text-primary underline-offset-4 hover:underline",
        discord: "bg-social-discord text-white hover:bg-discord/90",
        github: "bg-black text-white hover:bg-black/90",
      },
      size: {
        default: "bs-8 px-3 py-2 [&_img]:bs-5 [&_img]:is-5 gap-2",
        sm: "bs-7 rounded-sm px-2 text-xs [&_svg]:bs-4 [&_svg]:is-4 gap-1",
        xs: "bs-6 rounded-sm px-2 text-xs gap-1",
        lg: "bs-9 px-3 gap-2",
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
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading = false, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <div data-wrapper className={cn("relative inline-flex")}>
        <Comp ref={ref} {...props} className={cn(buttonVariants({ variant, size, className }), className)}>
          {children}
        </Comp>
        {isLoading && (
          <span data-loader className="absolute inset-0 flex items-center justify-center bg-inherit">
            <Icon name="spinner" className="animate-spin" />
          </span>
        )}
        <div className="[&:has(+_[data-loader])_::target-text]:opacity-0"> </div>
      </div>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
