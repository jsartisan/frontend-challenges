"use client";

import { useLayout } from "@/providers/LayoutProvider";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../ui/resizable";
import { Children, useEffect, useState } from "react";
import { useSandpack } from "@codesandbox/sandpack-react";

type ResizableLayoutProps = {
  children: React.ReactNode;
};

export const ResizableLayout = (props: ResizableLayoutProps) => {
  const { layout } = useLayout();
  const [mounted, setMounted] = useState(false);
  const { sandpack } = useSandpack();
  const [description, editor, preview] = Children.toArray(props.children);

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
          <ResizableHandle className="w-2" />
          <ResizablePanel defaultSizePercentage={100 / 2}>
            <ResizablePanelGroup direction="vertical" className="grid gap-1">
              <ResizablePanel defaultSizePercentage={100 / 2}>{editor}</ResizablePanel>
              <ResizableHandle className="data-[panel-group-direction=vertical]:h-2" />
              <ResizablePanel defaultSizePercentage={100 / 2}>{preview}</ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </>
      );
    }

    if (layout === "layout-2") {
      return (
        <>
          <ResizablePanel defaultSizePercentage={100 / 3}>{description}</ResizablePanel>
          <ResizableHandle className="w-2" />
          <ResizablePanel defaultSizePercentage={100 / 3}>{editor}</ResizablePanel>
          <ResizableHandle className="w-2" />
          <ResizablePanel defaultSizePercentage={100 / 3}>{preview}</ResizablePanel>
        </>
      );
    }

    if (layout === "layout-3") {
      return (
        <>
          <ResizablePanel defaultSizePercentage={100 / 2}>
            <ResizablePanelGroup direction="vertical" className="grid gap-1">
              <ResizablePanel defaultSizePercentage={100 / 2}>{description}</ResizablePanel>
              <ResizableHandle className="data-[panel-group-direction=vertical]:h-2" />
              <ResizablePanel defaultSizePercentage={100 / 2}>{preview}</ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
          <ResizableHandle className="w-2" />
          <ResizablePanel defaultSizePercentage={100 / 2}>{editor}</ResizablePanel>
        </>
      );
    }
  };

  return (
    <ResizablePanelGroup direction="horizontal" className="grid gap-1">
      {renderChildren()}
    </ResizablePanelGroup>
  );
};
