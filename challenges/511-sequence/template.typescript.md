```ts index.ts 
type Callback = (error: Error | null, data: any) => void;
type AsyncFunc = (callback: Callback, data: any) => void;

export function sequence(asyncFuncs: AsyncFunc[]): AsyncFunc {
  // TODO: Implement me
}
```

```ts index.test.ts 
import { sequence } from './index';

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('sequence', () => {
  it('should chain async functions sequentially', async () => {
    const asyncTimes2 = (callback, num) => {
      setTimeout(() => callback(null, num * 2), 100);
    };

    const asyncTimes4 = sequence([asyncTimes2, asyncTimes2]);

    const result = await new Promise((resolve, reject) => {
      asyncTimes4((error, data) => {
        if (error) reject(error);
        else resolve(data);
      }, 1);
    });

    await wait(200);
    expect(result).toBe(4);
  });

  it('should handle empty array', async () => {
    const emptySequence = sequence([]);

    const result = await new Promise((resolve, reject) => {
      emptySequence((error, data) => {
        if (error) reject(error);
        else resolve(data);
      });
    });

    expect(result).toBeUndefined();
  });

  it('should handle single async function', async () => {
    const asyncAdd1 = (callback, num) => {
      setTimeout(() => callback(null, num + 1), 100);
    };

    const singleSequence = sequence([asyncAdd1]);

    const result = await new Promise((resolve, reject) => {
      singleSequence((error, data) => {
        if (error) reject(error);
        else resolve(data);
      }, 1);
    });

    await wait(100);
    expect(result).toBe(2);
  });

  it('should stop on first error', async () => {
    const asyncTimes2 = (callback, num) => {
      setTimeout(() => callback(null, num * 2), 100);
    };

    const asyncFail = (callback, data) => {
      setTimeout(() => callback(new Error('Something went wrong')), 50);
    };

    const asyncNeverCalled = jest.fn((callback, data) => {
      setTimeout(() => callback(null, data + 1), 100);
    });

    const sequenceWithError = sequence([asyncTimes2, asyncFail, asyncNeverCalled]);

    const error = await new Promise((resolve) => {
      sequenceWithError((err) => resolve(err), 1);
    });

    await wait(200);

    expect(error.message).toBe('Something went wrong');
    expect(asyncNeverCalled).not.toHaveBeenCalled();
  });

  it('should handle multiple chained operations', async () => {
    const asyncAdd1 = (callback, num) => {
      setTimeout(() => callback(null, num + 1), 50);
    };

    const asyncTimes3 = (callback, num) => {
      setTimeout(() => callback(null, num * 3), 50);
    };

    const asyncSubtract2 = (callback, num) => {
      setTimeout(() => callback(null, num - 2), 50);
    };

    const complexSequence = sequence([asyncAdd1, asyncTimes3, asyncSubtract2]);

    const result = await new Promise((resolve, reject) => {
      complexSequence((error, data) => {
        if (error) reject(error);
        else resolve(data);
      }, 1);
    });

    await wait(150);
    expect(result).toBe(4);
  });

  it('should handle async functions with different timing', async () => {
    const fastAsync = (callback, data) => {
      setTimeout(() => callback(null, data + 1), 10);
    };

    const slowAsync = (callback, data) => {
      setTimeout(() => callback(null, data * 2), 100);
    };

    const mixedSequence = sequence([fastAsync, slowAsync]);

    const result = await new Promise((resolve, reject) => {
      mixedSequence((error, data) => {
        if (error) reject(error);
        else resolve(data);
      }, 1);
    });

    await wait(200);
    expect(result).toBe(4);
  });

  it('should handle string data transformation', async () => {
    const asyncToUpper = (callback, str) => {
      setTimeout(() => callback(null, str.toUpperCase()), 50);
    };

    const asyncAddExclamation = (callback, str) => {
      setTimeout(() => callback(null, str + '!'), 50);
    };

    const stringSequence = sequence([asyncToUpper, asyncAddExclamation]);

    const result = await new Promise((resolve, reject) => {
      stringSequence((error, data) => {
        if (error) reject(error);
        else resolve(data);
      }, 'hello');
    });

    await wait(100);
    expect(result).toBe('HELLO!');
  });

  it('should handle error in first function', async () => {
    const asyncFail = (callback, data) => {
      setTimeout(() => callback(new Error('First error')), 50);
    };

    const asyncNeverCalled = jest.fn((callback, data) => {
      setTimeout(() => callback(null, data), 100);
    });

    const failingSequence = sequence([asyncFail, asyncNeverCalled]);

    const error = await new Promise((resolve) => {
      failingSequence((err) => resolve(err), 'test');
    });

    await wait(100);

    expect(error.message).toBe('First error');
    expect(asyncNeverCalled).not.toHaveBeenCalled();
  });
});
```


