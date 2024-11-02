```ts index.ts 
export class WordDictionary {
  constructor() {
    
  }

  addWord(word: string): void {
    
  }

  search(word: string): boolean {
    
  }
}
```

```ts index.test.ts 
import { WordDictionary } from './index';

describe('WordDictionary', () => {
  test('Example 1: Basic operations', () => {
    const dict = new WordDictionary();
    dict.addWord("day");
    dict.addWord("bay");
    dict.addWord("may");
    expect(dict.search("say")).toBe(false);
    expect(dict.search("day")).toBe(true);
    expect(dict.search(".ay")).toBe(true);
    expect(dict.search("b..")).toBe(true);
  });

  test('Empty string', () => {
    const dict = new WordDictionary();
    dict.addWord("");
    expect(dict.search("")).toBe(true);
    expect(dict.search(".")).toBe(false);
  });

  test('Single character words', () => {
    const dict = new WordDictionary();
    dict.addWord("a");
    dict.addWord("b");
    expect(dict.search("a")).toBe(true);
    expect(dict.search(".")).toBe(true);
    expect(dict.search("c")).toBe(false);
  });

  test('Multiple dots', () => {
    const dict = new WordDictionary();
    dict.addWord("cat");
    expect(dict.search("...")).toBe(true);
    expect(dict.search("c..")).toBe(true);
    expect(dict.search(".a.")).toBe(true);
    expect(dict.search("..t")).toBe(true);
    expect(dict.search("....")).toBe(false);
  });

  test('Words of different lengths', () => {
    const dict = new WordDictionary();
    dict.addWord("cat");
    dict.addWord("cats");
    expect(dict.search("cat")).toBe(true);
    expect(dict.search("cats")).toBe(true);
    expect(dict.search("ca.")).toBe(true);
    expect(dict.search("ca..")).toBe(true);
    expect(dict.search("c...")).toBe(true);
    expect(dict.search("....")).toBe(true);
    expect(dict.search(".....")).toBe(false);
  });

  test('No matches', () => {
    const dict = new WordDictionary();
    dict.addWord("dog");
    expect(dict.search("cat")).toBe(false);
    expect(dict.search("do")).toBe(false);
    expect(dict.search("dogs")).toBe(false);
    expect(dict.search("..gs")).toBe(false);
  });

  test('Multiple matches with dots', () => {
    const dict = new WordDictionary();
    dict.addWord("cat");
    dict.addWord("car");
    dict.addWord("bat");
    expect(dict.search(".at")).toBe(true);
    expect(dict.search("ca.")).toBe(true);
    expect(dict.search("b..")).toBe(true);
    expect(dict.search("...")).toBe(true);
  });
});
```


