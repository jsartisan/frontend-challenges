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

export function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  
}
```

```ts index.test.ts 
import { TreeNode, isSameTree } from './index';

describe('isSameTree', () => {
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

  test('Example 1: Same trees', () => {
    const p = createTree([1, 2, 3]);
    const q = createTree([1, 2, 3]);
    expect(isSameTree(p, q)).toBe(true);
  });

  test('Example 2: Different structure', () => {
    const p = createTree([4, 7]);
    const q = createTree([4, null, 7]);
    expect(isSameTree(p, q)).toBe(false);
  });

  test('Example 3: Different values', () => {
    const p = createTree([1, 2, 3]);
    const q = createTree([1, 3, 2]);
    expect(isSameTree(p, q)).toBe(false);
  });

  test('Both empty trees', () => {
    expect(isSameTree(null, null)).toBe(true);
  });

  test('One empty tree', () => {
    const p = createTree([1]);
    expect(isSameTree(p, null)).toBe(false);
  });

  test('Different depths', () => {
    const p = createTree([1, 2]);
    const q = createTree([1, 2, 3]);
    expect(isSameTree(p, q)).toBe(false);
  });

  test('Negative values', () => {
    const p = createTree([-1, -2, -3]);
    const q = createTree([-1, -2, -3]);
    expect(isSameTree(p, q)).toBe(true);
  });
});
```


