```js index.js 
/**
 * Creates a function that pipes values through a sequence of functions.
 * @param {Function[]} functions - array of unary functions
 * @returns {Function} composed function
 */
export function pipe(functions) {
  // TODO: Implement me
  return (value) => value;
}
```

```js index.test.js 
import { pipe } from './index';

describe('pipe (JS)', () => {
  const times = (y) => (x) => x * y;
  const plus = (y) => (x) => x + y;
  const subtract = (y) => (x) => x - y;
  const divide = (y) => (x) => x / y;

  it('composes two functions', () => {
    const multiplyBy6 = pipe([times(2), times(3)]);
    expect(multiplyBy6(4)).toBe(24);
  });

  it('composes three functions', () => {
    const fn = pipe([times(2), plus(3), times(4)]);
    expect(fn(5)).toBe(52); // ((5 * 2) + 3) * 4
  });

  it('composes four functions', () => {
    const fn = pipe([times(2), subtract(3), divide(4), plus(1)]);
    expect(fn(10)).toBe(5.25); // (((10 * 2) - 3) / 4) + 1
  });

  it('returns identity for empty array', () => {
    const fn = pipe([]);
    expect(fn(42)).toBe(42);
  });

  it('returns function as-is for single function', () => {
    const fn = pipe([times(3)]);
    expect(fn(7)).toBe(21);
  });

  it('works with string functions', () => {
    const toUpper = (s) => s.toUpperCase();
    const addExclaim = (s) => s + '!';
    const addQuestion = (s) => s + '?';
    
    const fn = pipe([toUpper, addExclaim, addQuestion]);
    expect(fn('hello')).toBe('HELLO!?');
  });
});
```




