import { useState } from "react";
import { DropZone } from "../types";
import { DragManager } from "../DragManager";

interface DragAndDropProps {
  currentItemPath: number[];
  sourceItemPath: number[] | null;
  setSourceItemPath: (path: number[] | null) => void;
  direction: "horizontal" | "vertical";
  dragManager: DragManager;
}

export function useDragAndDrop({
  currentItemPath,
  sourceItemPath,
  setSourceItemPath,
  direction,
  dragManager,
}: DragAndDropProps) {
  const [dropZone, setDropZone] = useState<DropZone>(null);
  const [isDragging, setIsDragging] = useState(false);

  const areSourceAndCurrentItemZonesAdjacent = (zone: DropZone) => {
    if (!sourceItemPath || !zone) return false;
    return dragManager.areSourceAndTargetAdjacent(sourceItemPath, currentItemPath, zone, direction);
  };

  const handleDragStart = () => {
    setIsDragging(true);
    setSourceItemPath(currentItemPath);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!dragManager.canDrop(sourceItemPath, currentItemPath)) return;

    const zone = dragManager.getDropZoneFromEvent(e);
    if (areSourceAndCurrentItemZonesAdjacent(zone)) return;

    setDropZone(zone);
  };

  const handleDragLeave = () => setDropZone(null);

  const handleDragEnd = () => {
    setIsDragging(false);
    setSourceItemPath(null);
  };

  return {
    dropZone,
    isDragging,
    setDropZone,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDragEnd,
  };
}
