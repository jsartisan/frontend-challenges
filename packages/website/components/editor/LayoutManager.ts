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

    return this.layout;
  }

  private handleHorizontalDrop(sourcePath: Path, targetPath: Path, dropZone: DropZone) {
    const targetParent = this.getParent(targetPath);

    if (targetParent.direction === "vertical") {
      this.convertToHorizontalGroup(sourcePath, targetPath, dropZone);

      return;
    }

    this.moveItemToPath(targetPath, sourcePath, dropZone);
  }

  private handleVerticalDrop(sourcePath: Path, targetPath: Path, dropZone: DropZone) {
    const targetParent = this.getParent(targetPath);

    if (targetParent.direction === "horizontal") {
      this.convertToVerticalGroup(sourcePath, targetPath, dropZone);

      return;
    }

    this.moveItemToPath(targetPath, sourcePath, dropZone);
  }

  private convertToHorizontalGroup(sourcePath: Path, targetPath: Path, dropZone: DropZone) {
    const source = this.getItem(sourcePath);
    const target = this.getItem(targetPath);

    const newGroup: LayoutGroup = {
      id: crypto.randomUUID(),
      direction: "horizontal",
      children: [{ ...target, id: crypto.randomUUID() }],
    };

    newGroup.children.splice(dropZone === "left" ? 0 : 1, 0, {
      ...source,
      id: crypto.randomUUID(),
    });

    this.replaceItemAtPath(targetPath, newGroup);
    this.removeItemAtPath(sourcePath);
    this.flattenGroupAtPathIfNecessary(sourcePath);
  }

  private convertToVerticalGroup(sourcePath: Path, targetPath: Path, dropZone: DropZone) {
    const source = this.getItem(sourcePath);
    const target = this.getItem(targetPath);

    const newGroup: LayoutGroup = {
      id: target.id,
      direction: "vertical",
      children: [{ ...target, id: crypto.randomUUID() }],
    };

    newGroup.children.splice(dropZone === "top" ? 0 : 1, 0, {
      ...source,
      id: crypto.randomUUID(),
    });

    this.replaceItemAtPath(targetPath, newGroup);
    this.removeItemAtPath(sourcePath);
    this.flattenGroupAtPathIfNecessary(sourcePath);
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

  private convertGroupToItem(group: LayoutGroup) {
    delete group.direction;
    group.children = (group.children[0] as LayoutGroup).children;
    group.direction = (group.children[0] as LayoutGroup).direction;
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

    targetParent.children.splice(
      dropZone === "left" || dropZone === "top" ? targetIndex : targetIndex + 1,
      0,
      sourceItem,
    );
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

  private hasSameParent(path1: Path, path2: Path) {
    const parentPath1 = this.getParentPath(path1);
    const parentPath2 = this.getParentPath(path2);

    return parentPath1.join("-") === parentPath2.join("-");
  }

  private moveItemToPath(targetPath: Path, sourcePath: Path, dropZone: DropZone) {
    const sourceItem = this.getItem(sourcePath);
    const adjustedTargetPath = this.adjustTargetPathBeforeInsertion(targetPath, sourcePath);

    this.removeItemAtPath(sourcePath);
    this.insertItemAtPath(adjustedTargetPath, sourceItem, dropZone);
    this.flattenGroupAtPathIfNecessary(sourcePath);
  }

  /**
   * If after removing the source item, the parent has only one child, we need
   * to convert the parent group to an item
   */
  private flattenGroupAtPathIfNecessary(path: Path) {
    const parent = this.getParent(path);

    if (parent.children.length === 1) {
      this.convertGroupToItem(parent);
    }
  }

  private adjustTargetPathBeforeInsertion(targetPath: Path, sourcePath: Path): Path {
    // if we are moving an item to the same parent, we need to adjust the target path
    if (this.hasSameParent(sourcePath, targetPath)) {
      const sourceIndex = sourcePath[sourcePath.length - 1];
      const targetIndex = targetPath[targetPath.length - 1];

      if (sourceIndex < targetIndex) {
        return [...targetPath.slice(0, -1), targetIndex - 1];
      }
    }

    // if source item is the only child of its parent, we need to adjust the target path
    if (sourcePath.length === 1) {
      const commonAncestorLength = this.findCommonAncestorLength(sourcePath, targetPath);
      if (commonAncestorLength < sourcePath.length) {
        const adjustedPath = [...targetPath];
        for (let i = commonAncestorLength; i < adjustedPath.length; i++) {
          if (sourcePath[i] < adjustedPath[i]) {
            adjustedPath[i]--;
          }
        }
        return adjustedPath;
      }
    }

    return targetPath;
  }

  private findCommonAncestorLength(path1: Path, path2: Path): number {
    let i = 0;
    while (i < path1.length && i < path2.length && path1[i] === path2[i]) {
      i++;
    }
    return i;
  }

  public getMinimumWidthForItem(item: LayoutItem | LayoutGroup, parent: LayoutGroup) {
    // if parent is horizontal, we need to check how many maximum number of children it has of in a horizontal group recursively
    if (parent.direction === "horizontal") {
      const maxChildren = this.getMaxChildrenOfADirection(parent);

      console.log("maxChildren", maxChildren);

      return maxChildren * 40;
    }

    return 40;
  }

  private getMaxChildrenOfADirection(parent: LayoutGroup) {
    const direction = parent.direction;

    return parent.children.reduce((max, child) => {
      if (this.isLayoutGroup(child) && child.direction === direction) {
        return Math.max(max, child.children.length);
      }
      return max;
    }, 0);
  }
}
