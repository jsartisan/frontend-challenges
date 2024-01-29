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

const useClickOutside = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref, callback]);
};

export default useClickOutside;
```
