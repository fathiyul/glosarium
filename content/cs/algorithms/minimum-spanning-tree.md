---
title: "Minimum Spanning Tree"
summary: "Connecting all nodes with the least total edge weight (Prim's, Kruskal's)."
levels: { backend: senior, frontend: senior, data-engineer: senior , data-scientist: senior }
aliases: ["minimum spanning tree", "MST", "Prim Kruskal"]
prereqs: ["graph", "greedy-algorithm"]
related: ["union-find", "dijkstra", "adjacency-list"]
---

A **minimum spanning tree (MST)** is the cheapest way to connect all nodes of a weighted, undirected graph using a subset of the edges with no cycles — the tree (V−1 edges) whose total weight is smallest. Think of connecting towns with cable at least cost, or wiring a circuit board.

Two classic algorithms both work greedily, and both are correct:

- **Kruskal's** — sort all edges by weight, then add each edge unless it would create a cycle. Checking "would this create a cycle?" is exactly what [union-find](/t/union-find) answers instantly.
- Prim's — start from any node and repeatedly add the cheapest edge that connects a new node to the growing tree, using a [priority queue](/t/priority-queue).

```text
Kruskal: sort edges → add if it joins two different groups (union-find)
Prim:    grow a tree by always taking the cheapest edge out of it
```

The surprising part is that locally greedy choices (cheapest edge that doesn't break the tree rule) produce a globally minimal result — a property MST shares with a few other greedy algorithms.

The classic mistakes:

- Confusing it with shortest paths. An MST minimises *total* edge weight; [Dijkstra](/t/dijkstra) minimises the *path* between two nodes and produces a different tree. They're different problems.
- Using it on a directed or disconnected graph. An MST is defined for connected, undirected graphs. Directed minimum-cost trees are a different problem; disconnected graphs give a *forest*.
- Forgetting Kruskal needs cycle detection. Without union-find (or equivalent), you can't tell cheaply whether an edge is safe to add.
- Assuming weights must be unique. Ties are fine; the MST may not be unique when weights tie, but any minimum one is a valid answer.
- Ignoring the density of the graph. Kruskal suits sparse graphs (few edges, mostly sorting); Prim suits dense ones with the right data structures.

The MST is a foundational graph problem: connect everything cheaply with no cycles. It's a clean example of greedy correctness, and its algorithms lean on sorting, a priority queue, or union-find — practical tools you'll reuse elsewhere. See [graph](/t/graph) and the [adjacency list](/t/adjacency-list) representation for how the data is stored.
