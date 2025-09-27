```ts index.ts 
export interface UpdateSpec {
  $push?: any[];
  $set?: any;
  $merge?: Record<string, any>;
  $apply?: (value: any) => any;
  [key: string]: any;
}

export function update<T>(target: T, spec: UpdateSpec): T {
  // TODO: Implement me
  return target;
}
```

```ts index.test.ts 
import { update } from './index';

describe('update (TS)', () => {
  it('pushes to array', () => {
    const arr = [1, 2, 3];
    const result = update(arr, {$push: [4, 5]});
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it('sets nested values', () => {
    const state = { a: { b: { c: 1 } }, d: 2 };
    const result = update(state, {a: {b: {c: {$set: 3}}}});
    expect(result).toEqual({ a: { b: { c: 3 } }, d: 2 });
  });

  it('merges properties', () => {
    const state = { a: { b: { c: 1 } } };
    const result = update(state, {a: {b: {$merge: {e: 5}}}});
    expect(result).toEqual({ a: { b: { c: 1, e: 5 } } });
  });

  it('applies transformation', () => {
    const arr = [1, 2, 3];
    const result = update(arr, {0: {$apply: (x: number) => x * 2}});
    expect(result).toEqual([2, 2, 3]);
  });

  it('sets array index', () => {
    const arr = [1, 2, 3];
    const result = update(arr, {1: {$set: 99}});
    expect(result).toEqual([1, 99, 3]);
  });

  it('combines operations', () => {
    const state = { items: [1], count: 0 };
    const result = update(state, {
      items: {$push: [2, 3]},
      count: {$set: 3}
    });
    expect(result).toEqual({ items: [1, 2, 3], count: 3 });
  });
});
```

