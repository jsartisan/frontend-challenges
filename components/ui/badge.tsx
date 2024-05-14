import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/helpers";

const badgeVariants = cva(
  "inline-flex items-center w-max rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-[var(--color-bg-neutral)] text-[var(--color-fg-neutral)]",
        secondary: "border-transparent bg-[var(--color-bg-neutral)] text-[var(--color-fg-neutral)]",
        tertiary: "border-transparent text-[var(--color-fg-neutral)]",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        warm: "border-transparent bg-[var(--color-bg-warm)] text-[var(--color-fg-warm)]",
        easy: "border-transparent bg-[var(--color-bg-easy)] text-[var(--color-fg-easy)]",
        medium: "border-transparent bg-[var(--color-bg-medium)] text-[var(--color-fg-medium)]",
        hard: "border-transparent bg-[var(--color-bg-hard)] text-[var(--color-fg-hard)]",
        question: "border-transparent bg-[var(--color-bg-question)] text-[var(--color-fg-question)]",
        quiz: "border-transparent bg-[var(--color-bg-quiz)] text-[var(--color-fg-quiz)]",
        extreme: "border-transparent bg-[var(--color-bg-extreme)] text-[var(--color-fg-extreme)]",
        pending: "border-transparent bg-[var(--color-bg-pending)] text-[var(--color-fg-pending)]",
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
