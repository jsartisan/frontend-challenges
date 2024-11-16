import React, { cloneElement, ComponentProps, useRef, useState } from "react";
import { ResizablePanel } from "../ui/resizable";
import { ImperativePanelHandle } from "react-resizable-panels";
import { cn } from "packages/website/utils/helpers";
import { DragManager } from "./DragManager";
import { useDragAndDrop } from "./hooks/useDragAndDrop";
import { DropZoneIndicator } from "./components/DropZoneIndicator";

type DragAndDropProps = ComponentProps<typeof ResizablePanel> & {
  path: number[];
  draggable?: boolean;
  updateLayout: (onDroppingItemPath: number[], dropZone: "top" | "right" | "bottom" | "left" | null) => void;
  sourceItemPath: number[] | null;
  setSourceItemPath: (path: number[] | null) => void;
  direction: "horizontal" | "vertical";
  defaultCollapsed?: boolean;
};

export function DynamicResizablePanel(props: DragAndDropProps) {
  const {
    children,
    draggable,
    updateLayout,
    path: currentItemPath,
    sourceItemPath,
    setSourceItemPath,
    direction,
    defaultCollapsed,
  } = props;
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  const ref = useRef<ImperativePanelHandle>();
  const dragManager = useRef(new DragManager());

  const { dropZone, isDragging, setDropZone, handleDragStart, handleDragOver, handleDragLeave, handleDragEnd } =
    useDragAndDrop({ currentItemPath, sourceItemPath, setSourceItemPath, direction, dragManager: dragManager.current });

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    updateLayout(currentItemPath, dropZone);
    setDropZone(null);
  };

  let content = children;

  if (draggable) {
    content = (
      <div
        className={cn("relative h-full w-full", isDragging && "opacity-50")}
        style={{ containerType: "size" }}
        data-dragging={isDragging ? "" : undefined}
        draggable
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDragEnd={handleDragEnd}
        onDrop={handleDrop}
        onDragStart={handleDragStart}
      >
        <div className="h-full w-full group-has-[[data-dragging]]/layout-group:pointer-events-none">
          {cloneElement(children as React.ReactElement, {
            panelRef: ref,
          })}
        </div>
        <DropZoneIndicator dropZone={dropZone} />
      </div>
    );
  }

  return (
    <ResizablePanel
      ref={ref}
      collapsible
      collapsedSize={0}
      minSize={15}
      defaultSize={defaultCollapsed ? 0 : props.defaultSize}
      className="!min-h-[200px] !basis-10 sm:!min-h-0"
      onCollapse={() => setCollapsed(true)}
      onExpand={() => setCollapsed(false)}
      data-panel-collapsed={collapsed ? "true" : "false"}
      data-panel-direction={direction}
    >
      {content}
    </ResizablePanel>
  );
}
