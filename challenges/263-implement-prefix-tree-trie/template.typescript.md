```ts index.ts
export class PrefixTree {
  constructor() {}

  insert(word: string): void {}

  search(word: string): boolean {}

  startsWith(prefix: string): boolean {}
}
```

```ts index.test.ts
import { PrefixTree } from "./index";

describe("PrefixTree", () => {
  test("Example 1: Basic operations", () => {
    const trie = new PrefixTree();
    trie.insert("dog");
    expect(trie.search("dog")).toBe(true);
    expect(trie.search("do")).toBe(false);
    expect(trie.startsWith("do")).toBe(true);
    trie.insert("do");
    expect(trie.search("do")).toBe(true);
  });

  test("Empty string", () => {
    const trie = new PrefixTree();
    trie.insert("");
    expect(trie.search("")).toBe(true);
    expect(trie.startsWith("")).toBe(true);
  });

  test("Nested prefixes", () => {
    const trie = new PrefixTree();
    trie.insert("app");
    trie.insert("apple");
    trie.insert("apples");
    expect(trie.search("app")).toBe(true);
    expect(trie.search("appl")).toBe(false);
    expect(trie.search("apple")).toBe(true);
    expect(trie.search("apples")).toBe(true);
    expect(trie.startsWith("app")).toBe(true);
    expect(trie.startsWith("appl")).toBe(true);
  });

  test("Case sensitivity", () => {
    const trie = new PrefixTree();
    trie.insert("hello");
    expect(trie.search("Hello")).toBe(false);
    expect(trie.startsWith("HELL")).toBe(false);
  });

  test("Non-existent words", () => {
    const trie = new PrefixTree();
    trie.insert("cat");
    expect(trie.search("cats")).toBe(false);
    expect(trie.search("ca")).toBe(false);
    expect(trie.startsWith("dog")).toBe(false);
  });

  test("Multiple words with same prefix", () => {
    const trie = new PrefixTree();
    trie.insert("car");
    trie.insert("cat");
    trie.insert("catch");
    expect(trie.startsWith("ca")).toBe(true);
    expect(trie.search("car")).toBe(true);
    expect(trie.search("cat")).toBe(true);
    expect(trie.search("catch")).toBe(true);
    expect(trie.search("cats")).toBe(false);
  });
});
```
