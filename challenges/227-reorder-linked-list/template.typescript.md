```ts index.ts
export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

export function reorderList(head: ListNode | null): void {}
```

```ts index.test.ts
import { ListNode, reorderList } from "./index";

describe("reorderList", () => {
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

  test("Example 1: Even length list", () => {
    const head = createList([2, 4, 6, 8]);
    reorderList(head);
    expect(listToArray(head)).toEqual([2, 8, 4, 6]);
  });

  test("Example 2: Odd length list", () => {
    const head = createList([2, 4, 6, 8, 10]);
    reorderList(head);
    expect(listToArray(head)).toEqual([2, 10, 4, 8, 6]);
  });

  test("Single node", () => {
    const head = createList([1]);
    reorderList(head);
    expect(listToArray(head)).toEqual([1]);
  });

  test("Two nodes", () => {
    const head = createList([1, 2]);
    reorderList(head);
    expect(listToArray(head)).toEqual([1, 2]);
  });

  test("Three nodes", () => {
    const head = createList([1, 2, 3]);
    reorderList(head);
    expect(listToArray(head)).toEqual([1, 3, 2]);
  });

  test("Long list", () => {
    const head = createList([1, 2, 3, 4, 5, 6, 7, 8]);
    reorderList(head);
    expect(listToArray(head)).toEqual([1, 8, 2, 7, 3, 6, 4, 5]);
  });
});
```
