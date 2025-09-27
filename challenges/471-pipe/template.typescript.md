```ts index.ts 
export function pipe<T>(functions: Array<(arg: T) => T>): (arg: T) => T {
  // TODO: Implement me
  return (value) => value;
}
```

```ts index.test.ts 
import { pipe } from './index';

describe('pipe (TS)', () => {
  const times = (y: number) => (x: number) => x * y;
  const plus = (y: number) => (x: number) => x + y;
  const subtract = (y: number) => (x: number) => x - y;
  const divide = (y: number) => (x: number) => x / y;

  it('composes two functions', () => {
    const multiplyBy6 = pipe([times(2), times(3)]);
    expect(multiplyBy6(4)).toBe(24);
  });

  it('composes three functions', () => {
    const fn = pipe([times(2), plus(3), times(4)]);
    expect(fn(5)).toBe(52);
  });

  it('composes four functions', () => {
    const fn = pipe([times(2), subtract(3), divide(4), plus(1)]);
    expect(fn(10)).toBe(5.25);
  });

  it('empty array returns identity', () => {
    const fn = pipe([]);
    expect(fn(42)).toBe(42);
  });

  it('single function works', () => {
    const fn = pipe([times(3)]);
    expect(fn(7)).toBe(21);
  });

  it('works with different types', () => {
    const toString = (n: number) => n.toString();
    const toUpper = (s: string) => s.toUpperCase();
    const addExclaim = (s: string) => s + '!';
    
    const fn = pipe([toString, toUpper, addExclaim]);
    expect(fn(42)).toBe('42!');
  });
});
```