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

export function buildTree(preorder: number[], inorder: number[]): TreeNode | null {}
```

```ts index.test.ts
import { TreeNode, buildTree } from "./index";

describe("buildTree", () => {
  // Helper function to convert tree to array representation
  function treeToArray(root: TreeNode | null): (number | null)[] {
    if (!root) return [];

    const result: (number | null)[] = [];
    const queue = [root];

    while (queue.length) {
      const node = queue.shift()!;
      result.push(node.val);

      if (node.left) queue.push(node.left);
      else if (node.right) result.push(null);

      if (node.right) queue.push(node.right);
      else if (node.left) result.push(null);
    }

    // Remove trailing nulls
    while (result[result.length - 1] === null) {
      result.pop();
    }

    return result;
  }

  test("Example 1: Multiple nodes", () => {
    const preorder = [1, 2, 3, 4];
    const inorder = [2, 1, 3, 4];
    const result = buildTree(preorder, inorder);
    expect(treeToArray(result)).toEqual([1, 2, 3, null, null, null, 4]);
  });

  test("Example 2: Single node", () => {
    const preorder = [1];
    const inorder = [1];
    const result = buildTree(preorder, inorder);
    expect(treeToArray(result)).toEqual([1]);
  });

  test("Left-heavy tree", () => {
    const preorder = [3, 2, 1];
    const inorder = [1, 2, 3];
    const result = buildTree(preorder, inorder);
    expect(treeToArray(result)).toEqual([3, 2, null, 1]);
  });

  test("Right-heavy tree", () => {
    const preorder = [1, 2, 3];
    const inorder = [1, 2, 3];
    const result = buildTree(preorder, inorder);
    expect(treeToArray(result)).toEqual([1, null, 2, null, 3]);
  });

  test("Complete binary tree", () => {
    const preorder = [1, 2, 4, 5, 3, 6, 7];
    const inorder = [4, 2, 5, 1, 6, 3, 7];
    const result = buildTree(preorder, inorder);
    expect(treeToArray(result)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });
});
```
