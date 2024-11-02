```ts index.ts 
export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

export function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  
}
```

```ts index.test.ts 
import { ListNode, mergeKLists } from './index';

describe('mergeKLists', () => {
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

  test('Example 1: Multiple non-empty lists', () => {
    const lists = [
      createList([1, 2, 4]),
      createList([1, 3, 5]),
      createList([3, 6])
    ];
    expect(listToArray(mergeKLists(lists))).toEqual([1, 1, 2, 3, 3, 4, 5, 6]);
  });

  test('Example 2: Empty array of lists', () => {
    expect(mergeKLists([])).toBeNull();
  });

  test('Example 3: Array with empty list', () => {
    expect(mergeKLists([null])).toBeNull();
  });

  test('Single list', () => {
    const lists = [createList([1, 2, 3])];
    expect(listToArray(mergeKLists(lists))).toEqual([1, 2, 3]);
  });

  test('Lists with different lengths', () => {
    const lists = [
      createList([1]),
      createList([1, 2, 3]),
      createList([2])
    ];
    expect(listToArray(mergeKLists(lists))).toEqual([1, 1, 2, 2, 3]);
  });

  test('Lists with negative numbers', () => {
    const lists = [
      createList([-2, 1, 4]),
      createList([-1, 3, 4]),
      createList([2])
    ];
    expect(listToArray(mergeKLists(lists))).toEqual([-2, -1, 1, 2, 3, 4, 4]);
  });
});
```


