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

export function maxPathSum(root: TreeNode | null): number {
  
}
```

```ts index.test.ts 
import { TreeNode, maxPathSum } from './index';

describe('maxPathSum', () => {
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

  test('Example 1: Simple tree', () => {
    const root = createTree([1, 2, 3]);
    expect(maxPathSum(root)).toBe(6);
  });

  test('Example 2: Tree with negative values', () => {
    const root = createTree([-15, 10, 20, null, null, 15, 5, -5]);
    expect(maxPathSum(root)).toBe(40);
  });

  test('Single node', () => {
    const root = createTree([5]);
    expect(maxPathSum(root)).toBe(5);
  });

  test('All negative values', () => {
    const root = createTree([-1, -2, -3]);
    expect(maxPathSum(root)).toBe(-1);
  });

  test('Path through root', () => {
    const root = createTree([5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1]);
    expect(maxPathSum(root)).toBe(48);
  });

  test('Path not through root', () => {
    const root = createTree([1, -2, 3, 4, 5, -6, 2]);
    expect(maxPathSum(root)).toBe(13);
  });
});
```


