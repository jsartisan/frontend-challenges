"use client";

import { cloneElement, useRef, useState } from "react";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import * as ResizablePrimitive from "react-resizable-panels";
import { ImperativePanelHandle } from "react-resizable-panels";

import { cn } from "../../utils/helpers";

const ResizablePanelGroup = (props: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => {
  const { children, className, ...rest } = props;

  return (
    <ResizablePrimitive.PanelGroup className={cn("flex h-full w-full", className)} {...rest}>
      {children}
    </ResizablePrimitive.PanelGroup>
  );
};

const ResizablePanel = (props: React.ComponentProps<typeof ResizablePrimitive.Panel> & {}) => {
  const {
    children,
    className,
    collapsedSize = 0,
    collapsible = true,
    defaultSize = 100,
    minSize = 15,
    ...rest
  } = props;
  const ref = useRef<ImperativePanelHandle>();
  const [, setIsCollapsed] = useState(collapsedSize === 0);

  return (
    <ResizablePrimitive.Panel
      className={cn(
        "relative",
        "group/panel sm:min-bs-0! min-bs-[200px]! basis-[calc(--spacing(9)+2px)]!",
        "&[[data-panel-size='0.0']:[writing-mode:tb] in-data-[panel-size='0.0']:[writing-mode:tb]",
        className,
      )}
      collapsible={collapsible}
      minSize={minSize}
      defaultSize={defaultSize}
      onCollapse={() => setIsCollapsed(true)}
      onExpand={() => setIsCollapsed(false)}
      ref={ref as React.RefObject<ImperativePanelHandle>}
      {...rest}
    >
      {cloneElement(children as React.ReactElement, {
        ...(((children as React.ReactElement).type as any)?.name === "ResizableLayoutTab" ? { panelRef: ref } : {}),
      })}
    </ResizablePrimitive.Panel>
  );
};

const ResizableHandle = ({
  className,
  withHandle,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean;
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      "focus-visible:ring-ring focus-visible:outline-hidden relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:translate-x-0 data-[panel-group-direction=vertical]:after:translate-y-1/2 [&[data-panel-group-direction=vertical]>div]:rotate-90",
      "hover:after:bg-(--color-bg-accent)",
      className,
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border">
        <DragHandleDots2Icon className="h-2.5 w-2.5" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
