Implement a React component for a classic **3×3 Tic Tac Toe** game.

## Requirements

1. Render a **3×3 grid** of clickable squares.
2. Two players take turns: **“X”** goes first, then **“O”**.
3. A move places the current player’s mark in an **empty** square only.
4. Detect and display **winner** (3 in a row/column/diagonal) or **draw** when the board is full.
5. **Disable further moves** after a win or draw.
6. Provide a **Reset** button to start a new game.
7. Use React hooks (`useState`, `useEffect`) to manage state.

## Bonus

* Show a **turn indicator** (“X’s turn” / “O’s turn”).
* Add a **scoreboard** that persists within the session (wins for X, O, and draws).
* Implement **time travel**: a move history you can step through to view/restore previous board states.
