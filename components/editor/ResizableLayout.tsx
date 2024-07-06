"use client";

import { useLayout } from "@/providers/LayoutProvider";
import { useSandpack } from "@codesandbox/sandpack-react";
import { Children, useEffect, useState } from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../ui/resizable";

type ResizableLayoutProps = {
  children: React.ReactNode;
  onLayoutChange?: (layout: string) => void;
};

export const ResizableLayout = (props: ResizableLayoutProps) => {
  const { layout } = useLayout();
  const [mounted, setMounted] = useState(false);
  const { sandpack } = useSandpack();
  const [description, editor, preview, console] = Children.toArray(props.children);

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
          <ResizablePanel defaultSizePercentage={100 / 2} minSizePercentage={100 / 3}>
            {description}
          </ResizablePanel>
          <ResizableHandle className="hidden w-2 sm:block" />
          <ResizablePanel defaultSizePercentage={100 / 2}>
            <ResizablePanelGroup direction="vertical" className="!grid grid-rows-2 gap-4 sm:!flex sm:gap-1">
              <ResizablePanel defaultSizePercentage={100 / 2}>{editor}</ResizablePanel>
              <ResizableHandle className="hidden data-[panel-group-direction=vertical]:h-2 sm:block" />
              <ResizablePanel defaultSizePercentage={100 / 2} minSizePixels={40}>
                {preview}
              </ResizablePanel>
              <ResizableHandle className="hidden data-[panel-group-direction=vertical]:h-2 sm:block" />
              {console}
            </ResizablePanelGroup>
          </ResizablePanel>
        </>
      );
    }

    if (layout === "layout-2") {
      return (
        <>
          <ResizablePanel defaultSizePercentage={100 / 3}>{description}</ResizablePanel>
          <ResizableHandle className="hidden w-2 sm:block" />
          <ResizablePanel defaultSizePercentage={100 / 3}>{editor}</ResizablePanel>
          <ResizableHandle className="hidden w-2 sm:block" />
          <ResizablePanel defaultSizePercentage={100 / 3}>
            <ResizablePanelGroup direction="vertical" className="!grid grid-rows-2 gap-4 sm:!flex sm:gap-1">
              <ResizablePanel defaultSizePercentage={100}>{preview}</ResizablePanel>
              <ResizableHandle className="hidden data-[panel-group-direction=vertical]:h-2 sm:block" />
              {console}
            </ResizablePanelGroup>
          </ResizablePanel>
        </>
      );
    }

    if (layout === "layout-3") {
      return (
        <>
          <ResizablePanel defaultSizePercentage={100 / 2}>
            <ResizablePanelGroup direction="vertical" className="!grid grid-rows-2 gap-4 sm:!flex sm:gap-1">
              <ResizablePanel defaultSizePercentage={100 / 2}>{description}</ResizablePanel>
              <ResizableHandle className="hidden data-[panel-group-direction=vertical]:h-2 sm:block" />
              <ResizablePanel defaultSizePercentage={100 / 2}>{preview}</ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
          <ResizableHandle className="hidden w-2 sm:block" />
          <ResizablePanel defaultSizePercentage={100 / 2}>
            <ResizablePanelGroup direction="vertical" className="!grid grid-rows-2 gap-4 sm:!flex sm:gap-1">
              <ResizablePanel defaultSizePercentage={100}>{editor}</ResizablePanel>
              <ResizableHandle className="hidden data-[panel-group-direction=vertical]:h-2 sm:block" />
              {console}
            </ResizablePanelGroup>
          </ResizablePanel>
        </>
      );
    }
  };

  return (
    <>
      <ResizablePanelGroup direction="horizontal" className="!grid grid-rows-2 gap-4 sm:!flex sm:gap-1">
        {renderChildren()}
      </ResizablePanelGroup>
    </>
  );
};
