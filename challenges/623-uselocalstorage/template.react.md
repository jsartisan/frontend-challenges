```jsx App.jsx 
import { useLocalStorage } from "./useLocalStorage";

export default function App() {
  const [name, setName, clearName] = useLocalStorage("name", "");
  const [visits, setVisits] = useLocalStorage("visits", 0);
  const [tags, setTags] = useLocalStorage("tags", () => ["react"]);

  return (
    <div>
      <label>
        Your name:{" "}
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>{" "}
      <button onClick={clearName}>Forget me</button>

      <p>Hello {name || "stranger"}!</p>

      <p>Button clicks (saved across reloads): {visits}</p>
      <button onClick={() => setVisits((v) => v + 1)}>+1</button>{" "}
      <button
        onClick={() => {
          setVisits((v) => v + 1);
          setVisits((v) => v + 1);
        }}
      >
        +2
      </button>

      <p>Tags: {tags.join(", ")}</p>
      <button onClick={() => setTags((t) => [...t, `tag-${t.length + 1}`])}>
        Add tag
      </button>
    </div>
  );
}
```

```js useLocalStorage.js active
export function useLocalStorage(key, initialValue) {

}
```


