---
title: "Union-Find"
summary: "Tracking which elements belong to the same group."
levels: { backend: senior, data-engineer: senior }
aliases: ["union-find", "disjoint set", "disjoint-set union"]
prereqs: ["graph", "tree-traversal"]
related: ["minimum-spanning-tree"]
---

**Union-find** (disjoint-set union) tracks elements partitioned into groups. It supports two operations, both extremely fast:

- find(x) — which group does `x` belong to? (returns a representative of its set)
- union(x, y) — merge the groups containing `x` and `y`.

With two optimisations — **path compression** (flatten the tree as you search) and **union by rank/size** (attach the smaller tree under the larger) — the operations run in amortised near-constant time, effectively O(1) for practical purposes.

```text
union(1, 2); union(2, 3)   →  {1, 2, 3} share a representative
find(1) == find(3)         →  true, they're connected
```

The classic use is connectivity: are two nodes in the same group? Is a graph connected? Does adding this edge create a cycle? It's the engine inside **Kruskal's algorithm** for a [minimum spanning tree](/t/minimum-spanning-tree) — grow the tree edge by edge, skipping any edge whose endpoints are already connected (union-find tells you instantly). It also appears in image processing (labelling connected regions), network analysis, and any "group these things over time" problem.

The classic mistakes:

- Forgetting the optimisations. A naive union-find (no path compression, no union by rank) degrades to O(n) per operation and loses its whole advantage. The near-constant time *requires* both tweaks.
- Trying to use it for removals or dynamic splits. Union-find only *merges*; it can't split a set. If you need to separate groups, it's the wrong tool.
- Misreading what it answers. It tells you *whether* two elements are in the same set, not the path or distance between them. For shortest paths, use [Dijkstra](/t/dijkstra) or BFS.
- Assuming the representative is stable or meaningful. `find` returns *some* member as representative; it isn't necessarily the "first" element, and it can change after unions.
- Hand-rolling it unnecessarily. It's tiny to implement but easy to get subtly wrong; there are reliable implementations in every language.

Union-find is a small, specialised structure with a huge payoff: near-constant-time grouping under merges. It's the reason Kruskal's algorithm is efficient, and it turns many "are these connected?" questions into a one-line check. It's a standard tool alongside graph traversal algorithms.
