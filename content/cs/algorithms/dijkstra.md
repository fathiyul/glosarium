---
title: "Dijkstra's Algorithm"
summary: "Finding shortest paths in a graph with non-negative weights."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["Dijkstra's algorithm", "dijkstra", "shortest path algorithm"]
prereqs: ["graph", "priority-queue"]
related: ["bellman-ford", "greedy-algorithm", "breadth-first-search", "adjacency-list"]
---

**Dijkstra's algorithm** finds the shortest path from a start node to every other node in a weighted graph, as long as all edge weights are non-negative. It's a **greedy** algorithm: it repeatedly takes the unvisited node with the smallest known distance, "settles" it, and relaxes its outgoing edges. A [priority queue](/t/priority-queue) makes picking the nearest node efficient.

```text
dist[start] = 0; others = ∞
repeat: take nearest unsettled node u
        for each edge (u, v, w): dist[v] = min(dist[v], dist[u] + w)
until all nodes settled
```

It's the algorithm behind GPS routing, network routing protocols, and any "cheapest way from A to B" on a weighted graph. With a binary heap, it runs in O(E log V).

The classic mistakes:

- Running it on negative weights. Dijkstra assumes that once a node is settled, its distance can't improve — which false if a later path could go through a negative edge. On negative weights it can give wrong answers; use [Bellman-Ford](/t/bellman-ford) instead.
- Assuming it finds the path, not just the distance. As stated it computes distances; to reconstruct the route you must record each node's predecessor as you relax.
- Confusing it with BFS. [Breadth-first search](/t/breadth-first-search) finds shortest paths in *unweighted* graphs (every edge costs the same); Dijkstra generalises to weights.
- Ignoring the priority queue's cost. A simple array scan for the minimum makes it O(V²) — fine for dense small graphs, slow for large sparse ones. Use a heap.
- Treating it as an all-pairs solution. It's single-source. For every pair, run it from each node or use Floyd-Warshall.

Dijkstra is the standard shortest-path algorithm when weights are non-negative, and one of the clearest illustrations of greed plus a priority queue. Reach for [BFS](/t/breadth-first-search) when edges are unweighted, [Bellman-Ford](/t/bellman-ford) when weights can be negative, and Dijkstra in between — which is most of the time. It's closely related to the [minimum spanning tree](/t/minimum-spanning-tree) algorithms, though it solves a different problem.
