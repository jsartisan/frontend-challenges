<!--info-header-start--><h1>Count Connected Components <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/> <img src="https://img.shields.io/badge/-%23graph-999" alt="#graph"/> <img src="https://img.shields.io/badge/-%23union--find-999" alt="#union-find"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/279-count-connected-components" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

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


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,279,undefined&title=279%20-%20Count%20Connected%20Components%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A279+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->