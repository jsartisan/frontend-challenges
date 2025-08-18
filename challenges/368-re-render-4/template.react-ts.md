```css styles.css
.three-layout {
  display: flex;
  gap: 1rem;

  .left {
    flex: 0 0 20%;
    background: lightblue;
    border: 1px solid rgba(blue, 0.3);
    min-height: 30rem;
  }

  .middle {
    flex: 0 0 50%;
    min-height: 30rem;
  }

  .right {
    flex: 0 0 30%;
    background: lightsalmon;
    border-left: 1px solid salmon;
    min-height: 30rem;
  }
}
```

```tsx App.tsx active
import React, { ReactNode, useState } from "react";

import { AnotherVerySlowComponent, VerySlowComponent } from "./very-slow-component";
import "./styles.css";

const AdjustableColumnsBlock = ({ isNavExpanded }: { isNavExpanded: boolean }) => {
  return isNavExpanded ? <div>two block items here</div> : <div>three block items here</div>;
};

const MainPart = ({ isNavExpanded }: { isNavExpanded: boolean }) => {
  return (
    <>
      <VerySlowComponent />
      <AnotherVerySlowComponent />
      <AdjustableColumnsBlock isNavExpanded={isNavExpanded} />
    </>
  );
};

type ExpandProps = { isNavExpanded: boolean; toggleNav: () => void };
const ExpandButton = ({ isNavExpanded, toggleNav }: ExpandProps) => (
  <button onClick={toggleNav}>{isNavExpanded ? "collapse <" : "expand >"}</button>
);

const Sidebar = ({ isNavExpanded, toggleNav }: ExpandProps) => {
  return (
    <div className="left" style={{ flexBasis: isNavExpanded ? "50%" : "20%" }}>
      {/* this one will control the expand/collapse */}
      <ExpandButton isNavExpanded={isNavExpanded} toggleNav={toggleNav} />

      <ul>
        <li>
          <a href="#">some links</a>
        </li>
      </ul>
    </div>
  );
};

const Layout = ({ children }: { children: ReactNode }) => <div className="three-layout">{children}</div>;

const Page = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
    <Layout>
      <Sidebar isNavExpanded={isNavExpanded} toggleNav={() => setIsNavExpanded(!isNavExpanded)} />
      <MainPart isNavExpanded={isNavExpanded} />
    </Layout>
  );
};

export default function App() {
  return (
    <>
      <h3>Very slow "Page" component - click on expand/collapse to toggle nav</h3>
      <p>everything re-renders on every toggle</p>
      <Page />
    </>
  );
}
```

```tsx very-slow-component.tsx
const wait = (ms: number) => {
  const start = Date.now();
  let now = start;

  while (now - start < ms) now = Date.now();
};

export const VerySlowComponent = () => {
  wait(400);
  return null;
};

export const AnotherVerySlowComponent = () => {
  wait(400);
  return null;
};
```

```json sandbox.config.json
{
  "infiniteLoopProtection": false,
  "hardReloadOnChange": false,
  "view": "browser"
}
```
