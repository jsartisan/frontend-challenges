```js App.tsx
import React, { useState, useEffect } from 'react';

const App: React.FC = () => {
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
     document.documentElement.dir = checked ? "rtl" : "ltr";
  }, [checked]);
  
  return (
    <main className="wrapper">
      <label>
        RTL <input type="checkbox" checked={checked} onChange={e => setChecked(e.target.checked)} />
      </label>
      <button>
        <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
          <path d="M19 21H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9a1 1 0 0 1-1 1Zm-6-2h5V9.158l-6-5.455-6 5.455V19h5v-6h2v6Z" />
        </svg>
        Home
      </button>
    </main>
  );
};

export default App;
```

```css styles.css active
body {
  font-family: sans-serif;
}

main {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  align-items: center;
}

button {
  display: flex;
  align-items: center;
  appearance: none;
  background-color: #2ea44f;
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, 0.1) 0 1px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  line-height: 20px;
  padding: 6px 14px;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
}

.icon {
  height: 1.2em;
  margin-right: 0.5em;
}
```