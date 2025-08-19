<!--info-header-start--><h1>Can you describe the reconciliation process? <img src="https://img.shields.io/badge/-easy-7aad0c" alt="easy"/> <img src="https://img.shields.io/badge/-%23react-999" alt="#react"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/383-can-you-describe-the-reconciliation-process" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

**Reconciliation** is the algorithm React uses to figure out what _real_ DOM changes are needed after a component’s state or props change.

### 1. Triggering a re-render

Calling `setState` (or its Hook equivalent) makes React call the component function again, producing a new virtual-DOM tree in memory. No DOM work happens yet.

Consider the following code:

```jsx
import { useState } from "react";

export default function App() {
  const [showTextarea, setShowTextarea] = useState(false);
  return showTextarea ? <textarea /> : <input />;
}
```

### 2. Building “before” and “after” trees

After the first render React has a _previous_ virtual-DOM (Fiber) tree. When state changes it produces a _next_ tree, e.g.

**Before**

```json
{ "type": "input", "props": {} }
```

**After**

```json
{ "type": "textarea", "props": {} }
```

### 3. React’s reconciliation heuristics

1. **Same element type & key**  
   Reuse the existing DOM node and update its props and children.
2. **Different element type or key**  
   Unmount the old node (running cleanup effects), then create and mount a brand-new DOM node.

Because “input” and “textarea” are different types React chooses the second path: it removes the `<input>` and mounts a new `<textarea>`.

### 4. Lists and keys

For arrays of children React matches elements by their `key` prop first and then by index. Supplying stable keys (`id`, not `array.index`) prevents unwanted unmounts and preserves user input.

### 5. Why this matters

These simple rules give React an O(n) diffing algorithm, allowing large UIs to update quickly without a full page reload.

That entire decision-making process is called **reconciliation**.


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,383,undefined&title=383%20-%20Can%20you%20describe%20the%20reconciliation%20process%3F%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A383+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->