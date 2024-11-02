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

export function invertTree(root: TreeNode | null): TreeNode | null {
  
}
```

```ts index.test.ts 
import { TreeNode, invertTree } from './index';

describe('invertTree', () => {
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

  // Helper function to convert tree to array
  function treeToArray(root: TreeNode | null): (number | null)[] {
    if (!root) return [];
    
    const result: (number | null)[] = [];
    const queue = [root];
    
    while (queue.length) {
      const node = queue.shift()!;
      result.push(node.val);
      
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    
    return result;
  }

  test('Example 1: Complete binary tree', () => {
    const root = createTree([1, 2, 3, 4, 5, 6, 7]);
    expect(treeToArray(invertTree(root))).toEqual([1, 3, 2, 7, 6, 5, 4]);
  });

  test('Example 2: Small tree', () => {
    const root = createTree([3, 2, 1]);
    expect(treeToArray(invertTree(root))).toEqual([3, 1, 2]);
  });

  test('Example 3: Empty tree', () => {
    expect(invertTree(null)).toBeNull();
  });

  test('Single node tree', () => {
    const root = createTree([1]);
    expect(treeToArray(invertTree(root))).toEqual([1]);
  });

  test('Unbalanced tree', () => {
    const root = createTree([1, 2, null, 3]);
    expect(treeToArray(invertTree(root))).toEqual([1, null, 2, null, 3].filter(x => x !== null));
  });

  test('Tree with negative values', () => {
    const root = createTree([-1, -2, -3]);
    expect(treeToArray(invertTree(root))).toEqual([-1, -3, -2]);
  });
});
```


