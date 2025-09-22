```js index.js 
/**
 * Creates a debounced version of fn.
 * @param {Function} fn
 * @param {number} wait - milliseconds
 * @param {{leading?: boolean, trailing?: boolean}} [options]
 * @returns {Function & {cancel(): void}}
 */
export function debounce(fn, wait, options = {}) {
  // TODO: Implement me
}
```

```js index.test.js 
import { debounce } from './index';

function wait(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

describe('debounce with leading & trailing (JS)', () => {
  it('default behaviour is trailing only', async () => {
    const spy = jest.fn();
    const d = debounce(spy, 100);

    d(); d(); d();
    await wait(99);
    expect(spy).toBeCalledTimes(0);
    await wait(1);
    expect(spy).toBeCalledTimes(1);
  });

  it('leading true fires immediately', async () => {
    const spy = jest.fn();
    const d = debounce(spy, 100, { leading: true, trailing: false });
    d();
    expect(spy).toBeCalledTimes(1);
    d(); d();
    await wait(100);
    expect(spy).toBeCalledTimes(1);
  });

  it('leading + trailing both true', async () => {
    const spy = jest.fn();
    const d = debounce(spy, 100, { leading: true, trailing: true });
    d(); // leading
    await wait(50);
    d(); // schedule trailing
    await wait(100);
    expect(spy).toBeCalledTimes(2);
  });

  it('leading false, trailing false does nothing', async () => {
    const spy = jest.fn();
    const d = debounce(spy, 100, { leading: false, trailing: false });
    d(); d();
    await wait(200);
    expect(spy).toBeCalledTimes(0);
  });

  it('cancel prevents trailing call', async () => {
    const spy = jest.fn();
    const d = debounce(spy, 100, { leading: false, trailing: true });
    d();
    d.cancel();
    await wait(100);
    expect(spy).toBeCalledTimes(0);
  });
});
```

