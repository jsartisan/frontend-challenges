```ts index.ts 
export class Node {
  val: number;
  neighbors: Node[];
  constructor(val?: number, neighbors?: Node[]) {
    this.val = (val === undefined ? 0 : val);
    this.neighbors = (neighbors === undefined ? [] : neighbors);
  }
}

export function cloneGraph(node: Node | null): Node | null {
  
}
```

```ts index.test.ts 
import { Node, cloneGraph } from './index';

describe('cloneGraph', () => {
  // Helper function to create graph from adjacency list
  function createGraph(adjList: number[][]): Node | null {
    if (!adjList.length) return null;
    
    const nodes: Node[] = adjList.map((_, i) => new Node(i + 1));
    
    adjList.forEach((neighbors, i) => {
      nodes[i].neighbors = neighbors.map(n => nodes[n - 1]);
    });
    
    return nodes[0];
  }

  // Helper function to convert graph to adjacency list
  function graphToAdjList(node: Node | null): number[][] {
    if (!node) return [];
    
    const visited = new Map<number, number[]>();
    
    function dfs(node: Node) {
      if (visited.has(node.val)) return;
      
      visited.set(node.val, node.neighbors.map(n => n.val));
      node.neighbors.forEach(dfs);
    }
    
    dfs(node);
    
    const result: number[][] = [];
    for (let i = 1; i <= visited.size; i++) {
      result.push(visited.get(i) || []);
    }
    
    return result;
  }

  test('Example 1: Three node graph', () => {
    const adjList = [[2], [1,3], [2]];
    const node = createGraph(adjList);
    const cloned = cloneGraph(node);
    expect(graphToAdjList(cloned)).toEqual(adjList);
    expect(cloned).not.toBe(node);
  });

  test('Example 2: Single isolated node', () => {
    const adjList = [[]];
    const node = createGraph(adjList);
    const cloned = cloneGraph(node);
    expect(graphToAdjList(cloned)).toEqual(adjList);
    expect(cloned).not.toBe(node);
  });

  test('Example 3: Empty graph', () => {
    const adjList: number[][] = [];
    const node = createGraph(adjList);
    const cloned = cloneGraph(node);
    expect(graphToAdjList(cloned)).toEqual(adjList);
  });

  test('Fully connected graph', () => {
    const adjList = [[2,3], [1,3], [1,2]];
    const node = createGraph(adjList);
    const cloned = cloneGraph(node);
    expect(graphToAdjList(cloned)).toEqual(adjList);
    expect(cloned).not.toBe(node);
  });

  test('Linear graph', () => {
    const adjList = [[2], [1,3], [2,4], [3]];
    const node = createGraph(adjList);
    const cloned = cloneGraph(node);
    expect(graphToAdjList(cloned)).toEqual(adjList);
    expect(cloned).not.toBe(node);
  });

  test('Circular graph', () => {
    const adjList = [[2], [3], [4], [1]];
    const node = createGraph(adjList);
    const cloned = cloneGraph(node);
    expect(graphToAdjList(cloned)).toEqual(adjList);
    expect(cloned).not.toBe(node);
  });
});
```


