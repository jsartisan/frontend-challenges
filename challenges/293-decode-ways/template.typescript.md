```ts index.ts 
export function numDecodings(s: string): number {
  
}
```

```ts index.test.ts 
import { numDecodings } from './index';

describe('numDecodings', () => {
  test('Example 1: Two possible decodings', () => {
    expect(numDecodings("12")).toBe(2);
  });

  test('Example 2: Invalid leading zero', () => {
    expect(numDecodings("01")).toBe(0);
  });

  test('Single digit', () => {
    expect(numDecodings("5")).toBe(1);
  });

  test('Zero digit', () => {
    expect(numDecodings("0")).toBe(0);
  });

  test('Multiple valid ways', () => {
    expect(numDecodings("226")).toBe(3);
  });

  test('Invalid middle zero', () => {
    expect(numDecodings("106")).toBe(1);
  });

  test('Multiple zeros', () => {
    expect(numDecodings("1001")).toBe(0);
  });

  test('Valid with zero', () => {
    expect(numDecodings("101")).toBe(1);
  });

  test('Large valid number', () => {
    expect(numDecodings("12345")).toBe(3);
  });

  test('Number over 26', () => {
    expect(numDecodings("27")).toBe(1);
  });

  test('Complex sequence', () => {
    expect(numDecodings("2101")).toBe(1);
  });

  test('Long sequence', () => {
    expect(numDecodings("111111")).toBe(13);
  });
});
```


