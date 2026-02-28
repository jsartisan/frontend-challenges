import { cn } from "../../utils/helpers";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("bg-muted animate-pulse rounded", className)} {...props} />;
}

export { Skeleton };
