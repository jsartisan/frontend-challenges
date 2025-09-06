```js index.js 
/**
 * Minimal implementation of `test` and `expect`
 */

export function test(name, fn) {
  // TODO: Implement runner
}

export function expect(received) {
  return {
    toBe(expected) {
      // TODO: strict equality
    },
    toEqual(expected) {
      // TODO: deep equality
    }
  };
}
```

```js index.test.js 
import { test, expect } from './index';

test('toBe should pass with strict equality', () => {
  expect(5).toBe(5);
});

test('toBe should fail with strict inequality', () => {
  expect(5).toBe(10);
});

test('toEqual should pass with deep equality', () => {
  expect({ a: 1, b: [2, 3] }).toEqual({ a: 1, b: [2, 3] });
});

test('toEqual should fail with deep inequality', () => {
  expect({ a: 1, b: 2 }).toEqual({ a: 1, b: 3 });
});

test('nested arrays deep equality', () => {
  expect([[1], [2, 3]]).toEqual([[1], [2, 3]]);
});
```


