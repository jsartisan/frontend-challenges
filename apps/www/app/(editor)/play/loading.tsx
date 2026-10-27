import { Skeleton } from "~/components/ui/skeleton";
import { PANEL_SIZES } from "~/screens/playground/lib/panelSizes";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "~/components/ui";

// Mirrors the panel layout of PlaygroundInner so the editor replaces the skeleton without shifting.
export default function Loading() {
  return (
    <div className="h-auto sm:h-[calc(100vh-var(--nav-top-offset))]">
      <div className="flex h-full w-full flex-col gap-4 p-4">
        <div className="relative flex w-full justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-semibold">Playground</h1>
          </div>
          <Skeleton className="hidden h-8 w-16 sm:block" />
        </div>
        <div className="min-h-0 w-full grow">
          <ResizablePanelGroup direction="horizontal" className="sm:flex! !grid gap-4 sm:gap-1">
            <ResizablePanel defaultSize={PANEL_SIZES.fileExplorer}>
              <Skeleton className="h-full w-full" />
            </ResizablePanel>
            <ResizableHandle className="hidden w-2 sm:block" />
            <ResizablePanel defaultSize={PANEL_SIZES.editor}>
              <Skeleton className="h-full w-full" />
            </ResizablePanel>
            <ResizableHandle className="hidden w-2 sm:block" />
            <ResizablePanel defaultSize={PANEL_SIZES.preview}>
              <ResizablePanelGroup direction="vertical" className="sm:flex! !grid gap-4 sm:gap-1">
                <ResizablePanel>
                  <Skeleton className="h-full w-full" />
                </ResizablePanel>
                <ResizableHandle className="hidden data-[panel-group-direction=vertical]:h-2 sm:block" />
                <ResizablePanel defaultSize={0}>
                  <Skeleton className="h-full w-full" />
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  );
}
