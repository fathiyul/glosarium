---
title: "Graph"
summary: "Nodes connected by edges; models networks, dependencies and maps."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["graph data structure", "network"]
prereqs: ["tree-traversal"]
related: ["adjacency-list", "directed-acyclic-graph", "tree-traversal", "big-o-notation"]
---

A graph is a set of nodes, called vertices, and a set of edges that connect pairs of them. Edges can be directed or undirected, and weighted or unweighted. Graphs model road networks, social connections, dependency chains and many other relationships, and a tree is a special kind of graph with no cycles.

A breadth-first search walks a graph level by level, starting from one vertex:

```python
from collections import deque

def bfs(graph, start):
    seen = {start}
    order = []
    queue = deque([start])
    while queue:
        node = queue.popleft()
        order.append(node)
        for neighbour in graph[node]:
            if neighbour not in seen:
                seen.add(neighbour)
                queue.append(neighbour)
    return order

bfs({"a": ["b", "c"], "b": ["c"], "c": []}, "a")   # ['a', 'b', 'c']
```

The `seen` set stops the search from looping around cycles. With an adjacency list, BFS and DFS both run in O(V + E) time.

The trade-off is that a graph is more general than the problem usually needs. Many relationships that look like graphs are trees or simple lists, and a graph's flexibility costs in storage and in the algorithms needed to answer questions about it. Shortest paths in weighted graphs need algorithms such as Dijkstra's, which are more involved.

The classic mistake is forgetting to track visited vertices, so a search runs forever on a graph with a cycle. The second is choosing a representation without thinking about density. See [adjacency lists and matrices](/t/adjacency-list) for the storage trade-off, and [directed acyclic graphs](/t/directed-acyclic-graph) for the special case that dependency systems use.
