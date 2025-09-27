
```ts index.ts 
/**
 * A store that uses DOM elements as keys.
 * Cannot use ES6 Map, must implement custom solution.
 */
class NodeStore {
  constructor() {
    // TODO: Implement me
  }

  /**
   * Set a value for the given DOM node
   */
  set(node: Node, value: any): void {
    // TODO: Implement me
  }

  /**
   * Get the value for the given DOM node
   */
  get(node: Node): any {
    // TODO: Implement me
  }

  /**
   * Check if the given DOM node exists as a key
   */
  has(node: Node): boolean {
    // TODO: Implement me
  }
}

export { NodeStore };
```

```ts index.test.ts 
import { NodeStore } from './index';

describe('NodeStore (TS)', () => {
  let store: NodeStore;
  let node1: HTMLDivElement, node2: HTMLSpanElement, node3: HTMLParagraphElement;

  beforeEach(() => {
    store = new NodeStore();
    node1 = document.createElement('div');
    node2 = document.createElement('span');
    node3 = document.createElement('p');
  });

  it('sets and gets values for DOM nodes', () => {
    store.set(node1, 'value1');
    store.set(node2, 'value2');

    expect(store.get(node1)).toBe('value1');
    expect(store.get(node2)).toBe('value2');
  });

  it('overwrites existing values', () => {
    store.set(node1, 'original');
    store.set(node1, 'updated');

    expect(store.get(node1)).toBe('updated');
  });

  it('checks if node exists', () => {
    store.set(node1, 'test');

    expect(store.has(node1)).toBe(true);
    expect(store.has(node2)).toBe(false);
  });

  it('returns undefined for non-existent nodes', () => {
    expect(store.get(node1)).toBeUndefined();
  });

  it('handles different data types', () => {
    store.set(node1, 42);
    store.set(node2, { name: 'test' });
    store.set(node3, [1, 2, 3]);

    expect(store.get(node1)).toBe(42);
    expect(store.get(node2)).toEqual({ name: 'test' });
    expect(store.get(node3)).toEqual([1, 2, 3]);
  });

  it('works with multiple nodes', () => {
    store.set(node1, 'a');
    store.set(node2, 'b');
    store.set(node3, 'c');

    expect(store.has(node1)).toBe(true);
    expect(store.has(node2)).toBe(true);
    expect(store.has(node3)).toBe(true);
    expect(store.get(node1)).toBe('a');
    expect(store.get(node2)).toBe('b');
    expect(store.get(node3)).toBe('c');
  });
});
```