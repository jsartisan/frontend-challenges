import React, { createContext, useContext, useState, useCallback } from "react";

type Path = number[];
export type DropZone = "top" | "right" | "bottom" | "left" | null;

export type DragDropItem = {
  type: "panel" | "tab";
  path: Path;
};

interface DragDropContextType {
  source: DragDropItem | null;
  target: DragDropItem | null;
  dropZone: DropZone;
  setSource: (source: DragDropItem | null) => void;
  setTarget: (target: DragDropItem | null) => void;
  setDropZone: (zone: DropZone) => void;
  areSourceAndTargetAdjacent: (
    sourceItemPath: Path,
    targetItemPath: Path,
    zone: DropZone,
    direction: "horizontal" | "vertical",
  ) => boolean;
  getDropZoneFromEvent: (e: React.DragEvent<HTMLElement>, type?: "panel" | "tab") => DropZone;
  canDrop: (source: DragDropItem, target: DragDropItem) => boolean;
}

const DragDropContext = createContext<DragDropContextType | undefined>(undefined);

export function DragDropProvider({ children }: { children: React.ReactNode }) {
  const [source, setSource] = useState<DragDropItem | null>(null);
  const [target, setTarget] = useState<DragDropItem | null>(null);
  const [dropZone, setDropZone] = useState<DropZone>(null);

  const areSourceAndTargetAdjacent = useCallback(
    (sourceItemPath: Path, targetItemPath: Path, zone: DropZone, direction: "horizontal" | "vertical"): boolean => {
      return false;
      if (!sourceItemPath || !zone) return false;

      const sourceLastIndex = sourceItemPath[sourceItemPath.length - 1];
      const targetLastIndex = targetItemPath[targetItemPath.length - 1];
      const sourceParentPath = sourceItemPath.slice(0, -1);
      const targetParentPath = targetItemPath.slice(0, -1);
      const areInSameRow = sourceParentPath.join("-") === targetParentPath.join("-");

      if (areInSameRow && direction === "vertical") return false;
      if (!areInSameRow) return false;

      return (
        (sourceLastIndex === targetLastIndex - 1 && zone === "left") ||
        (sourceLastIndex === targetLastIndex + 1 && zone === "right")
      );
    },
    [],
  );

  const getDropZoneFromEvent = useCallback(
    (e: React.DragEvent<HTMLElement>, type: "panel" | "tab" = "panel"): DropZone => {
      const rect = e.currentTarget.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = width / 2;
      const centerY = height / 2;
      const relativeX = x - centerX;
      const relativeY = y - centerY;

      if (type === "tab") {
        return relativeX < 0 ? "left" : "right";
      }

      if (Math.abs(relativeX) > Math.abs(relativeY)) {
        return relativeX < 0 ? "left" : "right";
      } else {
        return relativeY < 0 ? "top" : "bottom";
      }
    },
    [],
  );

  const canDrop = useCallback((source: DragDropItem, target: DragDropItem): boolean => {
    if (source.type === "tab") {
      return source.path.slice(0, -1).join("-") !== target.path.join("-");
    }

    return source.path.join("-") !== target.path.join("-");
  }, []);

  const value = {
    source,
    target,
    dropZone,
    setSource,
    setTarget,
    setDropZone,
    areSourceAndTargetAdjacent,
    getDropZoneFromEvent,
    canDrop,
  };

  return <DragDropContext.Provider value={value}>{children}</DragDropContext.Provider>;
}

export function useDragDrop() {
  const context = useContext(DragDropContext);
  if (context === undefined) {
    throw new Error("useDragDrop must be used within a DragDropProvider");
  }
  return context;
}
