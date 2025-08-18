```ts index.ts
export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

export function maxDepth(root: TreeNode | null): number {}
```

```ts index.test.ts
import { TreeNode, maxDepth } from "./index";

describe("maxDepth", () => {
  // Helper function to create tree from array
  function createTree(arr: (number | null)[]): TreeNode | null {
    if (!arr.length) return null;

    const root = new TreeNode(arr[0]!);
    const queue = [root];
    let i = 1;

    while (queue.length && i < arr.length) {
      const node = queue.shift()!;

      if (i < arr.length && arr[i] !== null) {
        node.left = new TreeNode(arr[i]!);
        queue.push(node.left);
      }
      i++;

      if (i < arr.length && arr[i] !== null) {
        node.right = new TreeNode(arr[i]!);
        queue.push(node.right);
      }
      i++;
    }

    return root;
  }

  test("Example 1: Unbalanced tree", () => {
    const root = createTree([1, 2, 3, null, null, 4]);
    expect(maxDepth(root)).toBe(3);
  });

  test("Example 2: Empty tree", () => {
    expect(maxDepth(null)).toBe(0);
  });

  test("Example 3: Complete binary tree", () => {
    const root = createTree([1, 2, 3, 4, 5, 6, 7]);
    expect(maxDepth(root)).toBe(3);
  });

  test("Single node tree", () => {
    const root = createTree([1]);
    expect(maxDepth(root)).toBe(1);
  });

  test("Left-heavy tree", () => {
    const root = createTree([1, 2, null, 3, null, 4]);
    expect(maxDepth(root)).toBe(4);
  });

  test("Right-heavy tree", () => {
    const root = createTree([1, null, 2, null, 3, null, 4]);
    expect(maxDepth(root)).toBe(4);
  });

  test("Tree with negative values", () => {
    const root = createTree([-1, -2, -3, -4]);
    expect(maxDepth(root)).toBe(3);
  });
});
```
