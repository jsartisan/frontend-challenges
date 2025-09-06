```ts index.ts 
/**
 * Retry a promise-returning function up to n times.
 * @param fn - Function that returns a promise
 * @param n - Number of retries
 * @returns A promise with the resolved value or rejection after n attempts
 */
export async function retryPromise<T>(fn: () => Promise<T>, n: number): Promise<T> {
  // TODO: Implement
}
```

```ts index.test.ts 
import { retryPromise } from './index';

describe('retryPromise', () => {
  it('resolves when function eventually succeeds', async () => {
    let attempts = 0;
    const fn = () => {
      attempts++;
      return attempts < 3 ? Promise.reject('fail') : Promise.resolve('ok');
    };
    const result = await retryPromise(fn, 5);
    expect(result).toBe('ok');
  });

  it('rejects after all retries fail', async () => {
    const fn = () => Promise.reject('error');
    await expect(retryPromise(fn, 3)).rejects.toBe('error');
  });

  it('tries only once if n=0', async () => {
    let attempts = 0;
    const fn = () => {
      attempts++;
      return Promise.reject('fail');
    };
    await expect(retryPromise(fn, 0)).rejects.toBe('fail');
    expect(attempts).toBe(1);
  });

  it('works when success on first try', async () => {
    const fn = () => Promise.resolve('first');
    const result = await retryPromise(fn, 3);
    expect(result).toBe('first');
  });
});
```


