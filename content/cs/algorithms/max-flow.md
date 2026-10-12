---
title: "Maximum Flow"
summary: "Finding the most that can flow through a network (Ford-Fulkerson)."
levels: { backend: principal, data-engineer: principal , data-scientist: principal }
aliases: ["maximum flow", "max flow", "ford-fulkerson"]
prereqs: ["graph", "breadth-first-search"]
related: ["dynamic-programming", "greedy-algorithm", "adjacency-list"]
---

**Maximum flow** asks: in a directed network where each edge has a capacity, what's the most flow you can push from a source node to a sink node? Think pipes carrying water, network links carrying packets, or roads carrying traffic. Each edge can't exceed its capacity, and (except at source and sink) flow in must equal flow out.

**Ford-Fulkerson** solves it by repeatedly finding an *augmenting path* — a route from source to sink with spare capacity — and pushing as much as possible along it, until no such path remains. The clever bit is the **residual graph**: after pushing flow, it adds *backward* edges representing the ability to undo flow, so the algorithm can reroute earlier decisions.

```text
while an augmenting path exists in the residual graph:
    push flow along it; update forward and backward capacities
when no path remains → current flow is maximum
```

A beautiful companion theorem, **max-flow min-cut**, says the maximum flow equals the capacity of the tightest bottleneck (the minimum cut). So the algorithm also finds the smallest set of edges whose removal would disconnect source from sink.

Common applications: network routing and throughput, bipartite matching (assigning workers to jobs), resource allocation, and any problem that reduces to "how much can get through".

The classic mistakes:

- Ignoring worst-case running time of the basic method. Naive Ford-Fulkerson can be slow (even non-terminating with irrational capacities) if it picks bad paths. Using BFS to find augmenting paths (Edmonds-Karp) bounds it, and other variants are faster.
- Forgetting the residual edges. Without the backward edges, the algorithm can't correct earlier flow decisions and may get stuck below the true max.
- Confusing flow with shortest paths. Max-flow maximises total throughput; shortest paths minimise cost or distance. Different objectives.
- Assuming integer capacities for speed. Integer capacities give integer flows and a clean termination argument; continuous capacities behave differently.
- Over-applying it. Max-flow is powerful but a heavy hammer; confirm the problem is genuinely a flow problem before reaching for it.

Maximum flow is a cornerstone of combinatorial optimisation, with the min-cut theorem making it more than an algorithm — a bridge between "how much fits" and "where the bottleneck is". It's the algorithmic answer to throughput and matching questions, and a favourite for interviews because it turns surprising problems into a network.
