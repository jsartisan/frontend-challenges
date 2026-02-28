import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../utils/helpers";

const badgeVariants = cva(
  "inline-flex items-center w-max rounded-md border px-2.5 py-0.5 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-muted text-muted-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        tertiary: "border-transparent text-muted-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/80",
        outline: "text-foreground",
        warm: "border-transparent bg-orange-100 text-orange-900 dark:bg-orange-900/20 dark:text-orange-200",
        easy: "border-transparent bg-(--color-bg-easy-subtle) text-(--color-fg-easy)",
        medium: "border-transparent bg-(--color-bg-medium-subtle) text-(--color-fg-medium)",
        hard: "border-transparent bg-(--color-bg-hard-subtle) text-(--color-fg-hard)",
        question: "border-transparent bg-(--color-bg-question) text-(--color-fg-question)",
        quiz: "border-transparent bg-(--color-bg-quiz) text-(--color-fg-quiz)",
        extreme: "border-transparent bg-(--color-bg-extreme-subtle) text-(--color-fg-extreme)",
        pending: "border-transparent bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
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
