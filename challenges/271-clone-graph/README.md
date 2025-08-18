<!--info-header-start--><h1>Clone Graph <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/> <img src="https://img.shields.io/badge/-%23graph-999" alt="#graph"/> <img src="https://img.shields.io/badge/-%23dfs-999" alt="#dfs"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/271-clone-graph" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

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
const adjList1 = [[2], [1, 3], [2]];
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

<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,271,undefined&title=271%20-%20Clone%20Graph%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A271+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->
