```ts index.ts
export function findWords(board: string[][], words: string[]): string[] {}
```

```ts index.test.ts
import { findWords } from "./index";

describe("findWords", () => {
  test("Example 1: Multiple words exist", () => {
    const board = [
      ["a", "b", "c", "d"],
      ["s", "a", "a", "t"],
      ["a", "c", "k", "e"],
      ["a", "c", "d", "n"],
    ];
    const words = ["bat", "cat", "back", "backend", "stack"];
    expect(findWords(board, words).sort()).toEqual(["back", "backend", "cat"].sort());
  });

  test("Example 2: No words exist", () => {
    const board = [
      ["x", "o"],
      ["x", "o"],
    ];
    const words = ["xoxo"];
    expect(findWords(board, words)).toEqual([]);
  });

  test("Single letter board", () => {
    const board = [["a"]];
    const words = ["a", "b", "ab"];
    expect(findWords(board, words)).toEqual(["a"]);
  });

  test("Empty words array", () => {
    const board = [
      ["a", "b"],
      ["c", "d"],
    ];
    const words: string[] = [];
    expect(findWords(board, words)).toEqual([]);
  });

  test("Words with repeated letters", () => {
    const board = [
      ["a", "a", "a"],
      ["a", "a", "a"],
      ["a", "a", "a"],
    ];
    const words = ["aaa", "aaaa", "a"];
    expect(findWords(board, words).sort()).toEqual(["a", "aaa"].sort());
  });

  test("Complex paths", () => {
    const board = [
      ["o", "a", "a", "n"],
      ["e", "t", "a", "e"],
      ["i", "h", "k", "r"],
      ["i", "f", "l", "v"],
    ];
    const words = ["oath", "pea", "eat", "rain", "oaths"];
    expect(findWords(board, words).sort()).toEqual(["eat", "oath", "rain"].sort());
  });

  test("No matching words", () => {
    const board = [
      ["a", "b"],
      ["c", "d"],
    ];
    const words = ["xyz", "efg"];
    expect(findWords(board, words)).toEqual([]);
  });

  test("Words sharing prefixes", () => {
    const board = [
      ["a", "b", "c"],
      ["d", "e", "f"],
      ["g", "h", "i"],
    ];
    const words = ["abc", "abcd", "ab", "def"];
    expect(findWords(board, words).sort()).toEqual(["abc"].sort());
  });
});
```
