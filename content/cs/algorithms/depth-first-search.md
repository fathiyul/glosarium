---
title: "Depth-First Search"
summary: "Exploring a graph as deep as possible before backtracking."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["DFS"]
prereqs: ["graph"]
related: ["breadth-first-search", "backtracking", "topological-sort", "graph"]
---

Depth-first search (DFS) explores a graph by following one path as far as it goes, then backing up to try the next branch. It's natural to write with recursion, and it's the basis for many graph tasks, such as detecting cycles, finding connected components and ordering dependencies.

```python
def dfs(graph, node, seen=None):
    if seen is None:
        seen = []
    seen.append(node)
    for nxt in graph[node]:
        if nxt not in seen:
            dfs(graph, nxt, seen)
    return seen

graph = {"a": ["b", "c"], "b": ["d"], "c": ["d"], "d": []}
dfs(graph, "a")   # ['a', 'b', 'd', 'c']
```

It goes from `a` to `b`, then `d`, and only then backs up to try `c`. Each vertex and edge is examined once, so the time is O(V + E) with an adjacency list.

The trade-off is that DFS doesn't find shortest paths in an unweighted graph, because it may take a long route before a short one. It also uses stack space proportional to the depth of the search, which can be large in a long chain. A recursive version can hit the recursion limit on deep graphs, so an explicit stack is safer there.

The classic mistake is treating the `seen` list as a check that can be skipped. Without it, a graph with a cycle sends DFS around the loop forever, and the function never returns. Use a set for `seen`, since the membership test in a list is O(n) and makes the search slower. For shortest paths in unweighted graphs, see [breadth-first search](/t/breadth-first-search).
