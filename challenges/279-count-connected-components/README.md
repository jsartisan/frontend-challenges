Given an undirected graph with:
- `n` nodes (labeled from 0 to n-1)
- `edges` array where edges[i] = [a, b] represents an edge between nodes a and b

Return the number of connected components in the graph.

A connected component is a group of nodes where:
- Any node can reach any other node in the same component
- No node can reach nodes in different components

**Constraints:**
- 1 ≤ n ≤ 100
- 0 ≤ edges.length ≤ n * (n-1) / 2
- No duplicate edges
- Edges are undirected

**Examples:**
```typescript
// Example 1:
const n1 = 3;
const edges1 = [[0,1], [0,2]];
console.log(countComponents(n1, edges1));
// Output: 1
// Explanation: All nodes are connected

// Example 2:
const n2 = 6;
const edges2 = [[0,1], [1,2], [2,3], [4,5]];
console.log(countComponents(n2, edges2));
// Output: 2
// Explanation: Nodes 0-1-2-3 form one component, 4-5 form another
```
