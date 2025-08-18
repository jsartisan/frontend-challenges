```ts index.ts
export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

export function hasCycle(head: ListNode | null): boolean {}
```

```ts index.test.ts
import { ListNode, hasCycle } from "./index";

describe("hasCycle", () => {
  // Helper function to create linked list with cycle
  function createCycleList(arr: number[], pos: number): ListNode | null {
    if (!arr.length) return null;

    const head = new ListNode(arr[0]);
    let current = head;
    const nodes: ListNode[] = [head];

    // Create list
    for (let i = 1; i < arr.length; i++) {
      current.next = new ListNode(arr[i]);
      current = current.next;
      nodes.push(current);
    }

    // Create cycle if pos is valid
    if (pos >= 0 && pos < arr.length) {
      current.next = nodes[pos];
    }

    return head;
  }

  test("Example 1: List with cycle", () => {
    const head = createCycleList([1, 2, 3, 4], 1);
    expect(hasCycle(head)).toBe(true);
  });

  test("Example 2: List without cycle", () => {
    const head = createCycleList([1, 2], -1);
    expect(hasCycle(head)).toBe(false);
  });

  test("Single node without cycle", () => {
    const head = createCycleList([1], -1);
    expect(hasCycle(head)).toBe(false);
  });

  test("Single node with self-cycle", () => {
    const head = createCycleList([1], 0);
    expect(hasCycle(head)).toBe(true);
  });

  test("Long list with cycle at end", () => {
    const head = createCycleList([1, 2, 3, 4, 5, 6], 5);
    expect(hasCycle(head)).toBe(true);
  });

  test("Long list without cycle", () => {
    const head = createCycleList([1, 2, 3, 4, 5, 6], -1);
    expect(hasCycle(head)).toBe(false);
  });
});
```
