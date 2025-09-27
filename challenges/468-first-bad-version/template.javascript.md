```js index.js 
/**
 * Returns a function that finds the first bad version using binary search.
 * @param {Function} isBad - predicate function
 * @returns {Function} finder function that takes n and returns first bad version
 */
export function firstBadVersion(isBad) {
  // TODO: Implement me
  return function(n) {
    return -1;
  };
}
```

```js index.test.js 
import { firstBadVersion } from './index';

describe('firstBadVersion (JS)', () => {
  it('finds first bad version in middle', () => {
    const isBad = (v) => v >= 5;
    const find = firstBadVersion(isBad);
    expect(find(10)).toBe(5);
  });

  it('returns -1 when no bad versions', () => {
    const isBad = (v) => false;
    const find = firstBadVersion(isBad);
    expect(find(10)).toBe(-1);
  });

  it('first version is bad', () => {
    const isBad = (v) => v >= 0;
    const find = firstBadVersion(isBad);
    expect(find(5)).toBe(0);
  });

  it('last version is bad', () => {
    const isBad = (v) => v >= 4;
    const find = firstBadVersion(isBad);
    expect(find(5)).toBe(4);
  });

  it('single version', () => {
    const isBad = (v) => v >= 0;
    const find = firstBadVersion(isBad);
    expect(find(1)).toBe(0);
  });

  it('single version not bad', () => {
    const isBad = (v) => v >= 2;
    const find = firstBadVersion(isBad);
    expect(find(1)).toBe(-1);
  });
});
```

```ts index.ts 
export function firstBadVersion(
  isBad: (version: number) => boolean
): (n: number) => number {
  // TODO: Implement me
  return (n) => -1;
}
```

```ts index.test.ts 
import { firstBadVersion } from './index';

describe('firstBadVersion (TS)', () => {
  it('finds middle bad version', () => {
    const isBad = (v) => v >= 7;
    const find = firstBadVersion(isBad);
    expect(find(15)).toBe(7);
  });

  it('no bad versions returns -1', () => {
    const isBad = (v) => false;
    const find = firstBadVersion(isBad);
    expect(find(8)).toBe(-1);
  });

  it('first version bad', () => {
    const isBad = (v) => v >= 0;
    const find = firstBadVersion(isBad);
    expect(find(3)).toBe(0);
  });

  it('last version bad', () => {
    const isBad = (v) => v >= 6;
    const find = firstBadVersion(isBad);
    expect(find(7)).toBe(6);
  });

  it('single version bad', () => {
    const isBad = (v) => v >= 0;
    const find = firstBadVersion(isBad);
    expect(find(1)).toBe(0);
  });

  it('single version good', () => {
    const isBad = (v) => v >= 1;
    const find = firstBadVersion(isBad);
    expect(find(1)).toBe(-1);
  });
});
```


