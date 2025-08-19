<!--info-header-start--><h1>useReducer <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23react-999" alt="#react"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/385-usereducer" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

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


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,385,undefined&title=385%20-%20useReducer%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A385+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->