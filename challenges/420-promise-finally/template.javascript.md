```js index.js 
/**
 * Polyfill for Promise.prototype.finally
 */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    // TODO: Implement polyfill
  };
}
```

```js index.test.js 
import './index';

describe('Promise.prototype.finally polyfill', () => {
  it('calls finally after resolve', async () => {
    const calls = [];
    const result = await Promise.resolve(10).finally(() => calls.push('done'));
    expect(result).toBe(10);
    expect(calls).toEqual(['done']);
  });

  it('calls finally after reject', async () => {
    const calls = [];
    try {
      await Promise.reject('fail').finally(() => calls.push('cleanup'));
    } catch (err) {
      expect(err).toBe('fail');
    }
    expect(calls).toEqual(['cleanup']);
  });

  it('waits for async callback in finally before continuing', async () => {
    const calls = [];
    const result = await Promise.resolve('ok').finally(
      () => new Promise(res => setTimeout(() => {
        calls.push('async');
        res();
      }, 10))
    );
    expect(result).toBe('ok');
    expect(calls).toEqual(['async']);
  });
});
```


