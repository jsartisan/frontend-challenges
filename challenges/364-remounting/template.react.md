```css styles.css
.block {
  padding: 1rem;
  border-radius: 10px;
  margin: 1rem 0;
}

.block.active {
  background: yellow;
}
```

```jsx App.jsx
import { useState } from "react";

export default function App() {
  const [text, setText] = useState("");

  const ComponentWithState = () => {
    const [isActive, setIsActive] = useState(false);

    return (
      <div className={`block ${isActive ? "active" : ""}`}>
        <button onClick={() => setIsActive(!isActive)}>click to highlight</button>
      </div>
    );
  };

  return (
    <div>
      <input type="text" className="input" value={text} onChange={(e) => setText(e.target.value)} />
      <ComponentWithState />
    </div>
  );
}
```

```jsx index.jsx
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";

import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```
