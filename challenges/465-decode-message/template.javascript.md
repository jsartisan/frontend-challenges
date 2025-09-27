```js index.js 
/**
 * Decodes hidden message using diagonal zig-zag traversal.
 * @param {string[][]} grid
 * @returns {string}
 */
export function decodeMessage(grid) {
  // TODO: Implement me
  return "";
}
```

```js index.test.js 
import { decodeMessage } from './index';

describe('decodeMessage (JS)', () => {
  it('example case', () => {
    const grid = [
      ['I','B','C','A','L','K','A'],
      ['D','R','F','C','A','E','A'],
      ['G','H','O','E','L','A','D'],
    ];
    expect(decodeMessage(grid)).toBe('IROCLED');
  });

  it('single row', () => {
    const grid = [['A','B','C']];
    expect(decodeMessage(grid)).toBe('A');
  });

  it('single column', () => {
    const grid = [['A'],['B'],['C']];
    expect(decodeMessage(grid)).toBe('A');
  });

  it('empty grid returns empty string', () => {
    expect(decodeMessage([])).toBe('');
    expect(decodeMessage([[]])).toBe('');
  });

  it('square matrix 4x4', () => {
    const g = [
      ['A','B','C','D'],
      ['E','F','G','H'],
      ['I','J','K','L'],
      ['M','N','O','P'],
    ];
    // Path: A → F → K → H → O → L
    expect(decodeMessage(g)).toBe('AFKP');
  });

  it('rectangular taller than wide', () => {
    const g = [
      ['X','Y'],
      ['A','B'],
      ['C','D'],
      ['E','F'],
    ];
    expect(decodeMessage(g)).toBe('XB');
  });
});
```

