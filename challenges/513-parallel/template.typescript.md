```ts index.ts 
type Callback = (error: Error | null, data: any) => void;
type AsyncFunc = (callback: Callback, data?: any) => void;

export function parallel(asyncFuncs: AsyncFunc[]): AsyncFunc {
  // TODO: Implement me
}
```

```ts index.test.ts 
import { parallel } from './index';

// Utility to wait for a specified time
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe('parallel', () => {
  it('should execute all async functions in parallel', async () => {
    const async1 = (callback) => setTimeout(() => callback(null, 1), 10);
    const async2 = (callback) => setTimeout(() => callback(null, 2), 5);
    const async3 = (callback) => setTimeout(() => callback(null, 3), 15);

    const all = parallel([async1, async2, async3]);

    const result = await new Promise((resolve) => all((err, data) => resolve({ err, data })));

    expect(result.err).toBeNull();
    expect(result.data).toEqual([1, 2, 3]);
  });

  it('should handle empty array', async () => {
    const emptyParallel = parallel([]);
    const result = await new Promise((resolve) => emptyParallel((err, data) => resolve({ err, data })));

    expect(result.err).toBeNull();
    expect(result.data).toEqual([]);
  });

  it('should handle single async function', async () => {
    const asyncSingle = (callback) => setTimeout(() => callback(null, 'single'), 10);
    const singleParallel = parallel([asyncSingle]);

    const result = await new Promise((resolve) => singleParallel((err, data) => resolve({ err, data })));

    expect(result.err).toBeNull();
    expect(result.data).toEqual(['single']);
  });

  it('should return first error and ignore subsequent results', async () => {
    const async1 = (callback) => setTimeout(() => callback(null, 1), 10);
    const asyncFail = (callback) => setTimeout(() => callback(new Error('First error')), 5);
    const asyncNeverCalled = jest.fn((callback) => setTimeout(() => callback(new Error('Second error')), 8));

    const parallelWithError = parallel([async1, asyncFail, asyncNeverCalled]);

    const result = await new Promise((resolve) =>
      parallelWithError((err, data) => resolve({ err, data }))
    );

    expect(result.err.message).toBe('First error');
    expect(result.data).toBeUndefined();
    expect(asyncNeverCalled).toHaveBeenCalled();
  });

  it('should handle functions with different completion times', async () => {
    const fastAsync = (callback) => setTimeout(() => callback(null, 'fast'), 1);
    const slowAsync = (callback) => setTimeout(() => callback(null, 'slow'), 15);
    const mediumAsync = (callback) => setTimeout(() => callback(null, 'medium'), 5);

    const mixedParallel = parallel([fastAsync, slowAsync, mediumAsync]);

    const result = await new Promise((resolve) => mixedParallel((err, data) => resolve({ err, data })));

    expect(result.err).toBeNull();
    expect(result.data).toEqual(['fast', 'slow', 'medium']);
  });

  it('should handle functions with same completion time', async () => {
    const async1 = (callback) => setTimeout(() => callback(null, 1), 5);
    const async2 = (callback) => setTimeout(() => callback(null, 2), 5);
    const async3 = (callback) => setTimeout(() => callback(null, 3), 5);

    const sameTimeParallel = parallel([async1, async2, async3]);

    const result = await new Promise((resolve) => sameTimeParallel((err, data) => resolve({ err, data })));

    expect(result.err).toBeNull();
    expect(result.data).toEqual([1, 2, 3]);
  });

  it('should handle string and number results', async () => {
    const asyncString = (callback) => setTimeout(() => callback(null, 'hello'), 5);
    const asyncNumber = (callback) => setTimeout(() => callback(null, 42), 10);
    const asyncBoolean = (callback) => setTimeout(() => callback(null, true), 7);

    const mixedTypesParallel = parallel([asyncString, asyncNumber, asyncBoolean]);

    const result = await new Promise((resolve) => mixedTypesParallel((err, data) => resolve({ err, data })));

    expect(result.err).toBeNull();
    expect(result.data).toEqual(['hello', 42, true]);
  });

  it('should handle error in first function', async () => {
    const asyncFail = (callback) => setTimeout(() => callback(new Error('Immediate error')), 1);
    const asyncSuccess = (callback) => setTimeout(() => callback(null, 'success'), 5);

    const immediateErrorParallel = parallel([asyncFail, asyncSuccess]);

    const result = await new Promise((resolve) => immediateErrorParallel((err, data) => resolve({ err, data })));

    expect(result.err.message).toBe('Immediate error');
    expect(result.data).toBeUndefined();
  });

  it('should handle all functions failing', async () => {
    const asyncFail1 = (callback) => setTimeout(() => callback(new Error('Error 1')), 10);
    const asyncFail2 = (callback) => setTimeout(() => callback(new Error('Error 2')), 5);
    const asyncFail3 = (callback) => setTimeout(() => callback(new Error('Error 3')), 7);

    const allFailParallel = parallel([asyncFail1, asyncFail2, asyncFail3]);

    const result = await new Promise((resolve) => allFailParallel((err, data) => resolve({ err, data })));

    expect(result.err.message).toBe('Error 2'); // first error chronologically
    expect(result.data).toBeUndefined();
  });
});

```


