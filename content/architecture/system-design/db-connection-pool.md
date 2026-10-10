---
title: "Database Connection Pool"
summary: "Reusing database connections, with tools like PgBouncer at scale."
levels: { backend: mid-level }
also: [sql, database-operations]
aliases: ["database connection pool", "connection pool", "db pool"]
prereqs: ["connection-pooling", "database"]
related: ["connection-pooling", "backpressure", "thread-pool-exhaustion"]
---
A **database connection pool** is a managed set of reusable database connections shared by application threads: instead of opening (TCP + TLS + auth + session setup) per query, threads borrow a connection, use it, and return it. The pool bounds concurrency to what the database can actually serve while keeping hot connections ready.

```text
100 app threads → pool of 20 connections → database (never overwhelmed)
```

Sizing is the craft: too few and threads queue (latency spikes); too many and the database thrashes (context switching, lock contention, memory per connection). The pool is also where timeouts, retries and prepared-statement reuse live — the operational surface of database access.

The classic mistakes:

- Pool per process, sized per process. Ten app instances × 50 connections = 500 against a database happy with 100. Size globally: divide the database's budget across instances, or pool centrally (external pooler).
- Unbounded pools. "Grow as needed" grows until the database falls over — the pool's job is to *bound*, applying [backpressure](/t/backpressure) to callers instead.
- Leaked checkouts. Borrowed-but-never-returned connections drain the pool until everything queues forever. Time out checkouts and alert on exhaustion.
- No statement reuse. Re-parsing every query wastes the planning the pool could amortise; prepare once per pooled connection where drivers support it.
- Transaction pinning. A thread holding a pooled connection across user think-time or external calls starves the pool. Keep transactions short; never hold across I/O.
- Ignoring pool metrics. Queue depth, wait time and utilisation predict outages before queries slow. Monitor the pool, not just the database.
- One pool for all workloads. Bulk imports sharing the OLTP pool starve interactive queries. Separate pools (or users) by workload class.

**How to size it:** start from the database's comfortable connection count, divide by instances, separate workloads, monitor queueing — and treat the pool as a load-shedding boundary, not just a cache. See [connection pooling](/t/connection-pooling) for the general pattern.
