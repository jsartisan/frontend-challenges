You have a form with a checkbox and a conditionally rendered input based on the state of the checkbox.  
The input should collect either your **company tax ID** or your **personal tax ID**.  

When checking or unchecking the checkbox, the input should switch between the personal and company fields.  
If you type something in the input and then toggle the checkbox, the value should be **cleared** (since a new input is being rendered).  

However, in the following code, this does **not** happen.  

What would you change to fix this behavior?
