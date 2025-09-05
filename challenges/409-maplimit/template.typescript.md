```ts index.ts 
export function mapLimit<T, R>(
  inputs: T[],
  limit: number,
  iteratee: (item: T, cb: (err: Error | null, result?: R) => void) => void
): Promise<R[]> {
  // TODO: Implement me
  return Promise.resolve([] as R[]);
}
```

```ts index.test.ts 
import { mapLimit } from './index';

describe('mapLimit', () => {
  it('resolves with results in original order', async () => {
    const result = await mapLimit([1, 2, 3], 2, (n, cb) =>
      setTimeout(() => cb(null, n * 2), 10)
    );
    expect(result).toEqual([2, 4, 6]);
  });

  it('does not exceed the concurrency limit', async () => {
    let active = 0;
    let peak = 0;

    await mapLimit([1, 2, 3, 4], 2, (_, cb) => {
      active++;
      peak = Math.max(peak, active);
      setTimeout(() => {
        active--;
        cb(null, null);
      }, 5);
    });

    expect(peak).toBeLessThanOrEqual(2);
  });

  it('rejects when any iteratee errors', async () => {
    expect.assertions(1);
    try {
      await mapLimit([1, 2, 3], 2, (n, cb) =>
        n === 2 ? cb(new Error('boom')) : cb(null, n)
      );
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });
});
```


