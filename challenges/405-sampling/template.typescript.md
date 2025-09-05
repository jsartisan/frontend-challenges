```ts index.ts 
export function sampling<T extends (...args: any[]) => any>(
  fn: T,
  count: number
): (...args: Parameters<T>) => void {
  // TODO: Implement me
  return (...args: Parameters<T>) => {
    // TODO
  };
}
```

```ts index.test.ts 
import { sampling } from './index';

describe('sampling', () => {
  it('should execute function on every nth call', () => {
    let result = 0;
    const fn = () => { result++; };
    const sampled = sampling(fn, 2);

    sampled();
    expect(result).toBe(0); // not executed
    sampled();
    expect(result).toBe(1); // executed
  });

  it('should work with count = 1 (execute every time)', () => {
    let result = 0;
    const fn = () => { result++; };
    const sampled = sampling(fn, 1);

    sampled();
    sampled();
    expect(result).toBe(2);
  });

  it('should pass arguments correctly to the callback', () => {
    const fn = jest.fn();
    const sampled = sampling(fn, 3);

    sampled(42, 'test');
    sampled(99, 'skip');
    sampled(7, 'execute');

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(7, 'execute');
  });

  it('should not execute callback if never reaching the count', () => {
    let result = 0;
    const fn = () => { result++; };
    const sampled = sampling(fn, 10);

    sampled();
    sampled();
    sampled();
    expect(result).toBe(0);
  });
});
```


