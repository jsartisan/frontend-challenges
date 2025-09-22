```js index.js 
/**
 * Fisher–Yates shuffle (in-place).
 * @template T
 * @param {T[]} array
 * @returns {T[]} the same array, shuffled
 */
export function shuffle(array) {
  // TODO: Implement me
  return array;
}
```

```js index.test.js 
import { shuffle } from './index';

describe('shuffle (JS)', () => {
  it('returns the same array instance', () => {
    const arr = [1, 2, 3];
    const out = shuffle(arr);
    expect(out).toBe(arr);
  });

  it('contains the same elements', () => {
    const arr = [1, 2, 3, 4];
    shuffle(arr);
    expect(arr.sort()).toEqual([1, 2, 3, 4]);
  });

  it('mutates the array (order changes) when Math.random is non-trivial', () => {
    const arr = [1, 2, 3];
    jest.spyOn(global.Math, 'random').mockReturnValueOnce(0.9).mockReturnValue(0.1);
    shuffle(arr);
    expect(arr).not.toEqual([1, 2, 3]);
    jest.spyOn(global.Math, 'random').mockRestore();
  });

  it('works on empty array', () => {
    const arr = [];
    expect(shuffle(arr)).toEqual([]);
  });

  it('works on single-element array', () => {
    const arr = [42];
    expect(shuffle(arr)).toEqual([42]);
  });

  it('permutation depends on Math.random sequence', () => {
    const arr = [1, 2, 3];
    const spy = jest.spyOn(global.Math, 'random');
    spy.mockReturnValueOnce(0.75).mockReturnValueOnce(0.5).mockReturnValueOnce(0.25);
    shuffle(arr);
    spy.mockRestore();
    expect(arr).toEqual([2, 1, 3]); // deterministic given mocked sequence
  });
});
```

```ts index.ts 
export function shuffle<T>(array: T[]): T[] {
  // TODO: Implement me
  return array;
}
```

```ts index.test.ts 
import { shuffle } from './index';

describe('shuffle (TS)', () => {
  it('returns same reference', () => {
    const arr = [1, 2, 3];
    const out = shuffle(arr);
    expect(out).toBe(arr);
  });

  it('keeps all elements', () => {
    const arr = [1, 2, 3, 4];
    shuffle(arr);
    expect([...arr].sort()).toEqual([1, 2, 3, 4]);
  });

  it('order changes with random values', () => {
    const arr = [1, 2, 3];
    jest.spyOn(global.Math, 'random').mockReturnValueOnce(0.8).mockReturnValue(0.2);
    shuffle(arr);
    jest.spyOn(global.Math, 'random').mockRestore();
    expect(arr).not.toEqual([1, 2, 3]);
  });

  it('handles empty array', () => {
    const arr: number[] = [];
    expect(shuffle(arr)).toEqual([]);
  });

  it('handles single element', () => {
    const arr = ['a'];
    expect(shuffle(arr)).toEqual(['a']);
  });

  it('deterministic with mocked random', () => {
    const arr = [1, 2, 3];
    const spy = jest.spyOn(global.Math, 'random');
    spy.mockReturnValueOnce(0.6).mockReturnValueOnce(0.3).mockReturnValueOnce(0.1);
    shuffle(arr);
    spy.mockRestore();
    expect(arr).toEqual([3, 1, 2]);
  });
});
```


