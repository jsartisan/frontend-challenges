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

export function useHover() {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const onMouseEnter = useCallback(() => setHovered(true), []);
  const onMouseLeave = useCallback(() => setHovered(false), []);

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("mouseenter", onMouseEnter);
      ref.current.addEventListener("mouseleave", onMouseLeave);

      return () => {
        ref.current?.removeEventListener("mouseenter", onMouseEnter);
        ref.current?.removeEventListener("mouseleave", onMouseLeave);
      };
    }

    return undefined;
  }, []);

  return { ref, hovered };
}
```
