---
title: "Graph Database"
summary: "Databases like Neo4j built around relationships."
levels: { backend: senior, data-engineer: senior }
aliases: ["graph database", "graph db", "node and edge database"]
prereqs: ["graph", "database"]
related: ["graph", "recursive-cte", "adjacency-list", "relational-database"]
---

A **graph database** stores data as **nodes** (entities) and **edges** (relationships), and is optimised for **traversal** — walking relationships many hops deep. Where a relational database represents relationships as foreign keys and joins, a graph database stores edges as first-class, directly-connected structures, so "friends of friends of friends" is fast regardless of depth.

```text
(alice)-[:FOLLOWS]->(bob)-[:FOLLOWS]->(carol)
traverse: who does alice reach within 3 hops?
```

This matters because a relational query joining many levels is a series of joins whose cost grows with depth, while a graph traversal follows pointers edge to edge. For deeply connected data — social networks, fraud rings, recommendation, knowledge graphs, dependency analysis — that difference is large.

The classic mistakes:

- Using a graph database for ordinary relational data. If your queries are "get orders for a customer" (one hop), a relational database is simpler and fine. Graphs shine for *deep, variable* traversal, not everything.
- Confusing it with traversal-in-SQL. A [recursive CTE](/t/recursive-cte) can traverse in a relational database; it works, but deep traversals and highly connected graphs usually perform better in a purpose-built store.
- Ignoring the modelling. A bad graph model — too many node types, wrong edge direction, missing supernodes — hurts as much as a bad schema. Design the traversal patterns.
- Supernodes. A node with millions of edges (a celebrity, a popular tag) makes traversal around it expensive; model or handle supernodes deliberately.
- Assuming it replaces the rest of the stack. Most systems use a graph database for the connected part alongside relational/other stores (see [polyglot persistence](/t/polyglot-persistence)), not as the single database.
- Overlooking maturity and query language. Graph databases vary in maturity, query languages (Cypher, Gremlin, SPARQL) and operational tooling; weigh ecosystem.

When to use it: when relationship *traversal* is the core of the workload — "how are these connected", "what's the shortest path", "which accounts form a ring". For simple lookups and range queries, use a relational database. Compare the [adjacency list](/t/adjacency-list) representation and [recursive CTEs](/t/recursive-cte) to see where the relational approach strains and a graph store earns its place.
