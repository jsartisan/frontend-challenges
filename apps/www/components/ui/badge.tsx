import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../utils/helpers";

const badgeVariants = cva(
  "inline-flex items-center w-max rounded-md border px-2.5 py-0.5 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-muted text-foreground",
        secondary: "border-transparent bg-muted text-foreground",
        tertiary: "border-transparent text-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/80",
        outline: "text-foreground",
        warm: "border-transparent bg-accent text-foreground",
        easy: "border-transparent bg-easy text-easy-foreground",
        medium: "border-transparent bg-medium text-medium-foreground",
        hard: "border-transparent bg-hard text-hard-foreground",
        question: "border-transparent bg-extreme text-extreme-foreground",
        quiz: "border-transparent bg-medium text-medium-foreground",
        extreme: "border-transparent bg-extreme text-extreme-foreground",
        pending: "border-transparent bg-muted text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
