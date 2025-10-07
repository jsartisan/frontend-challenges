```js index.js 
/**
 * @param {number[]} height
 * @return {number}
 */
export function trap(height) {
  // TODO: Implement me
  return 0;
}
```

```js index.test.js 
import { trap } from './index';

describe('trap (JS)', () => {
  it('handles empty array', () => {
    expect(trap([])).toBe(0);
  });

  it('handles single bar', () => {
    expect(trap([5])).toBe(0);
  });

  it('handles no trapped water', () => {
    expect(trap([1,2,3,4,5])).toBe(0);
  });

  it('handles simple valley', () => {
    expect(trap([2,0,2])).toBe(2);
  });

  it('handles complex case', () => {
    expect(trap([0,1,0,2,1,0,1,3,2,1,2,1])).toBe(6);
  });

  it('handles another complex case', () => {
    expect(trap([4,2,0,3,2,5])).toBe(9);
  });
});
```