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

export class Codec {
  serialize(root: TreeNode | null): string {}

  deserialize(data: string): TreeNode | null {}
}
```

```ts index.test.ts
import { TreeNode, Codec } from "./index";

describe("Codec", () => {
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

    while (result[result.length - 1] === null) {
      result.pop();
    }

    return result;
  }

  test("Example 1: Normal tree", () => {
    const codec = new Codec();
    const root = createTree([1, 2, 3, null, null, 4, 5]);
    const serialized = codec.serialize(root);
    const deserialized = codec.deserialize(serialized);
    expect(treeToArray(deserialized)).toEqual([1, 2, 3, null, null, 4, 5]);
  });

  test("Example 2: Empty tree", () => {
    const codec = new Codec();
    const root = createTree([]);
    const serialized = codec.serialize(root);
    const deserialized = codec.deserialize(serialized);
    expect(treeToArray(deserialized)).toEqual([]);
  });

  test("Single node", () => {
    const codec = new Codec();
    const root = createTree([1]);
    const serialized = codec.serialize(root);
    const deserialized = codec.deserialize(serialized);
    expect(treeToArray(deserialized)).toEqual([1]);
  });

  test("Complete binary tree", () => {
    const codec = new Codec();
    const root = createTree([1, 2, 3, 4, 5, 6, 7]);
    const serialized = codec.serialize(root);
    const deserialized = codec.deserialize(serialized);
    expect(treeToArray(deserialized)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  test("Tree with negative values", () => {
    const codec = new Codec();
    const root = createTree([-1, -2, -3, null, -4]);
    const serialized = codec.serialize(root);
    const deserialized = codec.deserialize(serialized);
    expect(treeToArray(deserialized)).toEqual([-1, -2, -3, null, -4]);
  });
});
```
