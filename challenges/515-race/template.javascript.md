```js index.js 
export function race(asyncFuncs) {
  // TODO: Implement me
}
```

```js index.test.js 
import { race } from './index';

describe('race', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('should return the first function to complete', (done) => {
    const async1 = (callback) => {
      setTimeout(() => callback(null, 1), 300);
    };

    const async2 = (callback) => {
      setTimeout(() => callback(null, 2), 100);
    };

    const async3 = (callback) => {
      setTimeout(() => callback(null, 3), 200);
    };

    const first = race([async1, async2, async3]);

    first((error, data) => {
      expect(error).toBeNull();
      expect(data).toBe(2); // async2 completes first
      done();
    });

    jest.advanceTimersByTime(150);
  });

  it('should handle empty array', (done) => {
    const emptyRace = race([]);

    emptyRace((error, data) => {
      expect(error).toBeNull();
      expect(data).toBeUndefined();
      done();
    });
  });

  it('should handle single async function', (done) => {
    const asyncSingle = (callback) => {
      setTimeout(() => callback(null, 'single'), 100);
    };

    const singleRace = race([asyncSingle]);

    singleRace((error, data) => {
      expect(error).toBeNull();
      expect(data).toBe('single');
      done();
    });

    jest.advanceTimersByTime(100);
  });

  it('should return first error and ignore subsequent results', (done) => {
    const async1 = (callback) => {
      setTimeout(() => callback(null, 1), 100);
    };

    const asyncFail = (callback) => {
      setTimeout(() => callback(new Error('First error')), 50);
    };

    const asyncSuccess = (callback) => {
      setTimeout(() => callback(null, 3), 75);
    };

    const raceWithError = race([async1, asyncFail, asyncSuccess]);

    raceWithError((error, data) => {
      expect(error.message).toBe('First error');
      expect(data).toBeUndefined();
      done();
    });

    jest.advanceTimersByTime(100);
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

    const sameTimeRace = race([async1, async2, async3]);

    sameTimeRace((error, data) => {
      expect(error).toBeNull();
      // Any of the three values could be returned
      expect([1, 2, 3]).toContain(data);
      done();
    });

    jest.advanceTimersByTime(150);
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

    const mixedRace = race([fastAsync, slowAsync, mediumAsync]);

    mixedRace((error, data) => {
      expect(error).toBeNull();
      expect(data).toBe('fast'); // Fastest completes first
      done();
    });

    jest.advanceTimersByTime(50);
  });

  it('should handle mixed data types', (done) => {
    const asyncString = (callback) => {
      setTimeout(() => callback(null, 'hello'), 50);
    };

    const asyncNumber = (callback) => {
      setTimeout(() => callback(null, 42), 100);
    };

    const asyncBoolean = (callback) => {
      setTimeout(() => callback(null, true), 150);
    };

    const mixedTypesRace = race([asyncString, asyncNumber, asyncBoolean]);

    mixedTypesRace((error, data) => {
      expect(error).toBeNull();
      expect(data).toBe('hello'); // String completes first
      done();
    });

    jest.advanceTimersByTime(100);
  });

  it('should handle immediate error', (done) => {
    const asyncFail = (callback) => {
      setTimeout(() => callback(new Error('Immediate error')), 10);
    };

    const asyncSuccess = (callback) => {
      setTimeout(() => callback(null, 'success'), 50);
    };

    const immediateErrorRace = race([asyncFail, asyncSuccess]);

    immediateErrorRace((error, data) => {
      expect(error.message).toBe('Immediate error');
      expect(data).toBeUndefined();
      done();
    });

    jest.advanceTimersByTime(100);
  });

  it('should ignore results from slower functions', (done) => {
    const fastAsync = jest.fn((callback) => {
      setTimeout(() => callback(null, 'fast'), 50);
    });

    const slowAsync = jest.fn((callback) => {
      setTimeout(() => callback(null, 'slow'), 200);
    });

    const raceTest = race([fastAsync, slowAsync]);

    raceTest((error, data) => {
      expect(error).toBeNull();
      expect(data).toBe('fast');
      // Verify that slow function was called but its result is ignored
      expect(fastAsync).toHaveBeenCalled();
      expect(slowAsync).toHaveBeenCalled();
      done();
    });

    jest.advanceTimersByTime(100);
  });
});
```


