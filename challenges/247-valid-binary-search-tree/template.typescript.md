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

export function isValidBST(root: TreeNode | null): boolean {
  
}
```

```ts index.test.ts 
import { TreeNode, isValidBST } from './index';

describe('isValidBST', () => {
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

  test('Example 1: Valid BST', () => {
    const root = createTree([2, 1, 3]);
    expect(isValidBST(root)).toBe(true);
  });

  test('Example 2: Invalid BST', () => {
    const root = createTree([1, 2, 3]);
    expect(isValidBST(root)).toBe(false);
  });

  test('Single node', () => {
    const root = createTree([1]);
    expect(isValidBST(root)).toBe(true);
  });

  test('Valid complex BST', () => {
    const root = createTree([5, 3, 7, 1, 4, 6, 8]);
    expect(isValidBST(root)).toBe(true);
  });

  test('Invalid due to right subtree', () => {
    const root = createTree([5, 3, 7, 1, 4, 6, 4]);
    expect(isValidBST(root)).toBe(false);
  });

  test('Invalid due to left subtree', () => {
    const root = createTree([5, 3, 7, 1, 6, 6, 8]);
    expect(isValidBST(root)).toBe(false);
  });
});
```


