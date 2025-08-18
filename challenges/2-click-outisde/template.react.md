```js App.jsx
import { useRef } from "react";
import useClickOutside from "./useClickOutside";

function App() {
  const ref = useRef(null);

  useClickOutside(ref, () => {
    alert("clicked outside");
  });

  return (
    <div ref={ref}>
      <h1>Click outside React</h1>
    </div>
  );
}

export default App;
```

```js useClickOutside.js active
import { useEffect } from "react";

const useClickOutside = (ref, callback) => {};

export default useClickOutside;
```
