import { cn } from "../../utils/helpers";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("bg-(--color-bg-neutral-strong) animate-pulse rounded", className)} {...props} />;
}

export { Skeleton };
