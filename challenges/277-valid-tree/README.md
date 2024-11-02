Given `n` nodes (labeled from 0 to n-1) and a list of undirected edges, determine if these edges form a valid tree.

A valid tree must:
- Be connected (all nodes can be reached)
- Have no cycles
- Have exactly n-1 edges

**Constraints:**
- 1 ≤ n ≤ 100
- 0 ≤ edges.length ≤ n * (n-1) / 2
- No duplicate edges
- Edges are undirected ([0,1] is same as [1,0])

**Examples:**
```typescript
// Example 1:
const n1 = 5;
const edges1 = [[0,1], [0,2], [0,3], [1,4]];
console.log(validTree(n1, edges1));
// Output: true
// Explanation: Forms a valid tree with 4 edges and 5 nodes

// Example 2:
const n2 = 5;
const edges2 = [[0,1], [1,2], [2,3], [1,3], [1,4]];
console.log(validTree(n2, edges2));
// Output: false
// Explanation: Contains a cycle between nodes 1-2-3
```
