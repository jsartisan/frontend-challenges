```js index.js 
/**
 * Run async tasks in parallel and invoke callback after each finishes.
 * @param {Array<() => Promise<any>>} tasks - List of async functions
 * @param {(result: any) => void} callback - Callback after each completion
 */
export function runParallel(tasks, callback) {
  // TODO: Implement me
}
```

```js index.test.js 
import { runParallel } from './index';

describe('runParallel', () => {
  it('should invoke callback after each successful task', async () => {
    const results = [];
    const tasks = [
      () => Promise.resolve('A'),
      () => Promise.resolve('B')
    ];
    runParallel(tasks, (res) => results.push(res));

    // wait a tick
    await new Promise((r) => setTimeout(r, 10));
    expect(results).toEqual(['A', 'B']);
  });

  it('should invoke callback with error when a task rejects', async () => {
    const results = [];
    const tasks = [
      () => Promise.resolve('ok'),
      () => Promise.reject('fail')
    ];
    runParallel(tasks, (res) => results.push(res));

    await new Promise((r) => setTimeout(r, 10));
    expect(results).toContain('ok');
    expect(results).toContain('fail');
  });

  it('should run all tasks in parallel', async () => {
    const order = [];
    const tasks = [
      () => new Promise((r) => setTimeout(() => { order.push('first'); r('first'); }, 50)),
      () => new Promise((r) => setTimeout(() => { order.push('second'); r('second'); }, 10))
    ];
    runParallel(tasks, () => {});
    await new Promise((r) => setTimeout(r, 100));

    expect(order).toEqual(['second', 'first']);
  });
});
```


