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

export function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {
  
}
```

```ts index.test.ts 
import { TreeNode, isSubtree } from './index';

describe('isSubtree', () => {
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

  test('Example 1: Valid subtree', () => {
    const root = createTree([1, 2, 3, 4, 5]);
    const subRoot = createTree([2, 4, 5]);
    expect(isSubtree(root, subRoot)).toBe(true);
  });

  test('Example 2: Invalid subtree', () => {
    const root = createTree([1, 2, 3, 4, 5, null, null, 6]);
    const subRoot = createTree([2, 4, 5]);
    expect(isSubtree(root, subRoot)).toBe(false);
  });

  test('Empty subtree', () => {
    const root = createTree([1, 2, 3]);
    expect(isSubtree(root, null)).toBe(true);
  });

  test('Empty main tree', () => {
    const subRoot = createTree([1, 2, 3]);
    expect(isSubtree(null, subRoot)).toBe(false);
  });

  test('Same trees', () => {
    const root = createTree([1, 2, 3]);
    const subRoot = createTree([1, 2, 3]);
    expect(isSubtree(root, subRoot)).toBe(true);
  });

  test('Subtree at different position', () => {
    const root = createTree([3, 4, 5, 1, 2]);
    const subRoot = createTree([4, 1, 2]);
    expect(isSubtree(root, subRoot)).toBe(true);
  });

  test('Similar but not identical structure', () => {
    const root = createTree([3, 4, 5, 1, 2, null, null]);
    const subRoot = createTree([4, 1, null, null, 2]);
    expect(isSubtree(root, subRoot)).toBe(false);
  });
});
```


