import { LayoutGroup, LayoutItem, LayoutPanel, LayoutTab } from "./types";

type Path = number[];

type DropSource = {
  path: Path;
  type: "tab" | "panel";
};

type DropTarget = {
  path: Path;
  type: "tab" | "panel";
};

type DropZone = "top" | "right" | "bottom" | "left";

export class LayoutManager {
  public layout: LayoutGroup;

  constructor(initialLayout: LayoutGroup) {
    this.layout = initialLayout;
  }

  public updateLayout(source: DropSource, target: DropTarget, dropZone: DropZone) {
    if (!source || !target) return;

    switch (dropZone) {
      case "left":
      case "right":
        this.handleHorizontalDrop(source, target, dropZone);
        break;
      case "top":
      case "bottom":
        this.handleVerticalDrop(source, target, dropZone);
        break;
    }

    this.layout = JSON.parse(JSON.stringify(this.layout));

    return this.layout;
  }

  private handleHorizontalDrop(source: DropSource, target: DropTarget, dropZone: DropZone) {
    const targetParent = this.getParent(target.path);

    if (target.type === "panel" && targetParent.direction === "vertical") {
      this.convertToHorizontalGroup(source, target, dropZone);

      return;
    }

    this.moveItemToPath(source, target, dropZone);
  }

  private handleVerticalDrop(source: DropSource, target: DropTarget, dropZone: DropZone) {
    const targetParent = this.getParent(target.path);

    if (targetParent.direction === "horizontal") {
      this.convertToVerticalGroup(source, target, dropZone);

      return;
    }

    this.moveItemToPath(source, target, dropZone);
  }

  private convertToHorizontalGroup(source: DropSource, target: DropTarget, dropZone: DropZone) {
    const sourceItem = this.getItem(source.path);
    const targetItem = this.getItem(target.path);

    const newGroup: LayoutGroup = {
      // keep the id of the target item, so that resize handles are not lost,
      // otherwise, if we generate a new id, the resize handles does not work
      id: targetItem.id,
      direction: "horizontal",
      children: [{ ...targetItem, id: crypto.randomUUID() }],
    };

    if (source.type === "tab") {
      newGroup.children.splice(dropZone === "left" ? 0 : 1, 0, {
        children: [sourceItem],
        id: crypto.randomUUID(),
      } as LayoutPanel);
    } else {
      newGroup.children.splice(dropZone === "left" ? 0 : 1, 0, {
        ...sourceItem,
        id: crypto.randomUUID(),
      });
    }

    this.replaceItemAtPath(target.path, newGroup);

    // since we are adding a group above, we need to adjust the source path
    // since added a group above, we need to adjust the target path
    if (source.type === "tab") {
      if (source.path.slice(0, -1).join("-") === target.path.join("-")) {
        if (dropZone === "left") {
          this.removeItemAtPath([...source.path.slice(0, -1), 1, source.path[source.path.length - 1]]);
        } else {
          this.removeItemAtPath([...source.path.slice(0, -1), 0, source.path[source.path.length - 1]]);
        }
      }

      // check if after removal of source tab, the source panel if has 0 children, remove the panel too
      const sourcePanel = this.getItem(source.path.slice(0, -1));
      if (sourcePanel.children.length === 0) {
        this.removeItemAtPath(source.path.slice(0, -1));
      }
    } else {
      this.removeItemAtPath(source.path);
    }
  }

  private convertToVerticalGroup(source: DropSource, target: DropTarget, dropZone: DropZone) {
    const sourceItem = this.getItem(source.path);
    const targetItem = this.getItem(target.path);

    const newGroup: LayoutGroup = {
      id: targetItem.id,
      direction: "vertical",
      children: [{ ...targetItem, id: crypto.randomUUID() }],
    };

    newGroup.children.splice(dropZone === "top" ? 0 : 1, 0, {
      ...sourceItem,
      id: crypto.randomUUID(),
    });

    this.replaceItemAtPath(target.path, newGroup);
    this.removeItemAtPath(source.path);
  }

  /**
   * Checks if a given layout item is a group that can contain other items.
   * This is a key abstraction that separates the two fundamental types in our layout system:
   * groups (which can contain other items) and leaf items (which contain actual content).
   *
   * @param item - The layout item to check
   * @returns True if the item is a group that can contain children, false otherwise
   */
  public isLayoutGroup(item: LayoutItem): item is LayoutGroup {
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
    const layout = this.layout;

    return path.reduce((acc, index) => acc.children[index], layout) as LayoutItem;
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
    const direction = (group.children[0] as LayoutGroup).direction;

    delete group.direction;

    group.children = (group.children[0] as LayoutGroup).children;

    if (direction) {
      group.direction = direction;
    }
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

  /**
   * when we move an tab from a tab list, it can be dropped in a panel or another tab list
   * If we are moving it to a panel, we need to crate a panel with the item as children in the parent of source
   * Note: index at last position is the index of the item in the tab,
   */
  private moveItemToPath(source: DropSource, target: DropTarget, dropZone: DropZone) {
    if (source.type === "tab") {
      this.moveTabItemToPath(source, target, dropZone);

      return;
    }

    const sourceItem = this.getItem(source.path);
    const adjustedTargetPath = this.adjustTargetPathBeforeInsertion(target.path, source.path);

    this.removeItemAtPath(source.path);
    this.flattenGroupAtPathIfNecessary(source.path);
    this.insertItemAtPath(adjustedTargetPath, sourceItem, dropZone);
  }

  private moveTabItemToPath(source: DropSource, target: DropTarget, dropZone: DropZone) {
    const tab = this.getItem(source.path) as LayoutTab;
    const tabIndex = source.path[source.path.length - 1];
    // the last index of sourcePath is the index of the item in the tab list
    // rest is the actual source path
    source.path = source.path.slice(0, -1);

    if (target.type === "panel") {
      this.removeTabItemAtIndex(source.path, tabIndex);
      this.createPanelWithItemAtIndex(target.path, tab, dropZone);

      return;
    }

    this.removeTabItemAtIndex(source.path, tabIndex);

    // if source and target parent are same, we will need to adjust the target as we are removing tab first
    let targetIndex = target.path[target.path.length - 1];
    if (this.hasSameParent(source.path, target.path.slice(0, -1)) && tabIndex < targetIndex) {
      targetIndex--;
    }

    this.addTabItemAtIndex(target, tab, targetIndex, dropZone);
  }

  private addTabItemAtIndex(target: DropTarget, tab: LayoutTab, tabIndex, dropZone: DropZone) {
    const targetParent = this.getParent(target.path) as LayoutItem;

    targetParent.children.splice(dropZone === "left" ? tabIndex : tabIndex + 1, 0, tab);
  }

  private createPanelWithItemAtIndex(targetPath: Path, tab: LayoutTab, dropZone: DropZone) {
    const panel: LayoutItem = {
      id: crypto.randomUUID(),
      children: [tab],
    };

    this.insertItemAtPath(targetPath, panel, dropZone);
  }

  private removeTabItemAtIndex(path: Path, index: number) {
    const panel = this.getItem(path);

    panel.children.splice(index, 1);

    if (panel.children.length === 0) {
      this.removeItemAtPath(path);
    }
  }

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
      if (sourcePath[0] === 0) {
        // in case we are moving the root item, we need to adjust the target path to be the same as the source path
        return sourcePath;
      }

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
