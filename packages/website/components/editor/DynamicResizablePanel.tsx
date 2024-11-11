import React, { cloneElement, ComponentProps, useRef, useState } from "react";
import { ResizablePanel } from "../ui/resizable";
import { ImperativePanelHandle } from "react-resizable-panels";
import { cn } from "packages/website/utils/helpers";

type DynamicResizablePanelProps = ComponentProps<typeof ResizablePanel> & {
  path: number[];
  draggable?: boolean;
  updateLayout: (onDroppingItemPath: number[], dropZone: "top" | "right" | "bottom" | "left" | null) => void;
  sourceItemPath: number[] | null;
  setSourceItemPath: (path: number[] | null) => void;
  direction: "horizontal" | "vertical";
};

export function DynamicResizablePanel(props: DynamicResizablePanelProps) {
  const {
    children,
    draggable,
    updateLayout,
    path: currentItemPath,
    sourceItemPath,
    setSourceItemPath,
    direction,
    ...rest
  } = props;
  const ref = useRef<ImperativePanelHandle>();
  const [collapsed, setCollapsed] = useState(false);
  const [dropZone, setDropZone] = useState<"top" | "right" | "bottom" | "left" | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = () => {
    setIsDragging(true);

    setSourceItemPath(currentItemPath);
  };

  const areSourceAndCurrentItemZonesAdjacent = (zone: "top" | "right" | "bottom" | "left" | null) => {
    if (!sourceItemPath || !zone) return false;

    // check if currentItem and sourceItem are in the same row

    const sourceLastIndex = sourceItemPath[sourceItemPath.length - 1];
    const currentLastIndex = currentItemPath[currentItemPath.length - 1];
    const sourceParentPath = sourceItemPath.slice(0, -1);
    const currentParentPath = currentItemPath.slice(0, -1);
    const areInSameRow = sourceParentPath.join("-") === currentParentPath.join("-");

    console.log("## areInSameRow", areInSameRow, direction);

    if (areInSameRow && direction === "vertical") return false;

    if (areInSameRow === false) return false;

    const areItemsAdjacent =
      (sourceLastIndex === currentLastIndex - 1 && zone === "left") ||
      (sourceLastIndex === currentLastIndex + 1 && zone === "right");

    return areItemsAdjacent;
  };

  /**
   * handleDrop is called when the draggable item is dropped
   */
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    updateLayout(currentItemPath, dropZone);
    setDropZone(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    console.log({
      sourceItemPath,
      currentItemPath,
      sourceItemPathJoin: sourceItemPath.join("-"),
      currentItemPathJoin: currentItemPath.join("-"),
    });

    if (sourceItemPath.join("-") === currentItemPath.join("-")) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const zone = getDropZone(x, y, rect.width, rect.height);

    if (areSourceAndCurrentItemZonesAdjacent(zone)) return;

    setDropZone(zone);
  };

  const getDropZone = (x: number, y: number, width: number, height: number) => {
    // Calculate center point
    const centerX = width / 2;
    const centerY = height / 2;

    // Calculate relative position from center
    const relativeX = x - centerX;
    const relativeY = y - centerY;

    // Use slope comparison to determine which triangle quadrant we're in
    // Compare if point is above/below the diagonal lines y = x and y = -x
    if (Math.abs(relativeX) > Math.abs(relativeY)) {
      // In left or right triangles
      return relativeX < 0 ? "left" : "right";
    } else {
      // In top or bottom triangles
      return relativeY < 0 ? "top" : "bottom";
    }
  };

  const handleDragLeave = () => {
    setDropZone(null);
  };

  /**
   * onDragEnd is called when the draggable item is dropped
   */
  const handleDragEnd = () => {
    setIsDragging(false);
    setSourceItemPath(null);
  };

  let content = cloneElement(children as React.ReactElement, {
    ref,
    collapsed,
    setCollapsed,
  });

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
        <div className="h-full w-full group-has-[[data-dragging]]/layout-group:pointer-events-none">{content}</div>
        {dropZone && (
          <div
            className={cn({
              absolute: true,
              "top-0": dropZone === "top",
              "bottom-0": dropZone === "bottom",
              "left-0 top-0": dropZone === "left",
              "right-0 top-0": dropZone === "right",
            })}
          >
            <div
              className={cn({
                "fixed bg-purple-500": true,
                "-mt-2.5 h-1 w-[100cqw]": dropZone === "top",
                "mt-1.5 h-1 w-[100cqw]": dropZone === "bottom",
                "-ml-2.5 h-[100cqh] w-1": dropZone === "left",
                "ml-1.5 h-[100cqh] w-1": dropZone === "right",
              })}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <ResizablePanel
      ref={ref}
      collapsible
      collapsedSizePixels={40}
      minSizePixels={200}
      onCollapse={() => {
        setCollapsed(true);
      }}
      onExpand={() => {
        setCollapsed(false);
      }}
      {...rest}
    >
      {content}
    </ResizablePanel>
  );
}
