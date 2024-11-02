```ts index.ts 
export function exist(board: string[][], word: string): boolean {
  
}
```

```ts index.test.ts 
import { exist } from './index';

describe('exist', () => {
  test('Example 1: Word exists', () => {
    const board = [
      ["A","B","C","D"],
      ["S","A","A","T"],
      ["A","C","A","E"]
    ];
    expect(exist(board, "CAT")).toBe(true);
  });

  test('Example 2: Word does not exist', () => {
    const board = [
      ["A","B","C","D"],
      ["S","A","A","T"],
      ["A","C","A","E"]
    ];
    expect(exist(board, "BAT")).toBe(false);
  });

  test('Single letter board and word', () => {
    const board = [["A"]];
    expect(exist(board, "A")).toBe(true);
    expect(exist(board, "B")).toBe(false);
  });

  test('Word longer than board cells', () => {
    const board = [
      ["A","B"],
      ["C","D"]
    ];
    expect(exist(board, "ABCDE")).toBe(false);
  });

  test('Word with repeated letters', () => {
    const board = [
      ["A","A","A"],
      ["A","A","A"],
      ["A","A","A"]
    ];
    expect(exist(board, "AAA")).toBe(true);
  });

  test('Complex path', () => {
    const board = [
      ["A","B","C","E"],
      ["S","F","C","S"],
      ["A","D","E","E"]
    ];
    expect(exist(board, "ABCCED")).toBe(true);
  });

  test('Case sensitivity', () => {
    const board = [
      ["a","B"],
      ["C","d"]
    ];
    expect(exist(board, "aBCd")).toBe(true);
    expect(exist(board, "ABCD")).toBe(false);
  });

  test('Empty word', () => {
    const board = [
      ["A","B"],
      ["C","D"]
    ];
    expect(exist(board, "")).toBe(false);
  });
});
```


