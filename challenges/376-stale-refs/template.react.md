```jsx App.jsx active
import { useState, useRef } from "react";

export default function App() {
  const [value, setValue] = useState();

  const ref = useRef(() => {
    console.log("Submitted value:" + value);
  });

  return (
    <>
      <input onChange={(e) => setValue(e.target.value)} />
      <button onClick={ref.current}>Submit</button>
    </>
  );
}
```
