In React, managing classNames dynamically can become cumbersome. While using the `className` prop allows adding classes to elements, it becomes verbose when class names are dynamically generated. To streamline this process, developers often turn to libraries like `classnames`.

Consider the following scenario:

```js
// Original usage
<p className={`classname1  ${condition ? 'classname2' : ''}`}>
  Frontend Challenges
</p>

// With classNames library
import classNames from 'classnames';

// Usage of classNames
classNames('class1', 'class2', class3); 
// 'class1 class2 class3'

classNames({ class1: [], class2: true, class3: 3 }); 
// 'class1 class2 class3'

classNames('class1', { class2: true, class3: false }); 
// 'class1 class2'
```

Your task is to implement your own version of `classNames()` function, which accepts arbitrary arguments, filters out falsy values, and generates the final className string. The function should handle various types of inputs, including strings, numbers, objects, and arrays. Ensure that object keys are kept if the key is a string and the corresponding value is truthy. Arrays should be flattened to accommodate nested structures.
