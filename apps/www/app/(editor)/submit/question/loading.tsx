import { Skeleton } from "~/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="h-auto sm:h-[calc(100vh-var(--nav-top-offset))]">
      <div className="flex h-full w-full flex-col gap-4 p-4">
        <div className="relative flex w-full items-end justify-between gap-3">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold">Submit Question</h1>
            </div>
            <Skeleton className="h-6 w-44" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-20" />
          </div>
        </div>
        <div className="flex w-full grow gap-4">
          <Skeleton className="h-full w-6/12" />
          <Skeleton className="h-full w-6/12" />
        </div>
      </div>
    </div>
  );
}
