```js App.jsx
import { useHover } from "./useHover";

function App() {
  const { hovered, ref } = useHover();

  return <div ref={ref}>{hovered ? "I am hovered" : "Put mouse over me please"}</div>;
}

export default App;
```

```js useHover.js active
import { useCallback, useEffect, useRef, useState } from "react";

export function useHover() {}
```
