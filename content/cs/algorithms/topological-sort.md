---
title: "Topological Sort"
summary: "Ordering tasks so every dependency comes first."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["topo sort", "dependency ordering"]
prereqs: ["directed-acyclic-graph", "depth-first-search"]
related: ["directed-acyclic-graph", "depth-first-search", "breadth-first-search", "greedy-algorithm"]
---

A topological sort orders the vertices of a directed acyclic graph so that every edge points forward: each task appears after everything it depends on. Build systems, course prerequisites and task pipelines all need an order like this.

Kahn's algorithm builds the order by repeatedly removing a vertex with no remaining dependencies:

```python
from collections import deque

def topo_sort(graph):
    indeg = {n: 0 for n in graph}
    for n in graph:
        for m in graph[n]:
            indeg[m] += 1
    ready = deque(n for n in graph if indeg[n] == 0)
    order = []
    while ready:
        n = ready.popleft()
        order.append(n)
        for m in graph[n]:
            indeg[m] -= 1
            if indeg[m] == 0:
                ready.append(m)
    if len(order) != len(graph):
        raise ValueError("cycle detected")
    return order

topo_sort({"a": ["b"], "b": ["c"], "c": []})   # ['a', 'b', 'c']
```

It runs in O(V + E) time. The same function reports a cycle: if some vertices never reach zero incoming edges, the graph has no valid order.

The trade-off is that the result is not unique. When several tasks are ready at once, any of them can come first, so two correct answers can differ. Code that expects one specific order must sort the ready set itself.

The classic mistake is running a topological sort on a graph that may contain a cycle without checking, and then assuming the partial result is complete. Check that the output includes every vertex, and report the cycle when it doesn't. For the graph type this applies to, see [directed acyclic graphs](/t/directed-acyclic-graph). A DFS-based version is also common, and [depth-first search](/t/depth-first-search) explains that traversal.
