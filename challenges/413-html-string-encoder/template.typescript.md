```ts index.ts 
/**
 * Encode string with HTML tags based on style ranges.
 * @param str - the input string
 * @param styleArr - array of [start, end, tag]
 */
export function encodeHTML(str: string, styleArr: [number, number, string][]): string {
  // TODO: Implement
  return '';
}
```

```ts index.test.ts 
import { encodeHTML } from './index';

describe('encodeHTML', () => {
  it('should wrap simple non-overlapping styles', () => {
    const str = 'abc';
    const styles: [number, number, string][] = [[0, 1, 'b'], [1, 3, 'i']];
    expect(encodeHTML(str, styles)).toBe('<b>a</b><i>bc</i>');
  });

  it('should handle overlapping styles', () => {
    const str = 'Hello, world';
    const styles: [number, number, string][] = [[0, 2, 'i'], [4, 9, 'b'], [7, 10, 'u']];
    expect(encodeHTML(str, styles)).toBe('<i>Hel</i>l<b>o, w<u>orl</u></b><u>d</u>');
  });

  it('should return string unchanged when no styles applied', () => {
    expect(encodeHTML('test', [])).toBe('test');
  });

  it('should support fully nested styles', () => {
    const str = 'abcd';
    const styles: [number, number, string][] = [[0, 4, 'b'], [1, 3, 'i']];
    expect(encodeHTML(str, styles)).toBe('<b>a<i>bc</i>d</b>');
  });

  it('should support multiple adjacent ranges', () => {
    const str = 'abcdef';
    const styles: [number, number, string][] = [[0, 2, 'b'], [2, 4, 'i'], [4, 6, 'u']];
    expect(encodeHTML(str, styles)).toBe('<b>ab</b><i>cd</i><u>ef</u>');
  });
});
```


