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

export function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {}
```

```ts index.test.ts
import { TreeNode, lowestCommonAncestor } from "./index";

describe("lowestCommonAncestor", () => {
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

  // Helper function to find node with given value
  function findNode(root: TreeNode | null, val: number): TreeNode | null {
    if (!root) return null;
    if (root.val === val) return root;
    return findNode(root.left, val) || findNode(root.right, val);
  }

  test("Example 1: Nodes in different subtrees", () => {
    const root = createTree([5, 3, 8, 1, 4, 7, 9, null, 2]);
    const p = findNode(root, 3)!;
    const q = findNode(root, 8)!;
    expect(lowestCommonAncestor(root, p, q)?.val).toBe(5);
  });

  test("Example 2: One node is ancestor of other", () => {
    const root = createTree([5, 3, 8, 1, 4, 7, 9, null, 2]);
    const p = findNode(root, 3)!;
    const q = findNode(root, 4)!;
    expect(lowestCommonAncestor(root, p, q)?.val).toBe(3);
  });

  test("Root is LCA", () => {
    const root = createTree([5, 3, 8]);
    const p = findNode(root, 3)!;
    const q = findNode(root, 8)!;
    expect(lowestCommonAncestor(root, p, q)?.val).toBe(5);
  });

  test("Nodes in same subtree", () => {
    const root = createTree([5, 3, 8, 1, 4]);
    const p = findNode(root, 1)!;
    const q = findNode(root, 4)!;
    expect(lowestCommonAncestor(root, p, q)?.val).toBe(3);
  });

  test("Deep nodes", () => {
    const root = createTree([5, 3, 8, 1, 4, 7, 9, null, 2]);
    const p = findNode(root, 2)!;
    const q = findNode(root, 4)!;
    expect(lowestCommonAncestor(root, p, q)?.val).toBe(3);
  });

  test("Negative values", () => {
    const root = createTree([-5, -10, 0, -15, -8]);
    const p = findNode(root, -15)!;
    const q = findNode(root, -8)!;
    expect(lowestCommonAncestor(root, p, q)?.val).toBe(-10);
  });
});
```
