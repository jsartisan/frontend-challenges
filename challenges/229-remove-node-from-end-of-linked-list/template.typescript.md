```ts index.ts 
export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

export function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  
}
```

```ts index.test.ts 
import { ListNode, removeNthFromEnd } from './index';

describe('removeNthFromEnd', () => {
  // Helper function to create linked list from array
  function createList(arr: number[]): ListNode | null {
    if (!arr.length) return null;
    const head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
      current.next = new ListNode(arr[i]);
      current = current.next;
    }
    return head;
  }

  // Helper function to convert linked list to array
  function listToArray(head: ListNode | null): number[] {
    const result = [];
    let current = head;
    while (current) {
      result.push(current.val);
      current = current.next;
    }
    return result;
  }

  test('Example 1: Remove from middle', () => {
    const head = createList([1, 2, 3, 4]);
    expect(listToArray(removeNthFromEnd(head, 2))).toEqual([1, 2, 4]);
  });

  test('Example 2: Remove single node', () => {
    const head = createList([5]);
    expect(removeNthFromEnd(head, 1)).toBeNull();
  });

  test('Example 3: Remove first node', () => {
    const head = createList([1, 2]);
    expect(listToArray(removeNthFromEnd(head, 2))).toEqual([2]);
  });

  test('Remove last node', () => {
    const head = createList([1, 2, 3]);
    expect(listToArray(removeNthFromEnd(head, 1))).toEqual([1, 2]);
  });

  test('Long list', () => {
    const head = createList([1, 2, 3, 4, 5, 6]);
    expect(listToArray(removeNthFromEnd(head, 3))).toEqual([1, 2, 3, 5, 6]);
  });

  test('Remove second to last', () => {
    const head = createList([1, 2, 3, 4]);
    expect(listToArray(removeNthFromEnd(head, 2))).toEqual([1, 2, 4]);
  });
});
```


