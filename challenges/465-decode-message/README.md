Given a 2-D matrix of single-character strings, traverse it in a "diagonal zig-zag to the right" pattern and return the collected characters as a string.

Traversal rules (starting at the top-left corner):

1. Begin moving **down-right** (`row + 1, col + 1`).
2. When you can no longer move down-right (hit last row or last column), switch direction to **up-right** (`row − 1, col + 1`).
3. When you can no longer move up-right, switch back to down-right.
4. Repeat steps 2–3 while at least one of the two moves is still possible.
5. Stop when you cannot move either down-right or up-right from your current cell.

The characters visited in order form the decoded message.

If no characters are collected (e.g. empty matrix), return an empty string.

### Example

Input matrix
```
I B C A L K A
D R F C A E A
G H O E L A D
```
Traversal path: `I → R → O → C → L → E → D`  
Output string: `IROCLED`
