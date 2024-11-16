type Path = number[];
type DropZone = "top" | "right" | "bottom" | "left" | null;

export class DragManager {
  constructor() {}

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
   * Calculates which drop zone the cursor is in based on mouse position
   */
  public getDropZone(x: number, y: number, width: number, height: number): DropZone {
    const centerX = width / 2;
    const centerY = height / 2;
    const relativeX = x - centerX;
    const relativeY = y - centerY;

    if (Math.abs(relativeX) > Math.abs(relativeY)) {
      return relativeX < 0 ? "left" : "right";
    } else {
      return relativeY < 0 ? "top" : "bottom";
    }
  }

  /**
   * Calculates drop zone from drag event
   */
  public getDropZoneFromEvent(e: React.DragEvent<HTMLDivElement>): DropZone {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    return this.getDropZone(x, y, rect.width, rect.height);
  }

  /**
   * Checks if drag operation should be allowed between source and target
   */
  public canDrop(sourceItemPath: Path, targetItemPath: Path): boolean {
    return sourceItemPath.join("-") !== targetItemPath.join("-");
  }
}
