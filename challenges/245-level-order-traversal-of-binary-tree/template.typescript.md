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

export function levelOrder(root: TreeNode | null): number[][] {}
```

```ts index.test.ts
import { TreeNode, levelOrder } from "./index";

describe("levelOrder", () => {
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

  test("Example 1: Complete binary tree", () => {
    const root = createTree([1, 2, 3, 4, 5, 6, 7]);
    expect(levelOrder(root)).toEqual([[1], [2, 3], [4, 5, 6, 7]]);
  });

  test("Example 2: Single node", () => {
    const root = createTree([1]);
    expect(levelOrder(root)).toEqual([[1]]);
  });

  test("Example 3: Empty tree", () => {
    expect(levelOrder(null)).toEqual([]);
  });

  test("Example 4: Unbalanced tree", () => {
    const root = createTree([1, 2, 3, null, 4, null, 5]);
    expect(levelOrder(root)).toEqual([[1], [2, 3], [4, 5]]);
  });

  test("Left-heavy tree", () => {
    const root = createTree([1, 2, null, 3, 4]);
    expect(levelOrder(root)).toEqual([[1], [2], [3, 4]]);
  });

  test("Right-heavy tree", () => {
    const root = createTree([1, null, 2, null, 3, null, 4]);
    expect(levelOrder(root)).toEqual([[1], [2], [3], [4]]);
  });

  test("Tree with negative values", () => {
    const root = createTree([-1, -2, -3, -4, -5]);
    expect(levelOrder(root)).toEqual([[-1], [-2, -3], [-4, -5]]);
  });
});
```
