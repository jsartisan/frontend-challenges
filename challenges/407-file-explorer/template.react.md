```js data.js 
export const fileSystem = {
  type: "folder",
  name: "root",
  children: [
    {
      type: "folder",
      name: "Documents",
      children: [
        { type: "file", name: "resume.pdf" },
        { type: "file", name: "cover-letter.docx" }
      ]
    },
    {
      type: "folder",
      name: "Pictures",
      children: [
        { type: "file", name: "photo1.jpg" },
        { type: "file", name: "photo2.png" }
      ]
    },
    {
      type: "file",
      name: "notes.txt"
    }
  ]
};
```

```jsx App.jsx 
import { useState } from "react";
import { fileSystem } from "./data";

function Breadcrumb({ path, onNavigate }) {
  return (
    <div className="breadcrumb">
      <span onClick={() => onNavigate([])}>Home</span>
      {path.map((folder, index) => (
        <span key={index} onClick={() => onNavigate(path.slice(0, index + 1))}>
          {" / "}{folder}
        </span>
      ))}
    </div>
  );
}

function Explorer({ folder, onOpenFolder }) {
  return (
    <div className="explorer">
      {folder.children?.map((item, idx) => (
        <div
          key={idx}
          className="tile"
          onClick={() => item.type === "folder" && onOpenFolder(item.name)}
        >
          <strong>{item.type === "folder" ? "📁" : "📄"}</strong>
          <p>{item.name}</p>
        </div>
      ))}
    </div>
  );
}

function findFolder(root, path) {
  let current = root;
  for (const name of path) {
    current = current.children.find(
      (child) => child.type === "folder" && child.name === name
    );
  }
  return current;
}

export default function App() {
  const [path, setPath] = useState([]);

  const currentFolder = findFolder(fileSystem, path);

  const handleOpenFolder = (folderName) => {
    setPath([...path, folderName]);
  };

  const handleNavigate = (newPath) => {
    setPath(newPath);
  };

  return (
    <div className="app">
      <h1>File Explorer</h1>
      <Breadcrumb path={path} onNavigate={handleNavigate} />
      <Explorer folder={currentFolder} onOpenFolder={handleOpenFolder} />
    </div>
  );
}
```


