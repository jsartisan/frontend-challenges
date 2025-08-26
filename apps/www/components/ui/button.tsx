import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { Icon } from "./icon";
import { cn } from "../../utils/helpers";

const buttonVariants = cva(
  cn(
    "relative active:translate-y-px inline-flex items-center justify-center overflow-hidden whitespace-nowrap rounded text-sm font-medium focus-visible:outline-none focus-visible:ring-[var(--color-bd-accent)] focus-visible:ring-2 focus-visible:ring-offset-1",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&>svg]:size-[1.3em]",
    "[&:has(+_[data-loader])_*]:opacity-0 [&:has(+_[data-loader])]:text-transparent",
  ),
  {
    variants: {
      variant: {
        primary:
          "shadow-bg-accent bg-[var(--color-bg-accent)] text-[var(--color-fg-onaccent)] hover:bg-[var(--color-bg-accent-hover)] active:bg-[var(--color-bg-accent-active)]",
        secondary:
          "shadow-bg active:shadow-bg-pressed bg-[var(--color-bg)] text-[var(--color-fg)] hover:bg-[var(--color-bg-hover)] active:bg-[var(--color-bg-active)]",
        tertiary: "hover:bg-[var(--color-bg-hover)] active:bg-[var(--color-bg-active)]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        link: "text-primary underline-offset-4 hover:underline",
        discord: "bg-social-discord text-white hover:bg-discord/90",
        github: "bg-black text-white hover:bg-black/90",
      },
      size: {
        default: "h-8 px-3 py-2 [&_img]:size-5 gap-2",
        sm: "h-7 rounded-sm px-2 text-xs [&_svg]:size-4 gap-1",
        xs: "h-6 rounded-sm px-2 text-xs gap-1",
        lg: "h-9 px-3 gap-2",
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
  ({ asChild = false, children, className, isLoading = false, size, variant, ...props }, ref) => {
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
        {/* <div className="[&:has(+_[data-loader])_::target-text]:opacity-0"> </div> */}
      </div>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
