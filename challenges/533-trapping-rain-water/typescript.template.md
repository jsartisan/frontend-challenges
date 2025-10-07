```ts index.ts 
export function trap(height: number[]): number {
  // TODO: Implement me
  return 0;
}
```

```ts index.test.ts 
import { trap } from './index';

describe('trap (TS)', () => {
  it('returns 0 for empty array', () => {
    expect(trap([])).toBe(0);
  });

  it('returns 0 for increasing heights', () => {
    expect(trap([1,2,3,4])).toBe(0);
  });

  it('returns 2 for [2,0,2]', () => {
    expect(trap([2,0,2])).toBe(2);
  });

  it('returns 6 for classic example', () => {
    expect(trap([0,1,0,2,1,0,1,3,2,1,2,1])).toBe(6);
  });

  it('returns 9 for [4,2,0,3,2,5]', () => {
    expect(trap([4,2,0,3,2,5])).toBe(9);
  });
});
```

