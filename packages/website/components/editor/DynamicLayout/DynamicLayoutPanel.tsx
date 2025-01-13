import React, { cloneElement, ComponentProps, useEffect, useRef, useState } from "react";
import { ResizablePanel } from "@/web/components/ui/resizable";
import { ImperativePanelHandle } from "react-resizable-panels";
import { cn } from "packages/website/utils/helpers";
import { DropZoneIndicator } from "../components/DropZoneIndicator";
import { DropZone } from "../types";
import { DragDropItem, useDragDrop } from "packages/website/contexts/DragDropContext";
import { DropZones } from "./DropZones";

type DragAndDropProps = ComponentProps<typeof ResizablePanel> & {
  path: number[];
  draggable?: boolean;
  updateLayout: (source: DragDropItem, target: DragDropItem, dropZone: DropZone) => void;
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
  const ref = useRef<ImperativePanelHandle>();
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [isDragging, setIsDragging] = useState(false);
  const { source, target, dropZone, setSource, setTarget, setDropZone, getDropZoneFromEvent } = useDragDrop();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (!source) return;

    // if we are dragging over tab list or tab button, we don't need to show drop zone indicator
    // as we handle that dropZone in DynamicResizableTab component
    if (source.type === "tab") {
      const target = e.target as HTMLElement;
      const role = target.getAttribute("role");

      if (role === "tablist" || role === "tab") {
        return;
      }
    }

    if (source.type === "panel") {
      const targetPath = currentItemPath;
      const sourcePath = source.path;

      if (sourcePath.join("-") === targetPath.join("-")) {
        return;
      }
    }

    setTarget({
      path: currentItemPath,
      type: "panel",
    });

    const zone = getDropZoneFromEvent(e);

    setDropZone(zone);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setSourceItemPath(null);
    setDropZone(null);

    // remove data-dragging attribute from the body
    document.body.removeAttribute("data-dragging");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    // if (target?.type === "tab") {
    //   return;
    // }

    if (!source) return;

    updateLayout(source, target, dropZone);

    setDropZone(null);

    // remove data-dragging attribute from the body
    document.body.removeAttribute("data-dragging");
  };

  useEffect(() => {
    const handleOpenParentPanel = (e: CustomEvent<number[]>) => {
      if (e.detail.slice(0, -1).join(",") === currentItemPath.join(",")) {
        ref.current?.expand(30);
      }
    };

    window.addEventListener("openParentPanel", handleOpenParentPanel as EventListener);

    return () => {
      window.removeEventListener("openParentPanel", handleOpenParentPanel as EventListener);
    };
  }, [currentItemPath]);

  let content = children;

  if (draggable) {
    content = (
      <div
        className={cn("relative h-full w-full", isDragging && "opacity-50")}
        data-dragging={isDragging ? "" : undefined}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDrop={handleDrop}
        draggable={false}
        data-path={currentItemPath.toString()}
      >
        <div className="h-full w-full group-has-[[data-dragging]]/layout-group:pointer-events-none">
          {cloneElement(children as React.ReactElement, {
            panelRef: ref,
          })}
        </div>
        <DropZoneIndicator
          dropZone={dropZone && target?.path.join("-") === currentItemPath.join("-") ? dropZone : null}
        />
        <DropZones path={currentItemPath} />
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
      className={cn(
        "group/panel sm:!min-bs-0 !min-bs-[200px] !basis-[calc(theme(spacing.9)+2px)]",
        "&[[data-panel-collapsed=true]:[writing-mode:tb] [[data-panel-collapsed=true]_&]:[writing-mode:tb]",
      )}
      onCollapse={() => setCollapsed(true)}
      onExpand={() => setCollapsed(false)}
      data-panel-collapsed={collapsed ? "true" : "false"}
      data-panel-direction={direction}
    >
      {content}
    </ResizablePanel>
  );
}
