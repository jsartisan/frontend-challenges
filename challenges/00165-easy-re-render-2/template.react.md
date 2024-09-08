```jsx App.jsx
import { useState } from "react";
import SlowComponent from "./SlowComponent";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <SlowComponent />
      <button onClick={() => setIsOpen(true)}>Open Dialog</button>
      {isOpen && (
        <dialog open={isOpen}>
          <button onClick={() => setIsOpen(false)}>Close Dialog</button>
        </dialog>
      )}
    </>
  );
};

export default App;
```

```jsx SlowComponent.jsx
import React from "react";

const SlowComponent = () => {
   const fibonacci = (n) => {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  };

  const number = 35; 
  const result = fibonacci(number);

  return (
    <div>
      <h1>Fibonacci of {number} is: {result}</h1>
    </div>
  );
};

export default SlowComponent;
```


