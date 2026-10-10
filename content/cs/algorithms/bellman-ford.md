---
title: "Bellman-Ford Algorithm"
summary: "Shortest paths that also handles negative edge weights."
levels: { backend: senior, data-engineer: senior }
aliases: ["Bellman-Ford", "bellman ford algorithm", "negative cycle detection"]
prereqs: ["graph", "dijkstra"]
related: ["dynamic-programming", "breadth-first-search", "topological-sort"]
---

**Bellman-Ford** finds the shortest path from one start node to all others in a weighted graph, and unlike [Dijkstra](/t/dijkstra) it tolerates **negative weights**. It works by *relaxation*: repeatedly look at every edge and, if going through it improves the best-known distance to its target, update that distance. After V−1 rounds (V = number of nodes), all shortest paths are found.

```text
repeat V-1 times:
  for each edge (u, v, w):
    if dist[u] + w < dist[v]: dist[v] = dist[u] + w
```

The extra trick is **negative cycle detection**: run one more round. If any distance can still be improved, there's a cycle whose total weight is negative — meaning "shortest paths" aren't even well-defined (you could loop forever), and the algorithm reports it instead of returning nonsense.

The classic mistakes:

- Expecting Dijkstra's speed. Bellman-Ford is slower — O(V·E) versus Dijkstra's O(E log V). Use it only when negative weights are possible; otherwise Dijkstra is better.
- Using it on a graph with a negative cycle without checking. Distances aren't meaningful there. The Vth-round check is essential, not optional.
- Assuming it finds paths through removed nodes. It's for reachability respecting edges; that's fine, but don't apply it where a simpler traversal suffices.
- Confusing relaxation count with iterations until no change. The guarantee comes from V−1 full passes; stopping early is an optimisation, not the bound.
- Forgetting it's a shortest-path algorithm, not an MST one. That's [minimum spanning tree](/t/minimum-spanning-tree) — a different problem.

Bellman-Ford matters because real graphs can have negative weights: costs, profits, currency exchange (where arbitrage is a negative cycle). It's a classic [dynamic-programming](/t/dynamic-programming) algorithm, and its distributed variant underlies routing protocols where each node only knows its neighbours. Reach for it when the weights can go negative, and reach for [Dijkstra](/t/dijkstra) when they can't.
