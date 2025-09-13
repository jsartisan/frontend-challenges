"use client";

import { Children, useEffect, useState } from "react";
import { useSandpack } from "@codesandbox/sandpack-react";

import { useLayout } from "~/features/code-editor/hooks/useLayout";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "~/components/ui";

type ResizableLayoutProps = {
  children: React.ReactNode;
  onLayoutChange?: (layout: string) => void;
};

export const ResizableLayout = (props: ResizableLayoutProps) => {
  const [mounted, setMounted] = useState(false);
  const { sandpack } = useSandpack();
  const { layout } = useLayout();
  const [mounted, setMounted] = useState(false);
  const { sandpack } = useSandpack();
  const [description, editor, preview, consoleElement] = Children.toArray(props.children);

  useEffect(() => {
    if (mounted == true) {
      setTimeout(() => {
        sandpack.runSandpack();
      }, 100);

      return;
    }

    setMounted(true);
  }, [layout, setMounted]);

  const renderChildren = () => {
    if (layout === "layout-1") {
      return (
        <>
          <ResizablePanel collapsible collapsedSize={0} defaultSize={100 / 2} minSize={100 / 3}>
            {description}
          </ResizablePanel>
          <ResizableHandle className="hidden w-2 sm:block" />
          <ResizablePanel defaultSize={100 / 2}>
            <ResizablePanelGroup direction="vertical" className="sm:flex! !grid gap-4 sm:gap-1">
              <ResizablePanel>{editor}</ResizablePanel>
              <ResizableHandle className="hidden data-[panel-group-direction=vertical]:h-2 sm:block" />
              <ResizablePanel>{preview}</ResizablePanel>
              <ResizableHandle className="hidden data-[panel-group-direction=vertical]:h-2 sm:block" />
              <ResizablePanel defaultSize={0}>{consoleElement}</ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </>
      );
    }

    if (layout === "layout-2") {
      return (
        <>
          <ResizablePanel defaultSize={100 / 3}>{description}</ResizablePanel>
          <ResizableHandle className="hidden w-2 sm:block" />
          <ResizablePanel defaultSize={100 / 3}>{editor}</ResizablePanel>
          <ResizableHandle className="hidden w-2 sm:block" />
          <ResizablePanel defaultSize={100 / 3}>
            <ResizablePanelGroup direction="vertical" className="sm:flex! !grid grid-rows-2 gap-4 sm:gap-1">
              <ResizablePanel defaultSize={100}>{preview}</ResizablePanel>
              <ResizableHandle className="hidden data-[panel-group-direction=vertical]:h-2 sm:block" />
              <ResizablePanel defaultSize={0}>{consoleElement}</ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </>
      );
    }

    if (layout === "layout-3") {
      return (
        <>
          <ResizablePanel defaultSize={100 / 2}>
            <ResizablePanelGroup direction="vertical" className="sm:flex! !grid grid-rows-2 gap-4 sm:gap-1">
              <ResizablePanel defaultSize={100 / 2}>{description}</ResizablePanel>
              <ResizableHandle className="hidden data-[panel-group-direction=vertical]:h-2 sm:block" />
              <ResizablePanel defaultSize={100 / 2}>{preview}</ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
          <ResizableHandle className="hidden w-2 sm:block" />
          <ResizablePanel defaultSize={100 / 2}>
            <ResizablePanelGroup direction="vertical" className="sm:flex! !grid grid-rows-2 gap-4 sm:gap-1">
              <ResizablePanel defaultSize={100}>{editor}</ResizablePanel>
              <ResizableHandle className="hidden data-[panel-group-direction=vertical]:h-2 sm:block" />
              <ResizablePanel defaultSize={0}>{consoleElement}</ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </>
      );
    }
  };

  return (
    <>
      <ResizablePanelGroup direction="horizontal" className="sm:flex! !grid gap-4 sm:gap-1" key={layout}>
        {renderChildren()}
      </ResizablePanelGroup>
    </>
  );
};
