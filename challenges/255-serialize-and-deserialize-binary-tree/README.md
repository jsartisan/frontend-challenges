<!--info-header-start--><h1>Serialize and Deserialize Binary Tree <img src="https://img.shields.io/badge/-hard-de3d37" alt="hard"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/> <img src="https://img.shields.io/badge/-%23binary--tree-999" alt="#binary-tree"/> <img src="https://img.shields.io/badge/-%23serialization-999" alt="#serialization"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/255-serialize-and-deserialize-binary-tree" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Design an algorithm to serialize and deserialize a binary tree.

Serialization converts a tree into a string format that can be:

- Stored in a file
- Transmitted over a network
- Later reconstructed into the original tree structure

You can choose any serialization format, as long as your methods can:

- Convert any binary tree to a string (serialize)
- Reconstruct the exact same tree from that string (deserialize)

**Constraints:**

- 0 ≤ Number of nodes ≤ 1000
- -1000 ≤ Node values ≤ 1000

**Examples:**

```typescript
// Example 1:
//     1
//    / \
//   2   3
//      / \
//     4   5
const root1 = createTree([1, 2, 3, null, null, 4, 5]);
const codec = new Codec();
const serialized = codec.serialize(root1);
const deserialized = codec.deserialize(serialized);
console.log(treeToArray(deserialized));
// Output: [1, 2, 3, null, null, 4, 5]

// Example 2:
const root2 = createTree([]);
const serialized2 = codec.serialize(root2);
const deserialized2 = codec.deserialize(serialized2);
console.log(treeToArray(deserialized2));
// Output: []
```

<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,255,undefined&title=255%20-%20Serialize%20and%20Deserialize%20Binary%20Tree%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A255+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->
