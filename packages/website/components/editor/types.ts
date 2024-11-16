export type DropZone = "top" | "right" | "bottom" | "left" | null;

export interface DragAndDropProps {
  path: number[];
  draggable?: boolean;
  updateLayout: (onDroppingItemPath: number[], dropZone: DropZone) => void;
  sourceItemPath: number[] | null;
  setSourceItemPath: (path: number[] | null) => void;
  direction: "horizontal" | "vertical";
}
