```ts index.ts
export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

export function reverseList(head: ListNode | null): ListNode | null {}
```

```ts index.test.ts
import { ListNode, reverseList } from "./index";

describe("reverseList", () => {
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

  test("Example 1: Regular list", () => {
    const head = createList([0, 1, 2, 3]);
    expect(listToArray(reverseList(head))).toEqual([3, 2, 1, 0]);
  });

  test("Example 2: Empty list", () => {
    expect(reverseList(null)).toBeNull();
  });

  test("Single node", () => {
    const head = createList([1]);
    expect(listToArray(reverseList(head))).toEqual([1]);
  });

  test("Two nodes", () => {
    const head = createList([1, 2]);
    expect(listToArray(reverseList(head))).toEqual([2, 1]);
  });

  test("List with negative numbers", () => {
    const head = createList([-1, -2, -3]);
    expect(listToArray(reverseList(head))).toEqual([-3, -2, -1]);
  });

  test("Long list", () => {
    const arr = Array.from({ length: 10 }, (_, i) => i);
    const head = createList(arr);
    expect(listToArray(reverseList(head))).toEqual(arr.reverse());
  });
});
```
