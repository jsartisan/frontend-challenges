import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../utils/helpers";

const iconButtonVariants = cva(
  cn(
    "relative inline-flex items-center justify-center whitespace-nowrap rounded text-sm font-medium focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    "[&[data-loading=true]>*]:invisible data-[loading=true]:after:content-[''] data-[loading=true]:after:absolute data-[loading=true]:after:top-1/2 data-[loading=true]:after:left-1/2 data-[loading=true]:after:w-4 data-[loading=true]:after:h-4 data-[loading=true]:after:-mt-2 data-[loading=true]:after:-ml-2 data-[loading=true]:after:rounded-full data-[loading=true]:after:border data-[loading=true]:after:border-t-black data-[loading=true]:after:animate-spin data-[loading=true]:after:absolute",
  ),
  {
    variants: {
      variant: {
        primary:
          "bg-(--color-bg-accent) text-(--color-fg-onaccent) hover:bg-(--color-bg-accent-hover) active:bg-(--color-bg-accent-active)",
        secondary:
          "bg-(--color-bg) text-(--color-fg) border border-(--color-bd) hover:bg-(--color-bg-hover) active:bg-(--color-bg-active)",
        tertiary: "hover:bg-(--color-bg-hover) active:bg-(--color-bg-active)",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        default: "h-8 w-8 [&>svg]:size-5",
        xs: "size-6 [&>svg]:size-3 [&>svg>path]:stroke-2",
        sm: "size-7 [&>svg]:size-[18px] rounded-sm",
        lg: "size-10 [&>svg]:size-7",
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
  ({ asChild = false, className, isLoading, size, variant, ...props }, ref) => {
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
