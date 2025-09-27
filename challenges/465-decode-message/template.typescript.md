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
    expect(decodeMessage(g)).toBe('afch');
  });
});
```


