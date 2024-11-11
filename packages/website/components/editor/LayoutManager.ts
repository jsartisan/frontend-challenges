import { Layout, LayoutGroup, LayoutItem } from "./DynamicResizableLayout";

type Path = number[];
type DropZone = "top" | "right" | "bottom" | "left";

export class LayoutManager {
  private layout: LayoutGroup;

  constructor(initialLayout: LayoutGroup) {
    this.layout = initialLayout;
  }

  public updateLayout(sourcePath: Path, targetPath: Path, dropZone: DropZone): LayoutItem | LayoutGroup {
    switch (dropZone) {
      case "left":
      case "right":
        this.handleHorizontalDrop(sourcePath, targetPath, dropZone);
        break;
      case "top":
      case "bottom":
        this.handleVerticalDrop(sourcePath, targetPath, dropZone);
        break;
    }

    this.removeSourceItem(sourcePath, targetPath, dropZone);
    this.regenerateItemIds(this.layout);
    this.removeEmptyGroups(this.layout);

    return this.layout;
  }

  private handleHorizontalDrop(sourcePath: Path, targetPath: Path, dropZone: DropZone) {
    const sourceItem = this.getItem(sourcePath);
    const targetParent = this.getParent(targetPath);

    if (targetParent.direction === "vertical") {
      this.convertToHorizontalGroup(sourcePath, targetPath, dropZone);

      return;
    }

    this.insertItemAtPath(targetPath, sourceItem, dropZone);
  }

  private handleVerticalDrop(sourcePath: Path, targetPath: Path, dropZone: DropZone) {
    const sourceItem = this.getItem(sourcePath);
    const targetParent = this.getParent(targetPath);

    if (targetParent.direction === "horizontal") {
      this.convertToVerticalGroup(sourcePath, targetPath, dropZone);

      return;
    }

    this.insertItemAtPath(targetPath, sourceItem, dropZone);
  }

  private convertToHorizontalGroup(sourcePath: Path, targetPath: Path, dropZone: DropZone) {
    const source = this.getItem(sourcePath);
    const target = this.getItem(targetPath);

    const newGroup: LayoutGroup = { id: crypto.randomUUID(), direction: "horizontal", children: [target] };

    newGroup.children.splice(dropZone === "left" ? 0 : 1, 0, source);

    this.replaceItemAtPath(targetPath, newGroup);
  }

  private convertToVerticalGroup(sourcePath: Path, targetPath: Path, dropZone: DropZone) {
    const source = this.getItem(sourcePath);
    const target = this.getItem(targetPath);

    const newGroup: LayoutGroup = { id: crypto.randomUUID(), direction: "vertical", children: [target] };

    newGroup.children.splice(dropZone === "top" ? 0 : 1, 0, source);

    this.replaceItemAtPath(targetPath, newGroup);
  }

  /**
   * Checks if a given layout item is a group that can contain other items.
   * This is a key abstraction that separates the two fundamental types in our layout system:
   * groups (which can contain other items) and leaf items (which contain actual content).
   *
   * @param item - The layout item to check
   * @returns True if the item is a group that can contain children, false otherwise
   */
  private isLayoutGroup(item: Layout): item is LayoutGroup {
    return (
      item && typeof item === "object" && "direction" in item && "children" in item && Array.isArray(item.children)
    );
  }

  /**
   * ------------------------------------------------------------------------------------------------
   * Path navigators
   * ------------------------------------------------------------------------------------------------
   */
  private getItem(path: Path): LayoutItem {
    return path.reduce((acc, index) => acc.children[index], this.layout) as LayoutItem;
  }

  private getParent(path: Path) {
    const parentPath = this.getParentPath(path);

    return (parentPath.length ? this.getItem(parentPath) : this.layout) as LayoutGroup;
  }

  private getParentPath(path: Path): Path {
    return path.slice(0, -1);
  }

  /**
   * ------------------------------------------------------------------------------------------------
   * Modifiers
   * ------------------------------------------------------------------------------------------------
   */
  private removeItemAtPath(path: Path): void {
    const parentPath = path.slice(0, -1);
    const parent = (parentPath.length ? this.getItem(parentPath) : this.layout) as LayoutGroup;
    const index = path[path.length - 1];

    parent.children.splice(index, 1);
  }

  private removeSourceItem(sourcePath: Path, targetPath: Path, dropZone: DropZone) {
    if (this.hasSameParent(sourcePath, targetPath) && dropZone === "left") {
      const sourceIndex = sourcePath[sourcePath.length - 1];

      this.removeItemAtPath(sourcePath.slice(0, -1).concat(sourceIndex + 1));

      return;
    }

    this.removeItemAtPath(sourcePath);
  }

  private insertItemAtPath(targetPath: Path, sourceItem: LayoutItem, dropZone: DropZone) {
    const targetParent = this.getParent(targetPath);
    const targetIndex = targetPath[targetPath.length - 1];

    targetParent.children.splice(dropZone === "left" ? targetIndex : targetIndex + 1, 0, sourceItem);
  }

  private replaceItemAtPath(path: Path, item: LayoutItem | LayoutGroup) {
    const parentPath = this.getParentPath(path);
    const parent = (parentPath.length ? this.getItem(parentPath) : this.layout) as LayoutGroup;
    const index = path[path.length - 1];

    parent.children[index] = item;
  }

  private removeEmptyGroups(item: LayoutGroup) {
    if (!this.isLayoutGroup(item)) return;

    for (let i = item.children.length - 1; i >= 0; i--) {
      const child = item.children[i];
      if (this.isLayoutGroup(child)) {
        this.removeEmptyGroups(child);
      }
    }

    item.children = item.children.filter((child) => {
      if (!this.isLayoutGroup(child)) return true;

      return child.children.length > 0;
    });
  }

  /**
   * Recursively updates the ids of all items in the layout
   * This is required to ensure that the layout is instantiated with new ids,
   * because the ids are used as keys in the react-flow graph.
   * If we don't do this, react-resizable-panels will reuse the old ids, which will cause it to behave unexpectedly.
   *
   * @param item - The layout item to update
   */
  private regenerateItemIds(item: LayoutGroup) {
    item.children.forEach((child) => {
      child.id = crypto.randomUUID();

      if (this.isLayoutGroup(child)) {
        this.regenerateItemIds(child);
      }
    });
  }

  private hasSameParent(path1: Path, path2: Path) {
    const parentPath1 = this.getParentPath(path1);
    const parentPath2 = this.getParentPath(path2);

    return parentPath1.join("-") === parentPath2.join("-");
  }
}
