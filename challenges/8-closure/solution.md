The answer is `3 3 3` and `0 1 2`

### Explaination
Due to the event queue mechanism in JavaScript, the setTimeout callback function is executed after the loop completes its iterations. In the first loop, the variable i was declared with the var keyword, making it global in scope. Consequently, as the loop iterated and incremented `i` using the unary operator ++, the value of `i` became 3 by the time the setTimeout callback function was called.

In contrast, the second loop declared the variable i with the let keyword. Variables declared with let (and const) are block-scoped, meaning their scope is limited to the block in which they are defined (a block is delineated by {}). Therefore, with each iteration of the loop, `i` obtains a new value, and each value is confined within the loop's scope.
