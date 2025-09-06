```ts index.ts 
type Executor<T> = (
  resolve: (value: T | MyPromise<T>) => void,
  reject: (reason?: any) => void,
) => void;

type State = 'pending' | 'fulfilled' | 'rejected';

export class MyPromise<T = any> {
  private state: State = 'pending';
  private value: any;
  private handlers: {
    onFulfilled?: (value: any) => any;
    onRejected?: (reason: any) => any;
    resolve: (value: any) => void;
    reject: (reason: any) => void;
  }[] = [];

  constructor(executor: Executor<T>) {
    // TODO: Implement executor with resolve/reject and state transition
  }

  then<TResult = any>(
    onFulfilled?: (value: T) => TResult | MyPromise<TResult>,
    onRejected?: (reason: any) => TResult | MyPromise<TResult>,
  ): MyPromise<TResult> {
    // TODO: Implement chaining logic
    return new MyPromise<TResult>(() => {});
  }

  catch<TResult = any>(
    onRejected?: (reason: any) => TResult | MyPromise<TResult>,
  ): MyPromise<TResult> {
    // TODO: Implement catch via then
    return new MyPromise<TResult>(() => {});
  }

  finally(onFinally?: () => void): MyPromise<T> {
    // TODO: Implement finally behaviour
    return new MyPromise<T>(() => {});
  }
}
```

```ts index.test.ts 
import { MyPromise } from './index';

describe('MyPromise', () => {
  it('resolves a value', async () => {
    const result = await new MyPromise<number>((resolve) => resolve(5));
    expect(result).toBe(5);
  });

  it('rejects a value', async () => {
    expect.assertions(1);
    try {
      await new MyPromise((_, reject) => reject('error'));
    } catch (err) {
      expect(err).toBe('error');
    }
  });

  it('chains then calls', async () => {
    const result = await new MyPromise<number>((resolve) => resolve(2))
      .then((x) => x * 3)
      .then((x) => x + 4);

    expect(result).toBe(10);
  });

  it('catches rejection', async () => {
    const result = await new MyPromise((_, reject) => reject('fail'))
      .catch((err) => `caught: ${err}`);

    expect(result).toBe('caught: fail');
  });

  it('executes finally on resolve', async () => {
    let flag = false;
    const result = await new MyPromise<number>((resolve) => resolve(10)).finally(() => {
      flag = true;
    });

    expect(flag).toBe(true);
    expect(result).toBe(10);
  });

  it('executes finally on reject', async () => {
    let flag = false;
    expect.assertions(2);
    try {
      await new MyPromise((_, reject) => reject('oops')).finally(() => {
        flag = true;
      });
    } catch (err) {
      expect(flag).toBe(true);
      expect(err).toBe('oops');
    }
  });
});
```


