---
title: "Unbounded Result Sets"
summary: "Queries and APIs that return \"everything\", until everything is a million rows."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["unbounded result set", "unbounded query", "no limit query"]
prereqs: ["database", "pagination"]
related: ["eager-vs-lazy-loading", "connection-pooling", "slow-query-log", "backpressure"]
---

An **unbounded result set** is a query or endpoint whose result grows with the data — `SELECT * FROM events`, or an API that returns every record — with nothing capping how much comes back. It works fine on a test database and then breaks in production, because the table keeps growing and the code assumed it wouldn't.

The failure modes compound: the database scans and returns more rows, the application loads them all into memory, the response gets huge, the client chokes, and a single request can exhaust memory or stall a worker. One such endpoint under load can take down a service.

```text
works in dev:  SELECT * FROM events          (100 rows)
breaks in prod: SELECT * FROM events          (50 million rows)
```

The classic mistakes:

- No `LIMIT`. Every list query should have a bound, even a generous one. A missing limit is a time bomb that detonates as data grows.
- Paginating but not bounding the page size. Letting the client request `page_size=1000000` reintroduces the problem. Cap it server-side (see [pagination](/t/pagination)).
- Loading related data eagerly without bound. A query that eagerly fetches a collection per row can multiply the result (see [eager vs lazy loading](/t/eager-vs-lazy-loading)).
- Streaming isn't a free pass. Streaming a large result avoids loading it all in memory, but still holds a database connection and cursor for a long time; bound and break work into chunks.
- Fixing it with a smaller limit only. If an endpoint needs to return a lot, redesign it — background job, export, incremental sync — rather than raise the limit until it breaks again.

**How to fix it:** add a limit to every query; paginate collection endpoints with a hard maximum page size; for genuinely large data use an asynchronous [data export](/t/data-export) or cursor-based streaming (see [database cursor](/t/database-cursor)). Unbounded result sets are one of the most common causes of production incidents, and the fix is almost always "bound it".
