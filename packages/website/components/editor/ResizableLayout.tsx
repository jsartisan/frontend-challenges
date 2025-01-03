"use client";

import { Children, useEffect, useState, useRef, cloneElement } from "react";
import { useSandpack } from "@codesandbox/sandpack-react";

import { useLayout } from "../../providers/LayoutProvider";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../ui/resizable";
import { ImperativePanelHandle } from "react-resizable-panels";

type ResizableLayoutProps = {
  children: React.ReactNode;
  onLayoutChange?: (layout: string) => void;
};

export const ResizableLayout = (props: ResizableLayoutProps) => {
  const { layout } = useLayout();
  const [mounted, setMounted] = useState(false);
  const { sandpack } = useSandpack();
  const consoleRef = useRef<ImperativePanelHandle>();
  const [consoleCollapsed, setConsoleCollapsed] = useState(false);
  const [description, editor, preview, consoleElement] = Children.toArray(props.children);

  useEffect(() => {}, []);

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
          <ResizablePanel defaultSize={100 / 2} minSize={100 / 3}>
            {description}
          </ResizablePanel>
          <ResizableHandle className="hidden w-2 sm:block" />
          <ResizablePanel defaultSize={100 / 2}>
            <ResizablePanelGroup direction="vertical" className="!grid gap-4 sm:!flex sm:gap-1">
              <ResizablePanel defaultSize={100 / 2} className="min-h-[200px] sm:min-h-0">
                {editor}
              </ResizablePanel>
              <ResizableHandle className="hidden data-[panel-group-direction=vertical]:h-2 sm:block" />
              <ResizablePanel defaultSize={100 / 2} minSize={40} className="min-h-[200px] sm:min-h-0">
                {preview}
              </ResizablePanel>
              <ResizableHandle className="hidden data-[panel-group-direction=vertical]:h-2 sm:block" />
              <ResizablePanel
                collapsible
                collapsedSize={40}
                minSize={200}
                className="sm:min-h-0"
                ref={consoleRef}
                onCollapse={() => {
                  setConsoleCollapsed(true);
                }}
                onExpand={() => {
                  setConsoleCollapsed(false);
                }}
              >
                {cloneElement(consoleElement as React.ReactElement, {
                  consoleRef,
                  consoleCollapsed,
                  setConsoleCollapsed,
                })}
              </ResizablePanel>
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
            <ResizablePanelGroup direction="vertical" className="!grid grid-rows-2 gap-4 sm:!flex sm:gap-1">
              <ResizablePanel defaultSize={100}>{preview}</ResizablePanel>
              <ResizableHandle className="hidden data-[panel-group-direction=vertical]:h-2 sm:block" />
              <ResizablePanel
                collapsible
                collapsedSize={40}
                minSize={200}
                className="min-h-[200px] sm:min-h-0"
                ref={consoleRef}
                onCollapse={() => {
                  setConsoleCollapsed(true);
                }}
                onExpand={() => {
                  setConsoleCollapsed(false);
                }}
              >
                {cloneElement(consoleElement as React.ReactElement, {
                  consoleRef,
                  consoleCollapsed,
                  setConsoleCollapsed,
                })}
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </>
      );
    }

    if (layout === "layout-3") {
      return (
        <>
          <ResizablePanel defaultSize={100 / 2}>
            <ResizablePanelGroup direction="vertical" className="!grid grid-rows-2 gap-4 sm:!flex sm:gap-1">
              <ResizablePanel defaultSize={100 / 2}>{description}</ResizablePanel>
              <ResizableHandle className="hidden data-[panel-group-direction=vertical]:h-2 sm:block" />
              <ResizablePanel defaultSize={100 / 2}>{preview}</ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
          <ResizableHandle className="hidden w-2 sm:block" />
          <ResizablePanel defaultSize={100 / 2}>
            <ResizablePanelGroup direction="vertical" className="!grid grid-rows-2 gap-4 sm:!flex sm:gap-1">
              <ResizablePanel defaultSize={100}>{editor}</ResizablePanel>
              <ResizableHandle className="hidden data-[panel-group-direction=vertical]:h-2 sm:block" />
              <ResizablePanel
                collapsible
                collapsedSize={40}
                minSize={200}
                className="min-h-[200px] sm:min-h-0"
                ref={consoleRef}
                onCollapse={() => {
                  setConsoleCollapsed(true);
                }}
                onExpand={() => {
                  setConsoleCollapsed(false);
                }}
              >
                {cloneElement(consoleElement as React.ReactElement, {
                  consoleRef,
                  consoleCollapsed,
                  setConsoleCollapsed,
                })}
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </>
      );
    }
  };

  return (
    <>
      <ResizablePanelGroup direction="horizontal" className="!grid gap-4 sm:!flex sm:gap-1">
        {renderChildren()}
      </ResizablePanelGroup>
    </>
  );
};
