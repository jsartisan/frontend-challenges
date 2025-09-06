```js index.js 
/**
 * Execute an array of promise-returning functions in series.
 * @param {(() => Promise<any>)[]} tasks
 * @returns {Promise<any[]>}
 */
export function runInSeries(tasks) {
  // TODO: Implement
}
```

```js index.test.js 
import { runInSeries } from './index';

describe('runInSeries', () => {
  it('runs tasks sequentially and collects results', async () => {
    const tasks = [
      () => Promise.resolve(1),
      () => Promise.resolve(2),
      () => Promise.resolve(3),
    ];
    const results = await runInSeries(tasks);
    expect(results).toEqual([1, 2, 3]);
  });

  it('waits between tasks (sequential execution)', async () => {
    const calls = [];
    const tasks = [
      () => new Promise(res => setTimeout(() => { calls.push(1); res(1); }, 30)),
      () => new Promise(res => setTimeout(() => { calls.push(2); res(2); }, 30)),
    ];
    const results = await runInSeries(tasks);
    expect(results).toEqual([1, 2]);
    expect(calls).toEqual([1, 2]); // order preserved
  });

  it('rejects immediately if a task fails', async () => {
    const tasks = [
      () => Promise.resolve('ok'),
      () => Promise.reject('fail'),
      () => Promise.resolve('skip'),
    ];
    await expect(runInSeries(tasks)).rejects.toBe('fail');
  });

  it('resolves empty array if no tasks given', async () => {
    const results = await runInSeries([]);
    expect(results).toEqual([]);
  });
});
```


