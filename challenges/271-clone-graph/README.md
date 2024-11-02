Given a reference to a node in a connected undirected graph, create and return a deep copy of the graph.

Each node contains:
- An integer value
- A list of its neighbors

Graph properties:
- Node values are from 1 to n (where n is number of nodes)
- No duplicate edges
- No self-loops
- Input node is always node 1 (if graph is not empty)

**Constraints:**
- 0 ≤ Number of nodes ≤ 100
- 1 ≤ Node values ≤ 100

**Examples:**
```typescript
// Example 1:
// Graph: 1 -- 2 -- 3
//            |
//            3
const adjList1 = [[2], [1,3], [2]];
console.log(cloneGraph(createGraph(adjList1)));
// Output: [[2], [1,3], [2]]
// Explanation: 3 nodes where:
// Node 1 connects to 2
// Node 2 connects to 1 and 3
// Node 3 connects to 2

// Example 2:
const adjList2 = [[]];
console.log(cloneGraph(createGraph(adjList2)));
// Output: [[]]
// Explanation: Single node with no neighbors

// Example 3:
const adjList3 = [];
console.log(cloneGraph(createGraph(adjList3)));
// Output: []
// Explanation: Empty graph
```
