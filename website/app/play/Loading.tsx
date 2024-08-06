import { Skeleton } from "@/website/components/ui/skeleton";

export function Loading() {
  return (
    <div className="h-auto sm:h-[calc(100vh_-_var(--nav-top-offset))]">
      <div className="flex h-full w-full flex-col gap-4 p-4">
        <div className="relative flex w-full justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-semibold">Playground</h1>
          </div>
          <Skeleton className="h-8 w-20" />
        </div>
        <div className="flex w-full flex-grow gap-4">
          <Skeleton className="h-full w-2/12" />
          <Skeleton className="h-full w-6/12" />
          <Skeleton className="h-full w-4/12" />
        </div>
      </div>
    </div>
  );
}
