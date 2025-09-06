```js index.js 
/**
 * Execute promise-returning tasks according to priority.
 * @param {{ fn: () => Promise<any>, priority: number }[]} tasks
 * @returns {Promise<any[]>}
 */
export function runWithPriority(tasks) {
  // TODO: Implement
}
```

```js index.test.js 
import { runWithPriority } from './index';

describe('runWithPriority', () => {
  it('executes tasks by priority order', async () => {
    const tasks = [
      { fn: () => Promise.resolve('low'), priority: 1 },
      { fn: () => Promise.resolve('high'), priority: 3 },
      { fn: () => Promise.resolve('medium'), priority: 2 },
    ];
    const results = await runWithPriority(tasks);
    expect(results).toEqual(['high', 'medium', 'low']);
  });

  it('keeps input order when priorities are equal', async () => {
    const tasks = [
      { fn: () => Promise.resolve(1), priority: 2 },
      { fn: () => Promise.resolve(2), priority: 2 },
      { fn: () => Promise.resolve(3), priority: 2 },
    ];
    const results = await runWithPriority(tasks);
    expect(results).toEqual([1, 2, 3]);
  });

  it('rejects immediately if a task fails', async () => {
    const tasks = [
      { fn: () => Promise.resolve('ok'), priority: 2 },
      { fn: () => Promise.reject('fail'), priority: 5 },
      { fn: () => Promise.resolve('skip'), priority: 1 },
    ];
    await expect(runWithPriority(tasks)).rejects.toBe('fail');
  });

  it('resolves empty array for no tasks', async () => {
    const results = await runWithPriority([]);
    expect(results).toEqual([]);
  });
});
```


