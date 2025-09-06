```js index.js 
/**
 * Polyfill for Promise.allSettled
 * @param {Array<Promise<any>|any>} promises
 * @returns {Promise<Array<{status: string, value?: any, reason?: any}>>}
 */
export function promiseAllSettled(promises) {
  // TODO: Implement
}
```

```js index.test.js 
import { promiseAllSettled } from './index';

describe('promiseAllSettled', () => {
  it('resolves when all promises fulfill', async () => {
    const input = [Promise.resolve(1), Promise.resolve(2)];
    const results = await promiseAllSettled(input);
    expect(results).toEqual([
      { status: 'fulfilled', value: 1 },
      { status: 'fulfilled', value: 2 }
    ]);
  });

  it('handles rejections', async () => {
    const input = [Promise.resolve('ok'), Promise.reject('fail')];
    const results = await promiseAllSettled(input);
    expect(results).toEqual([
      { status: 'fulfilled', value: 'ok' },
      { status: 'rejected', reason: 'fail' }
    ]);
  });

  it('preserves input order', async () => {
    const input = [
      Promise.resolve('first'),
      new Promise(res => setTimeout(() => res('second'), 20)),
      Promise.reject('third error')
    ];
    const results = await promiseAllSettled(input);
    expect(results[0]).toEqual({ status: 'fulfilled', value: 'first' });
    expect(results[1]).toEqual({ status: 'fulfilled', value: 'second' });
    expect(results[2]).toEqual({ status: 'rejected', reason: 'third error' });
  });

  it('handles non-promise values', async () => {
    const input = [1, 'x', true];
    const results = await promiseAllSettled(input);
    expect(results).toEqual([
      { status: 'fulfilled', value: 1 },
      { status: 'fulfilled', value: 'x' },
      { status: 'fulfilled', value: true }
    ]);
  });

  it('resolves empty array if input is empty', async () => {
    const results = await promiseAllSettled([]);
    expect(results).toEqual([]);
  });
});
```


