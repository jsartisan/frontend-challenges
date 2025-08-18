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

export function kthSmallest(root: TreeNode | null, k: number): number {}
```

```ts index.test.ts
import { TreeNode, kthSmallest } from "./index";

describe("kthSmallest", () => {
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

  test("Example 1: k=1", () => {
    const root = createTree([2, 1, 3]);
    expect(kthSmallest(root, 1)).toBe(1);
  });

  test("Example 2: k=4", () => {
    const root = createTree([4, 3, 5, 2]);
    expect(kthSmallest(root, 4)).toBe(5);
  });

  test("Single node", () => {
    const root = createTree([1]);
    expect(kthSmallest(root, 1)).toBe(1);
  });

  test("Larger tree", () => {
    const root = createTree([6, 3, 8, 1, 4, 7, 9]);
    expect(kthSmallest(root, 3)).toBe(4);
  });

  test("k equals number of nodes", () => {
    const root = createTree([5, 3, 6, 2, 4]);
    expect(kthSmallest(root, 5)).toBe(6);
  });
});
```
