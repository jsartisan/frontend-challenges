```jsx App.jsx active
import React, { useState } from "react";
import { SlowButton } from "./SlowButton";

export default function App() {
  return <Form />;
}

const Form = () => {
  const [value, setValue] = useState("");
  
  const onClick = () => {
    console.log("Submitted value: " + value);
  }

  return (
    <>
      <input onChange={e => setValue(e.target.value)} value={value} />
      <SlowButton label="Submit" onClick={onClick} />
    </>
  );
}
```

```json sandbox.config.json 
{
  "infiniteLoopProtection": false,
  "hardReloadOnChange": false,
  "view": "browser"
}

```

```jsx SlowButton.jsx hidden
const wait = (ms) => {
  const start = Date.now();
  let now = start;

  while (now - start < ms) now = Date.now();
};

export const SlowButton = (props) => {
  const { label, onClick } = props;

  wait(100);

  return <button onClick={onClick}>{label}</button>;
}
```


