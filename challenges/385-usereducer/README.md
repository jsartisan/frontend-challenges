React provides the `useReducer` hook as an alternative to `useState` for managing complex state logic.

Your task is to **implement your own version of `useReducer` from scratch**.

### Requirements:

1. Create a custom hook called `useReducer` that:

   - Accepts a `reducer` function and an `initialState`.
   - Returns the current state and a `dispatch` function.
   - Updates the state when `dispatch` is called with an action.

2. The state update logic should follow the reducer pattern:

   ```ts
   (state, action) => newState;
   ```

3. Ensure that the component re-renders whenever the state changes.
4. Demonstrate your custom `useReducer` by using it in the given simple counter component with `increment`, `decrement`, and `reset` actions.
