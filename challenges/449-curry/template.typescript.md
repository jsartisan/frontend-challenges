```ts index.ts 
export type Curried<F> = F extends (...args: infer A) => infer R
  ? <T extends any[]>(...args: T) =>
      A extends [...T, ...infer Rest]
        ? Rest['length'] extends 0
          ? R
          : Curried<(...args: Rest) => R>
        : never
  : never;

export function curry<F extends (...args: any[]) => any>(fn: F): Curried<F> {
  // TODO: Implement me
  return undefined as any;
}
```

```ts index.test.ts 
import { curry } from './index';

describe('curry (TypeScript)', () => {
  const join = (a: string | number, b: string | number, c: string | number) => `${a}_${b}_${c}`;
  const curriedJoin = curry(join);

  it('invokes when provided all args at once', () => {
    expect(curriedJoin(1, 2, 3)).toBe('1_2_3');
  });

  it('invokes when provided args in multiple calls', () => {
    expect(curriedJoin(1)(2, 3)).toBe('1_2_3');
    expect(curriedJoin(1, 2)(3)).toBe('1_2_3');
  });

  it('keeps type safety for partial application', () => {
    const add = (a: number, b: number, c: number) => a + b + c;
    const curriedAdd = curry(add);
    const addFive = curriedAdd(2, 3); // (c: number) => number
    expect(addFive(4)).toBe(9);
  });
});
```
