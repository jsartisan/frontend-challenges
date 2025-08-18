```jsx App.jsx
import React, { useState } from "react";
import { useDebounce } from "./useDebounce";

export default function App() {
  const [value, setValue] = useState();

  const onChange = (e) => {
    setValue(e.target.value);
    sendRequestToServer();
  };

  const sendRequestToServer = useDebounce(() => {
    console.log(value);
  });

  return (
    <>
      <p>The value of input is {value}</p>
      <input onChange={onChange} value={value} />
    </>
  );
}
```

```js useDebounce.js active
import { useMemo } from "react";
import { debounce } from "./debounce";

export function useDebounce(callback, delay) {}
```

```js debounce.js hidden
export function debounce(callback, delay) {
  let timer;

  return (...args) => {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      callback.call(this, ...args);
    }, delay);
  };
}
```
