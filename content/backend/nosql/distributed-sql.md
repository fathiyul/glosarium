---
title: "NewSQL / Distributed SQL"
summary: "SQL databases that scale horizontally, like CockroachDB or Spanner."
levels: { backend: senior, data-engineer: senior }
aliases: ["distributed sql", "newsql", "distributed sql database"]
prereqs: ["relational-database", "sharding"]
related: ["sharding", "cap-theorem", "partitioning", "eventual-consistency", "consensus"]
---

**Distributed SQL** (sometimes "NewSQL") is a class of databases that keep the relational model and SQL — transactions, joins, ACID — while spreading data across many machines. They aim to provide the horizontal scale of NoSQL with the consistency and query flexibility of a classic relational database: examples include CockroachDB, TiDB, YugabyteDB and Google Spanner.

The trick is that they shard data automatically and use a **consensus** protocol (like Raft) to replicate each shard consistently across nodes, so the cluster as a whole offers ACID transactions across the whole dataset — not just per node.

```text
classic relational: one big machine (scale up)
NoSQL:               many machines, weaker consistency (scale out)
distributed SQL:     many machines, still ACID (scale out + consistency)
```

The classic mistakes:

- Assuming it's free of trade-offs. Consistency and scale across a network cost *latency*: a write usually needs agreement among replicas, so cross-region writes are slower than a single-node commit. Distributed SQL buys scale and correctness with latency.
- Ignoring the latency of cross-shard transactions. Transactions touching data in different shards/regions need coordination; that's where the cost concentrates. Design to keep related data co-located.
- Treating it as a drop-in for any relational database. Query planners, index choices and operational model differ; performance characteristics aren't identical to a monolithic database. Benchmark your workload.
- Over-splitting data. A very chatty access pattern across shards defeats the design. Partitioning choices matter.
- Believing "scale out" means you can ignore schema. A good schema and index design still matter — arguably more, given distributed query plans.
- Forgetting the CAP context. Distributed SQL typically prioritises consistency (CP); during a network partition it may sacrifice availability rather than return stale data. Know the guarantee you're getting (see [CAP theorem](/t/cap-theorem)).

**When to use it:** when you've outgrown a single-node relational database but still need SQL, transactions and strong consistency — a growing SaaS with global users, a system that can't adopt eventual consistency. When a single node (or read replicas) still suffice, a classic relational database is simpler and lower-latency; the distributed option earns its complexity when scale or geography genuinely demands it. See [sharding](/t/sharding) and [partitioning](/t/partitioning).
