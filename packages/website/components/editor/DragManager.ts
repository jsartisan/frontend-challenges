type Path = number[];
type DropZone = "top" | "right" | "bottom" | "left" | null;

type DragDropItem = {
  type: "panel" | "tab";
  path: Path;
};

export class DragManager {
  // Can't we store all this variables in dataTransfer.getData?
  // There is a limiation of dataTransfer.setData that data set on dragStart is not available on dragOver
  // So we need to store drag data here, we can use this data on dragOver event with getDragData method
  public source: DragDropItem | null = null;
  public target: DragDropItem | null = null;
  public dropZone: DropZone | null = null;

  setSource(source: DragDropItem) {
    this.source = source;
  }

  setTarget(target: DragDropItem) {
    this.target = target;
  }

  setDropZone(dropZone: DropZone) {
    this.dropZone = dropZone;
  }

  /**
   * Determines if source and target items are adjacent in the same row/column
   */
  public areSourceAndTargetAdjacent(
    sourceItemPath: Path,
    targetItemPath: Path,
    zone: DropZone,
    direction: "horizontal" | "vertical",
  ): boolean {
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
  }

  /**
   * Calculates drop zone from drag event
   */
  public getDropZoneFromEvent(e: React.DragEvent<HTMLElement>, type: "panel" | "tab" = "panel"): DropZone {
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
  }

  /**
   * Checks if drag operation should be allowed between source and target
   */
  public canDrop(sourceItemPath: Path, targetItemPath: Path): boolean {
    return sourceItemPath.join("-") !== targetItemPath.join("-");
  }
}
