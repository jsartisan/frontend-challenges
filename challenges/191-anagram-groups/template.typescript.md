```ts index.ts
export function groupAnagrams(strs: string[]): string[][] {}
```

```ts index.test.ts
import { groupAnagrams } from "./";

// Helper function to sort the output for comparison
function sortAnagrams(anagrams: string[][]): string[][] {
  return anagrams.map((group) => group.sort()).sort((a, b) => a[0].localeCompare(b[0]));
}

describe("groupAnagrams function", () => {
  test("Example 1", () => {
    const strs = ["act", "pots", "tops", "cat", "stop", "hat"];
    const result = groupAnagrams(strs);
    const expected = [["hat"], ["act", "cat"], ["stop", "pots", "tops"]];
    expect(sortAnagrams(result)).toEqual(sortAnagrams(expected));
  });

  test("Example 2", () => {
    const strs = ["x"];
    const result = groupAnagrams(strs);
    const expected = [["x"]];
    expect(sortAnagrams(result)).toEqual(sortAnagrams(expected));
  });

  test("Example 3", () => {
    const strs = [""];
    const result = groupAnagrams(strs);
    const expected = [[""]];
    expect(sortAnagrams(result)).toEqual(sortAnagrams(expected));
  });

  test("Multiple empty strings", () => {
    const strs = ["", ""];
    const result = groupAnagrams(strs);
    const expected = [["", ""]];
    expect(sortAnagrams(result)).toEqual(sortAnagrams(expected));
  });

  test("Anagrams with mixed lengths", () => {
    const strs = ["bat", "tab", "tac", "cat", "abt"];
    const result = groupAnagrams(strs);
    const expected = [
      ["bat", "tab", "abt"],
      ["tac", "cat"],
    ];
    expect(sortAnagrams(result)).toEqual(sortAnagrams(expected));
  });
});
```
