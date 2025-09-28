```js index.js 
export function parallel(asyncFuncs) {
  // TODO: Implement me
}
```

```js index.test.js 
import { parallel } from './index';

describe('parallel', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('should execute all async functions in parallel', (done) => {
    const async1 = (callback) => {
      setTimeout(() => callback(null, 1), 100);
    };

    const async2 = (callback) => {
      setTimeout(() => callback(null, 2), 50);
    };

    const async3 = (callback) => {
      setTimeout(() => callback(null, 3), 150);
    };

    const all = parallel([async1, async2, async3]);

    all((error, data) => {
      expect(error).toBeNull();
      expect(data).toEqual([1, 2, 3]);
      done();
    });

    jest.advanceTimersByTime(200);
  });

  it('should handle empty array', (done) => {
    const emptyParallel = parallel([]);

    emptyParallel((error, data) => {
      expect(error).toBeNull();
      expect(data).toEqual([]);
      done();
    });
  });

  it('should handle single async function', (done) => {
    const asyncSingle = (callback) => {
      setTimeout(() => callback(null, 'single'), 100);
    };

    const singleParallel = parallel([asyncSingle]);

    singleParallel((error, data) => {
      expect(error).toBeNull();
      expect(data).toEqual(['single']);
      done();
    }, 'initial');

    jest.advanceTimersByTime(100);
  });

  it('should return first error and ignore subsequent results', (done) => {
    const async1 = (callback) => {
      setTimeout(() => callback(null, 1), 100);
    };

    const asyncFail = (callback) => {
      setTimeout(() => callback(new Error('First error')), 50);
    };

    const asyncNeverCalled = jest.fn((callback) => {
      setTimeout(() => callback(new Error('Second error')), 75);
    });

    const parallelWithError = parallel([async1, asyncFail, asyncNeverCalled]);

    parallelWithError((error, data) => {
      expect(error.message).toBe('First error');
      expect(data).toBeUndefined();
      expect(asyncNeverCalled).toHaveBeenCalled();
      done();
    });

    jest.advanceTimersByTime(200);
  });

  it('should handle functions with different completion times', (done) => {
    const fastAsync = (callback) => {
      setTimeout(() => callback(null, 'fast'), 10);
    };

    const slowAsync = (callback) => {
      setTimeout(() => callback(null, 'slow'), 200);
    };

    const mediumAsync = (callback) => {
      setTimeout(() => callback(null, 'medium'), 100);
    };

    const mixedParallel = parallel([fastAsync, slowAsync, mediumAsync]);

    mixedParallel((error, data) => {
      expect(error).toBeNull();
      expect(data).toEqual(['fast', 'slow', 'medium']);
      done();
    });

    jest.advanceTimersByTime(250);
  });

  it('should handle functions with same completion time', (done) => {
    const async1 = (callback) => {
      setTimeout(() => callback(null, 1), 100);
    };

    const async2 = (callback) => {
      setTimeout(() => callback(null, 2), 100);
    };

    const async3 = (callback) => {
      setTimeout(() => callback(null, 3), 100);
    };

    const sameTimeParallel = parallel([async1, async2, async3]);

    sameTimeParallel((error, data) => {
      expect(error).toBeNull();
      expect(data).toEqual([1, 2, 3]);
      done();
    });

    jest.advanceTimersByTime(150);
  });

  it('should handle string and number results', (done) => {
    const asyncString = (callback) => {
      setTimeout(() => callback(null, 'hello'), 50);
    };

    const asyncNumber = (callback) => {
      setTimeout(() => callback(null, 42), 100);
    };

    const asyncBoolean = (callback) => {
      setTimeout(() => callback(null, true), 75);
    };

    const mixedTypesParallel = parallel([asyncString, asyncNumber, asyncBoolean]);

    mixedTypesParallel((error, data) => {
      expect(error).toBeNull();
      expect(data).toEqual(['hello', 42, true]);
      done();
    });

    jest.advanceTimersByTime(150);
  });

  it('should handle error in first function', (done) => {
    const asyncFail = (callback) => {
      setTimeout(() => callback(new Error('Immediate error')), 10);
    };

    const asyncSuccess = (callback) => {
      setTimeout(() => callback(null, 'success'), 50);
    };

    const immediateErrorParallel = parallel([asyncFail, asyncSuccess]);

    immediateErrorParallel((error, data) => {
      expect(error.message).toBe('Immediate error');
      expect(data).toBeUndefined();
      done();
    });

    jest.advanceTimersByTime(100);
  });

  it('should handle all functions failing', (done) => {
    const asyncFail1 = (callback) => {
      setTimeout(() => callback(new Error('Error 1')), 100);
    };

    const asyncFail2 = (callback) => {
      setTimeout(() => callback(new Error('Error 2')), 50);
    };

    const asyncFail3 = (callback) => {
      setTimeout(() => callback(new Error('Error 3')), 75);
    };

    const allFailParallel = parallel([asyncFail1, asyncFail2, asyncFail3]);

    allFailParallel((error, data) => {
      expect(error.message).toBe('Error 2'); // First error chronologically
      expect(data).toBeUndefined();
      done();
    });

    jest.advanceTimersByTime(150);
  });
});
```


