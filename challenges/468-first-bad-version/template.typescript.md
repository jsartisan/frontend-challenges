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
