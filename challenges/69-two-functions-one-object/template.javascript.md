```js index.js
export function A() {
   // your code here
}

export function B() {
   // your code here
}
```

```js index.test.js
import { A, B } from './index';

describe('Constructor Functions A and B', () => {
  test('new A() should equal new B()', () => {
    let a = new A();
    let b = new B();

    expect(a).toBe(b);
  });
});
```


