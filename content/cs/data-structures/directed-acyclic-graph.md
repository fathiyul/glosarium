---
title: "Directed Acyclic Graph (DAG)"
summary: "A graph with directed edges and no cycles, as in build systems and pipelines."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["DAG", "directed acyclic"]
prereqs: ["graph"]
related: ["graph", "adjacency-list", "tree-traversal", "dependency-hell"]
---

A directed acyclic graph (DAG) is a graph whose edges have a direction and that contains no cycle, so you can never follow edges and return to where you started. Build systems, task pipelines and package dependency graphs are DAGs: a task depends on earlier tasks, and no task depends on itself through a chain.

Because there are no cycles, the vertices can be put in an order where every edge points forward. This is a topological sort, and Kahn's algorithm produces one by repeatedly taking a vertex with no incoming edges left:

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

topo_sort({"compile": ["test"], "fetch": ["compile"], "test": []})
# ['fetch', 'compile', 'test']
```

The algorithm also detects cycles: if some vertices never reach zero incoming edges, the graph isn't acyclic. Time is O(V + E).

The trade-off is that a DAG only describes order and dependency. It doesn't say how long each step takes or how to parallelize it, and a cycle, which may appear when someone adds a dependency by mistake, stops the sort entirely. Real schedulers add those concerns on top.

The classic mistake is assuming a dependency graph is acyclic without checking. Detect cycles when edges are added, and report the cycle clearly, rather than letting the build fail with a message that doesn't name the loop. The problem of conflicting dependencies is covered in [dependency hell](/t/dependency-hell).
