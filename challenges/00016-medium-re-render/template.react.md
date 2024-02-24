```css styles.css hidden
html, body, #root {
  height: 100%;
}

body {
  font-family: sans-serif;
}

p {
  margin: 0;
}

main {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  padding-top: 5rem;
  height: 100%;
}


* {
  border: 1px solid green;
  animation: debug 1s forwards;
}

@keyframes debug {
  from {
    border-color: green;
  }
  to {
    border-color: transparent;
  }
}
```

```jsx App.jsx active
import Counter from './Counter';

import React from 'react';

export default function App() {
 return <Counter />;
}

```

```jsx index.jsx hidden
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

```jsx Counter.jsx
import React from 'react';

import Decoration from './Decoration';
import BigCountNumber from './BigCountNumber';

function Counter() {
  const [count, setCount] = React.useState(0);
  
  return (
    <main>
      <BigCountNumber count={count} />
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <Decoration  />
    </main>
  );
}

export default Counter;
```

```jsx Decoration.jsx
import React from 'react';

function Decoration() {
  return (
    <div className="decoration" key={Date.now()}>
      🚀
    </div>
  );
}

export default Decoration;
```

```jsx BigCountNumber.jsx
function BigCountNumber({ count }) {
  return (
    <p>
      <span className="prefix">Count:</span>
      {count}
    </p>
  );
}

export default BigCountNumber;
```


