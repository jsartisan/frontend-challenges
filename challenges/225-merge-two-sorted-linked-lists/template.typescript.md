```ts index.ts 
export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

export function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  
}
```

```ts index.test.ts 
import { ListNode, mergeTwoLists } from './index';

describe('mergeTwoLists', () => {
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

  test('Example 1: Regular merge', () => {
    const list1 = createList([1, 2, 4]);
    const list2 = createList([1, 3, 5]);
    expect(listToArray(mergeTwoLists(list1, list2))).toEqual([1, 1, 2, 3, 4, 5]);
  });

  test('Example 2: One empty list', () => {
    const list1 = createList([]);
    const list2 = createList([1, 2]);
    expect(listToArray(mergeTwoLists(list1, list2))).toEqual([1, 2]);
  });

  test('Example 3: Both empty lists', () => {
    const list1 = createList([]);
    const list2 = createList([]);
    expect(mergeTwoLists(list1, list2)).toBeNull();
  });

  test('Lists of different lengths', () => {
    const list1 = createList([1, 2, 3, 4]);
    const list2 = createList([2, 5]);
    expect(listToArray(mergeTwoLists(list1, list2))).toEqual([1, 2, 2, 3, 4, 5]);
  });

  test('Negative numbers', () => {
    const list1 = createList([-2, 1, 3]);
    const list2 = createList([-1, 0, 2]);
    expect(listToArray(mergeTwoLists(list1, list2))).toEqual([-2, -1, 0, 1, 2, 3]);
  });

  test('One single-node list', () => {
    const list1 = createList([1]);
    const list2 = createList([]);
    expect(listToArray(mergeTwoLists(list1, list2))).toEqual([1]);
  });
});
```


