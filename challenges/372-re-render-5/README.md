We have input and a button that on click console logs out the value of the input. Assume that this button is coming from an external library over which you have no control and this button is slow to render. and because of this, if you type in input, the re-renders are very slow. 

What would you do to fix this performance issue? 

The expectation is that typing in the input should be fast and on click of the button, we should see the correct value of input in console.
