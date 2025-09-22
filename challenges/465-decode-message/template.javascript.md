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
    expect(decodeMessage(g)).toBe('AFKHOL');
  });

  it('rectangular taller than wide', () => {
    const g = [
      ['X','Y'],
      ['A','B'],
      ['C','D'],
      ['E','F'],
    ];
    expect(decodeMessage(g)).toBe('XBF');
  });
});
```

```ts index.ts 
export function decodeMessage(grid: string[][]): string {
  // TODO: Implement me
  return "";
}
```

```ts index.test.ts 
import { decodeMessage } from './index';

describe('decodeMessage (TS)', () => {
  it('example', () => {
    const grid = [
      ['I','B','C','A','L','K','A'],
      ['D','R','F','C','A','E','A'],
      ['G','H','O','E','L','A','D'],
    ];
    expect(decodeMessage(grid)).toBe('IROCLED');
  });

  it('single row', () => {
    expect(decodeMessage([['A','B']])).toBe('A');
  });

  it('single column', () => {
    expect(decodeMessage([['Z'],['Y']])).toBe('Z');
  });

  it('empty cases', () => {
    expect(decodeMessage([])).toBe('');
    expect(decodeMessage([[]])).toBe('');
  });

  it('square 3x3', () => {
    const g = [
      ['A','B','C'],
      ['D','E','F'],
      ['G','H','I'],
    ];
    // Path: A → E → I
    expect(decodeMessage(g)).toBe('AEI');
  });

  it('rectangular wider than tall', () => {
    const g = [
      ['a','b','c','d'],
      ['e','f','g','h'],
    ];
    expect(decodeMessage(g)).toBe('afh');
  });
});
```


