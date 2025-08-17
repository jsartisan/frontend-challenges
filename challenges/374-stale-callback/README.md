We have a simple input and button. The onClick handler of the button is wrapped with useCallback with empty dependencies. Though we are updating state of value on every keystroke, click on the button shows undefined value in the console. Why?
What can we do to fix it?
