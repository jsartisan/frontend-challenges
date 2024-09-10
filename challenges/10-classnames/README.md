<!--info-header-start--><h1>classNames <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/10-classnames" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

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


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,10,undefined&title=10%20-%20classNames%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A10+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->