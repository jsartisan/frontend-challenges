```css styles.css 
body {
  font-family: sans-serif;
}

.game {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 20px;
  font-family: sans-serif;
}

.title {
  font-size: 24px;
  font-weight: bold;
}

.board {
  display: grid;
  grid-template-columns: repeat(3, 80px);
  grid-gap: 8px;
}

.square {
  width: 80px;
  height: 80px;
  font-size: 24px;
  font-weight: bold;
  border: 2px solid #444;
  background: white;
  cursor: pointer;
}

.square:disabled {
  cursor: not-allowed;
  background: #f0f0f0;
}

.status {
  font-size: 18px;
}

.reset {
  padding: 8px 16px;
  border: none;
  background: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.reset:hover {
  background: #0056b3;
}

```

```jsx App.jsx 
export default function App(){
  return (
    <div className="game">
      <h1 className="title">Tic Tac Toe</h1>

      <div className="board">
        {Array.from({ length: 9 }).map((_, index) => (
          <button
            key={index}
            className="square"
          >
          </button>
        ))}
      </div>

      <p className="status">Game Status</p>

      <button className="reset">
        Reset
      </button>
    </div>
  );
};
```


