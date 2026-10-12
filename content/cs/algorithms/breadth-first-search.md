---
title: "Breadth-First Search"
summary: "Exploring a graph level by level; finds shortest unweighted paths."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["BFS"]
prereqs: ["graph"]
related: ["depth-first-search", "graph", "adjacency-list", "dijkstra"]
---

Breadth-first search (BFS) explores a graph level by level: it visits every vertex one edge away from the start, then every vertex two edges away, and so on. Because it reaches each vertex by the fewest edges possible, BFS finds shortest paths in unweighted graphs.

```python
from collections import deque

def bfs_distances(graph, start):
    dist = {start: 0}
    queue = deque([start])
    while queue:
        node = queue.popleft()
        for nxt in graph[node]:
            if nxt not in dist:             # first time seen: this is the shortest route
                dist[nxt] = dist[node] + 1
                queue.append(nxt)
    return dist

graph = {"a": ["b", "c"], "b": ["d"], "c": ["d"], "d": []}
bfs_distances(graph, "a")   # {'a': 0, 'b': 1, 'c': 1, 'd': 2}
```

The queue is what keeps the levels in order. With an adjacency list, BFS runs in O(V + E) time, and it needs O(V) space for the visited set and the queue.

The trade-off is memory. A wide graph can put a large fraction of its vertices in the queue at once, which costs more than a depth-first search that holds only one path at a time. BFS also only gives shortest distance by edge count, not by weight. For weighted edges, use [Dijkstra's algorithm](/t/dijkstra).

The classic mistake is marking a vertex as visited when it's dequeued, not when it's enqueued. The same vertex can then sit in the queue several times, and the search gets slower without giving wrong answers. Mark vertices when you add them. For the other traversal order, see [depth-first search](/t/depth-first-search).
