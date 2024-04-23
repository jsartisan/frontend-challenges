import { cn } from "@/utils/helpers";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded bg-[var(--color-bg-neutral-subtle)]", className)} {...props} />;
}

export { Skeleton };
