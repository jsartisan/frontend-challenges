```jsx App.jsx 
import { useState, useCallback } from "react";

export default function App() {
  const [value, setValue] = useState();

  const onClick = useCallback(() => {
    console.log("Submitted value:" + value);
  }, [])

  return (
    <>
      <input onChange={e => setValue(e.target.value)} />
      <button onClick={onClick}>Submit</button>
    </>
  )
}

```


