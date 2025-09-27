```ts index.ts 
type Callback = (error: Error | null, data: any) => void;
type AsyncFunc = (callback: Callback, data: any) => void;

export function sequence(asyncFuncs: AsyncFunc[]): AsyncFunc {
  // TODO: Implement me
}
```

```ts index.test.ts 
import { sequence } from './index';

describe('sequence', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('should chain async functions sequentially', (done) => {
    const asyncTimes2 = (callback: any, num: number) => {
      setTimeout(() => callback(null, num * 2), 100);
    };

    const asyncTimes4 = sequence([asyncTimes2, asyncTimes2]);

    asyncTimes4((error, data) => {
      expect(error).toBeNull();
      expect(data).toBe(4);
      done();
    }, 1);

    jest.advanceTimersByTime(200);
  });

  it('should handle empty array', (done) => {
    const emptySequence = sequence([]);

    emptySequence((error, data) => {
      expect(error).toBeNull();
      expect(data).toBeUndefined();
      done();
    });
  });

  it('should handle single async function', (done) => {
    const asyncAdd1 = (callback: any, num: number) => {
      setTimeout(() => callback(null, num + 1), 100);
    };

    const singleSequence = sequence([asyncAdd1]);

    singleSequence((error, data) => {
      expect(error).toBeNull();
      expect(data).toBe(2);
      done();
    }, 1);

    jest.advanceTimersByTime(100);
  });

  it('should stop on first error', (done) => {
    const asyncTimes2 = (callback: any, num: number) => {
      setTimeout(() => callback(null, num * 2), 100);
    };

    const asyncFail = (callback: any, data: any) => {
      setTimeout(() => callback(new Error('Something went wrong')), 50);
    };

    const asyncNeverCalled = jest.fn((callback: any, data: any) => {
      setTimeout(() => callback(null, data + 1), 100);
    });

    const sequenceWithError = sequence([
      asyncTimes2,
      asyncFail,
      asyncNeverCalled
    ]);

    sequenceWithError((error, data) => {
      expect(error.message).toBe('Something went wrong');
      expect(data).toBeUndefined();
      expect(asyncNeverCalled).not.toHaveBeenCalled();
      done();
    }, 1);

    jest.advanceTimersByTime(200);
  });

  it('should handle multiple chained operations', (done) => {
    const asyncAdd1 = (callback: any, num: number) => {
      setTimeout(() => callback(null, num + 1), 50);
    };

    const asyncTimes3 = (callback: any, num: number) => {
      setTimeout(() => callback(null, num * 3), 50);
    };

    const asyncSubtract2 = (callback: any, num: number) => {
      setTimeout(() => callback(null, num - 2), 50);
    };

    const complexSequence = sequence([
      asyncAdd1,    // 1 -> 2
      asyncTimes3,  // 2 -> 6
      asyncSubtract2 // 6 -> 4
    ]);

    complexSequence((error, data) => {
      expect(error).toBeNull();
      expect(data).toBe(4);
      done();
    }, 1);

    jest.advanceTimersByTime(150);
  });

  it('should handle async functions with different timing', (done) => {
    const fastAsync = (callback: any, data: number) => {
      setTimeout(() => callback(null, data + 1), 10);
    };

    const slowAsync = (callback: any, data: number) => {
      setTimeout(() => callback(null, data * 2), 100);
    };

    const mixedSequence = sequence([fastAsync, slowAsync]);

    mixedSequence((error, data) => {
      expect(error).toBeNull();
      expect(data).toBe(4); // (1 + 1) * 2
      done();
    }, 1);

    jest.advanceTimersByTime(200);
  });

  it('should handle string data transformation', (done) => {
    const asyncToUpper = (callback: any, str: string) => {
      setTimeout(() => callback(null, str.toUpperCase()), 50);
    };

    const asyncAddExclamation = (callback: any, str: string) => {
      setTimeout(() => callback(null, str + '!'), 50);
    };

    const stringSequence = sequence([asyncToUpper, asyncAddExclamation]);

    stringSequence((error, data) => {
      expect(error).toBeNull();
      expect(data).toBe('HELLO!');
      done();
    }, 'hello');

    jest.advanceTimersByTime(100);
  });

  it('should handle error in first function', (done) => {
    const asyncFail = (callback: any, data: any) => {
      setTimeout(() => callback(new Error('First error')), 50);
    };

    const asyncNeverCalled = jest.fn((callback: any, data: any) => {
      setTimeout(() => callback(null, data), 100);
    });

    const failingSequence = sequence([asyncFail, asyncNeverCalled]);

    failingSequence((error, data) => {
      expect(error.message).toBe('First error');
      expect(data).toBeUndefined();
      expect(asyncNeverCalled).not.toHaveBeenCalled();
      done();
    }, 'test');

    jest.advanceTimersByTime(100);
  });
});
```


