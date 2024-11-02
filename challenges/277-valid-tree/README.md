<!--info-header-start--><h1>Valid Tree <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/> <img src="https://img.shields.io/badge/-%23graph-999" alt="#graph"/> <img src="https://img.shields.io/badge/-%23union--find-999" alt="#union-find"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/277-valid-tree" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

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


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,277,undefined&title=277%20-%20Valid%20Tree%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A277+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->