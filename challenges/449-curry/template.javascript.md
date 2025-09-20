```js index.js 
/**
 * @param {Function} fn - original function to curry
 * @returns {Function}
 */
export function curry(fn) {
  // TODO: Implement me
}
```

```js index.test.js 
import { curry } from './index';

describe('curry (JavaScript)', () => {
  const join = (a, b, c) => `${a}_${b}_${c}`;
  const curriedJoin = curry(join);

  it('invokes when provided all args at once', () => {
    expect(curriedJoin(1, 2, 3)).toBe('1_2_3');
  });

  it('invokes when provided args in multiple calls', () => {
    expect(curriedJoin(1)(2, 3)).toBe('1_2_3');
    expect(curriedJoin(1, 2)(3)).toBe('1_2_3');
  });

  it('handles single-argument functions', () => {
    const id = (x) => x;
    const curriedId = curry(id);
    expect(curriedId(42)).toBe(42);
  });
});
```

