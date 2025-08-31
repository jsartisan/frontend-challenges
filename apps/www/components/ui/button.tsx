import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps, tv } from "tailwind-variants";

import { cn } from "../../utils/helpers";

const buttonVariants = tv({
  base: cn(
    "relative inline-flex items-center justify-center overflow-hidden whitespace-nowrap rounded text-sm font-medium focus-visible:outline-none focus-visible:ring-(--color-bd-accent) focus-visible:ring-2 focus-visible:ring-offset-1",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&>svg]:size-[1.3em]",
    "[&:has(+_[data-loader])_*]:opacity-0 [&:has(+_[data-loader])]:text-transparent",
  ),
  variants: {
    variant: {
      primary:
        "shadow-bg-accent bg-(--color-bg-accent) text-(--color-fg-onaccent) hover:bg-(--color-bg-accent-hover) active:bg-(--color-bg-accent-active) active:shadow-bg-accent-pressed",
      secondary:
        "shadow-bg active:shadow-bg-pressed bg-(--color-bg) text-(--color-fg) hover:bg-(--color-bg-hover) active:bg-(--color-bg-active) [&[data-state=open]]:shadow-bg-pressed [&[data-state=open]]:bg-(--color-bg-active)",
      tertiary:
        "hover:bg-(--color-bg-hover) active:bg-(--color-bg-active) active:shadow-bg-pressed [&[data-state=open]]:shadow-bg-pressed  [&[data-state=open]]:bg-(--color-bg-active)",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      link: "text-primary underline-offset-4 hover:underline",
      discord: "bg-social-discord text-white hover:bg-discord/90",
      github: "bg-black text-white hover:bg-black/90",
    },
    size: {
      default: "h-8 px-3 py-2 [&_img]:size-5 gap-2",
      sm: "h-7 rounded-md px-2 text-xs [&_svg]:size-4 gap-1",
      xs: "h-6 rounded-md px-2 text-xs gap-1",
      lg: "h-9 px-3 gap-2",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

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
      <Comp
        ref={ref}
        {...props}
        className={cn(buttonVariants({ variant, size, className }), className)}
        data-loading={isLoading}
      >
        {children}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
