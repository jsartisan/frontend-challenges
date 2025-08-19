"use client";

import { cloneElement, useRef, useState } from "react";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import * as ResizablePrimitive from "react-resizable-panels";
import { ImperativePanelGroupHandle, ImperativePanelHandle } from "react-resizable-panels";

import { cn } from "../../utils/helpers";

const ResizablePanelGroup = (props: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => {
  const { className, children, ...rest } = props;
  const groupRef = useRef<ResizablePrimitive.ImperativePanelGroupHandle>();

  return (
    <ResizablePrimitive.PanelGroup className={cn("flex h-full w-full", className)} {...rest}>
      {Array.isArray(children)
        ? children.map((child, index) => cloneElement(child, { groupDirection: rest.direction, groupRef, key: index }))
        : cloneElement(children as React.ReactElement, { groupDirection: rest.direction, groupRef })}
    </ResizablePrimitive.PanelGroup>
  );
};

const ResizablePanel = (
  props: React.ComponentProps<typeof ResizablePrimitive.Panel> & {
    groupDirection?: "horizontal" | "vertical";
    groupRef?: React.RefObject<ImperativePanelGroupHandle>;
  },
) => {
  const {
    className,
    children,
    collapsible = true,
    collapsedSize = 0,
    minSize = 15,
    defaultSize = 100,
    ...rest
  } = props;
  const ref = useRef<ImperativePanelHandle>();
  const [, setIsCollapsed] = useState(collapsedSize === 0);

  return (
    <ResizablePrimitive.Panel
      className={cn(
        "group/panel sm:min-bs-0! min-bs-[200px]! basis-[calc(--spacing(9)+2px)]!",
        "&[[data-panel-size='0.0']:[writing-mode:tb] in-data-[panel-size='0.0']:[writing-mode:tb]",
        className,
      )}
      collapsible={collapsible}
      minSize={minSize}
      defaultSize={defaultSize}
      onCollapse={() => setIsCollapsed(true)}
      onExpand={() => setIsCollapsed(false)}
      ref={ref}
      {...rest}
    >
      {cloneElement(children as React.ReactElement, {
        panelRef: ref,
        groupDirection: rest.groupDirection,
        groupRef: rest.groupRef,
      })}
    </ResizablePrimitive.Panel>
  );
};

const ResizableHandle = ({
  withHandle,
  className,
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
