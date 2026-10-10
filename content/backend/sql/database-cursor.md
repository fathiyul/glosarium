---
title: "Database Cursor"
summary: "Fetching a large result set in batches instead of all at once."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["database cursor", "server-side cursor", "cursor"]
prereqs: ["sql", "transaction"]
related: ["unbounded-result-sets", "pagination", "connection-pooling"]
---

A **database cursor** is a pointer that lets you walk a result set **incrementally** instead of loading all rows at once. You declare a query, then fetch a batch, process it, fetch the next batch, and so on, until exhausted. The database keeps the query's position server-side, so you don't hold millions of rows in application memory.

```text
DECLARE c CURSOR FOR SELECT * FROM events WHERE ...;
FETCH 1000 FROM c;   → process these 1000
FETCH 1000 FROM c;   → next 1000 ... until no rows
```

It's the classic way to process a large result without an [unbounded result set](/t/unbounded-result-sets) blowing up memory. Many database drivers and ORMs offer a "streaming" or "server-side cursor" mode that does this under the hood.

The classic mistakes:

- Forgetting the cursor holds resources. A server-side cursor typically lives inside a [transaction](/t/transaction) and holds a connection and snapshots open while you iterate. Iteratoring slowly or forgetting to close it ties up the connection and can bloat the database.
- Holding a transaction open too long. Some databases keep a snapshot for the whole cursor lifetime, so long iteration delays vacuum/cleanup and increases contention. Keep iteration bounded or use batched key pagination instead.
- Assuming it's free of cost. Fetching in batches reduces memory but still transfers every row; for very large exports, an async job writing to storage is better.
- Expecting consistency without a transaction. Depending on isolation, rows can change under you during iteration. If you need a stable view, you need transaction semantics.
- Confusing cursors with app-level pagination. A cursor is a server-side iterator; API [pagination](/t/pagination) is client-driven and stateless. They solve similar problems at different layers.

**When to use it:** processing a large result in a long-running job — a backfill, a report, a migration — where loading everything into memory is the problem. For API responses, use pagination; for huge exports, stream to a file or object store. Cursors are a memory-management tool, not a speed-up — see [connection pooling](/t/connection-pooling) for the resource side.
