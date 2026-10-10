---
title: "Busy Database"
summary: "Pushing too much processing into the database."
levels: { backend: senior }
aliases: ["busy database", "database as integration", "shared database bottleneck"]
prereqs: ["database-per-service", "monolith"]
related: ["database-per-service", "cqrs", "read-heavy-vs-write-heavy"]
---
The **busy database** anti-pattern funnels every integration through one shared store: services read each other's tables, batch jobs hammer production, analytics query live — until the database (and every team sharing it) contends on locks, I/O and schema changes. The database becomes the coupling point, the bottleneck and the blast radius simultaneously.

```text
services + jobs + analytics → ONE database (locks, slow queries, migration freezes)
```

Symptoms are unmistakable: schema changes needing cross-team sign-off, one workload's queries starving others, "don't touch the database" deployment freezes, and scaling debates that are really about sharing. The cures separate concerns: private databases per service, read replicas/warehouses for analytics, queues instead of polling tables.

The classic mistakes:

- Integration via shared tables. Services reading/writing each other's tables couples schemas invisibly — every column change breaks unknown readers. Integrate through APIs/events, never tables.
- Analytics on production. Ad-hoc analytical queries on OLTP databases contend with live traffic unpredictably. Replicate to warehouses; analyse there.
- Batch jobs inline. Nightly jobs locking live tables stall users; schedule, isolate (replicas), or stream instead of batch-scanning production.
- Schema change paralysis. Shared ownership making migrations multi-team negotiations signals the database has become organisational coupling. Split ownership with the data.
- Scaling the shared box. Bigger hardware postpones the contention without removing coupling. Partition workloads (and data) instead of upsizing shared fate.
- Missing the people problem. "Busy database" is often Conway's law in SQL — teams sharing stores because sharing services felt harder. Fix ownership boundaries, not just queries.
- Monitoring queries, not contention. Slow-query logs miss lock waits and I/O contention from other workloads. Measure contention (locks, buffer pressure), not just speed.

**The escape:** private databases, analytics off production, queues over polling, ownership with data. Shared databases integrate teams by accident — integrate deliberately instead.
