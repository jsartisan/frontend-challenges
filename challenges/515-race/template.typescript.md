```ts index.ts 
type Callback = (error: Error | null, data: any) => void;
type AsyncFunc = (callback: Callback, data?: any) => void;

export function race(asyncFuncs: AsyncFunc[]): AsyncFunc {
  // TODO: Implement me
}
```

```ts index.test.ts 
import { race } from './index';

// Utility to wait for a specified time
function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe('race', () => {
  it('should return the first function to complete', async () => {
    const async1 = (cb) => setTimeout(() => cb(null, 1), 10);
    const async2 = (cb) => setTimeout(() => cb(null, 2), 5);
    const async3 = (cb) => setTimeout(() => cb(null, 3), 8);

    const first = race([async1, async2, async3]);

    const result = await new Promise((resolve) => first((err, data) => resolve({ err, data })));

    expect(result.err).toBeNull();
    expect(result.data).toBe(2);
  });

  it('should handle empty array', async () => {
    const emptyRace = race([]);
    const result = await new Promise((resolve) => emptyRace((err, data) => resolve({ err, data })));

    expect(result.err).toBeNull();
    expect(result.data).toBeUndefined();
  });

  it('should handle single async function', async () => {
    const asyncSingle = (cb) => setTimeout(() => cb(null, 'single'), 10);
    const singleRace = race([asyncSingle]);

    const result = await new Promise((resolve) => singleRace((err, data) => resolve({ err, data })));

    expect(result.err).toBeNull();
    expect(result.data).toBe('single');
  });

  it('should return first error and ignore subsequent results', async () => {
    const async1 = (cb) => setTimeout(() => cb(null, 1), 10);
    const asyncFail = (cb) => setTimeout(() => cb(new Error('First error')), 5);
    const asyncSuccess = (cb) => setTimeout(() => cb(null, 3), 8);

    const raceWithError = race([async1, asyncFail, asyncSuccess]);

    const result = await new Promise((resolve) => raceWithError((err, data) => resolve({ err, data })));

    expect(result.err.message).toBe('First error');
    expect(result.data).toBeUndefined();
  });

  it('should handle functions with same completion time', async () => {
    const async1 = (cb) => setTimeout(() => cb(null, 1), 5);
    const async2 = (cb) => setTimeout(() => cb(null, 2), 5);
    const async3 = (cb) => setTimeout(() => cb(null, 3), 5);

    const sameTimeRace = race([async1, async2, async3]);

    const result = await new Promise((resolve) => sameTimeRace((err, data) => resolve({ err, data })));

    expect(result.err).toBeNull();
    expect([1, 2, 3]).toContain(result.data);
  });

  it('should handle functions with different completion times', async () => {
    const fastAsync = (cb) => setTimeout(() => cb(null, 'fast'), 1);
    const slowAsync = (cb) => setTimeout(() => cb(null, 'slow'), 15);
    const mediumAsync = (cb) => setTimeout(() => cb(null, 'medium'), 5);

    const mixedRace = race([fastAsync, slowAsync, mediumAsync]);

    const result = await new Promise((resolve) => mixedRace((err, data) => resolve({ err, data })));

    expect(result.err).toBeNull();
    expect(result.data).toBe('fast');
  });

  it('should handle mixed data types', async () => {
    const asyncString = (cb) => setTimeout(() => cb(null, 'hello'), 5);
    const asyncNumber = (cb) => setTimeout(() => cb(null, 42), 10);
    const asyncBoolean = (cb) => setTimeout(() => cb(null, true), 15);

    const mixedTypesRace = race([asyncString, asyncNumber, asyncBoolean]);

    const result = await new Promise((resolve) => mixedTypesRace((err, data) => resolve({ err, data })));

    expect(result.err).toBeNull();
    expect(result.data).toBe('hello');
  });

  it('should handle immediate error', async () => {
    const asyncFail = (cb) => setTimeout(() => cb(new Error('Immediate error')), 1);
    const asyncSuccess = (cb) => setTimeout(() => cb(null, 'success'), 5);

    const immediateErrorRace = race([asyncFail, asyncSuccess]);

    const result = await new Promise((resolve) => immediateErrorRace((err, data) => resolve({ err, data })));

    expect(result.err.message).toBe('Immediate error');
    expect(result.data).toBeUndefined();
  });

  it('should ignore results from slower functions', async () => {
    const fastAsync = jest.fn((cb) => setTimeout(() => cb(null, 'fast'), 5));
    const slowAsync = jest.fn((cb) => setTimeout(() => cb(null, 'slow'), 15));

    const raceTest = race([fastAsync, slowAsync]);

    const result = await new Promise((resolve) => raceTest((err, data) => resolve({ err, data })));

    expect(result.err).toBeNull();
    expect(result.data).toBe('fast');
    expect(fastAsync).toHaveBeenCalled();
    expect(slowAsync).toHaveBeenCalled();
  });
});

```


