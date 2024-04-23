import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/helpers";

const iconButtonVariants = cva(
  cn(
    "relative inline-flex items-center justify-center whitespace-nowrap rounded text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    "[&[data-loading=true]>*]:invisible data-[loading=true]:after:content-[''] data-[loading=true]:after:absolute data-[loading=true]:after:top-1/2 data-[loading=true]:after:left-1/2 data-[loading=true]:after:w-4 data-[loading=true]:after:h-4 data-[loading=true]:after:-mt-2 data-[loading=true]:after:-ml-2 data-[loading=true]:after:rounded-full data-[loading=true]:after:border data-[loading=true]:after:border-t-black data-[loading=true]:after:animate-spin data-[loading=true]:after:absolute",
  ),
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-bg-accent)] text-[var(--color-fg-onaccent)] hover:bg-[var(--color-bg-accent-hover)] active:bg-[var(--color-bg-accent-active)]",
        secondary:
          "bg-background text-[var(--color-fg)] border border-[var(--color-border)] hover:bg-[var(--color-bg-hover)] active:bg-[var(--color-bg-active)]",
        tertiary: "hover:bg-[var(--color-bg-hover)] active:bg-[var(--color-bg-active)]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        default: "h-8 w-8 [&>svg]:h-5 [&>svg]:w-5",
        xs: "h-4 w-4 [&>svg]:h-3 [&>svg]:w-3",
        sm: "h-7 w-7 [&>svg]:h-[18px] [&>svg]:w-[18px] rounded",
        lg: "h-10 w-10 [&>svg]:h-7 [&>svg]:w-7",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, isLoading, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(iconButtonVariants({ variant, size, className }))}
        data-loading={isLoading ? "true" : undefined}
        ref={ref}
        {...props}
      ></Comp>
    );
  },
);
IconButton.displayName = "IconButton";

export { IconButton, iconButtonVariants };
