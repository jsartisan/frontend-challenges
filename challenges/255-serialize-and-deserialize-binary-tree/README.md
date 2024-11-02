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
