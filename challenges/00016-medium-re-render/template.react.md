```jsx App.jsx active
import { useState } from 'react';

import { Button } from './components/button';
import { ModalDialog } from './components/basic-modal-dialog';
import { VerySlowComponent } from './components/very-slow-component';
import { BunchOfStuff, OtherStuffAlsoComplicated } from './components/mocks';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open dialog</Button>
      {isOpen ? <ModalDialog onClose={() => setIsOpen(false)} /> : null}
      <VerySlowComponent />
      <BunchOfStuff />
      <OtherStuffAlsoComplicated />
    </>
  );
}
```

```jsx components/basic-modal-dialog.jsx hidden
import { Button } from './button';

export const ModalDialog = ({ onClose }) => {
  return (
    <div className="modal-dialog">
      <div className="content">modal content</div>
      <div className="footer">
        <Button onClick={onClose}>close dialog</Button>
      </div>
    </div>
  );
};
```

```jsx components/button.jsx hidden

export const Button = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
};
```

```jsx components/mocks.jsx hidden
export const BunchOfStuff = () => <div className="bunch-of-stuff">Bunch of stuff</div>;
export const OtherStuffAlsoComplicated = () => <div>Other stuff</div>;
```

```jsx components/very-slow-component.jsx
const wait = (ms) => {
  const start = Date.now();
  let now = start;

  while (now - start < ms) now = Date.now();
};

export const VerySlowComponent = () => {
  wait(500);
  return null;
};

export const AnotherVerySlowComponent = () => {
  wait(500);
  return null;
};
```

```scss styles.scss hidden
.bunch-of-stuff {
  background: lightblue;
  border: 1px solid rgba(blue, 0.3);
  padding: 1rem;
  margin: 1rem 0;
  min-height: 10rem;
}
```

```scss global.scss hidden
* {
  font-family: sans-serif;
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 1rem;
  font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-size: 1;
}

h1, h2, h3, h4, h5, h6 {
  margin: 1rem 0;
}

/* Headings */
h1 {
  font-size: 2rem;
  line-height: 2.5rem;
  margin: 0 0 2rem 0;
  padding: 0 0 1rem 0;
  border-bottom: 1px solid black;
}

h2 {
  font-size: 1.8rem;
  line-height: 2.3rem;
  margin: 3rem 0 1rem 0;
}

h3 {
  font-size: 1.6rem;
  line-height: 2.2rem;
  margin: 2rem 0 1rem 0;
}

h3 {
  font-size: 1.4rem;
  line-height: 2rem;
  margin: 1rem 0 1rem 0;
}

.button {
  padding: 0.5rem;
  background: rgba(grey, 0.2);
  border:1px solid grey;
  font-size: 1rem;
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: rgba(grey, 0.3)
  }

  &.secondary {
    background: rgba(lightgrey, 0.3);
    border: 1px solid lightgrey;

    &:hover {
      background: rgba(lightgrey, 0.1)
    }
  }

  &.dark {
    background: darkgray;
    border:1px solid gray;

    &:hover {
      background: rgba(grey, 0.9)
    }
  }
}

.modal-dialog {
  position: fixed;
  top: 30px;
  left: 50%;
  margin-left: -15rem;
  width: 30rem;
  background: white;
  border:1px solid rgba(grey,0.5);
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.1);

  .content {
    padding: 2rem 1rem;
  }

  .footer {
    padding: 1rem;
    background: rgba(lightgrey, 0.2);
    border-top:1px solid gray;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
}

input[type="text"] {
  padding: 0.5rem 1rem;
  margin: 0.5rem 0;
  border-radius: 5px;
  border: 1px solid rgba(grey,0.5);
  width: 100%;
}
```

```json sandbox.config.json hidden
{
  "infiniteLoopProtection": false,
  "hardReloadOnChange": false,
  "view": "browser"
}
```

```jsx index.jsx hidden
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import './styles.scss';
import './global.scss';

import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

```css styles.css hidden
```