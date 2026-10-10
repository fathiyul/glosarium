---
title: "Covering Index"
summary: "An index containing every column a query needs."
levels: { backend: senior, data-engineer: senior }
aliases: ["covering index", "index-only scan", "covering indexes"]
prereqs: ["db-index", "query-plan"]
related: ["seq-scan-vs-index-scan", "index-selectivity", "composite-index"]
---

A **covering index** includes all the columns a query needs, so the database can answer it **from the index alone** without going back to the table. A normal index scan is two steps — find rows in the index, then fetch each row from the table; a covering index skips the second step, eliminating those random reads.

```sql
-- query
SELECT id, total FROM orders WHERE customer_id = 42;
-- covering index: customer_id (filter) + id, total (include)
CREATE INDEX ON orders (customer_id) INCLUDE (id, total);
```

The `INCLUDE` clause (or just adding the columns to a composite index) makes the index self-sufficient. Databases report this as an "index-only scan" or "covering index scan" in the [query plan](/t/query-plan).

The classic mistakes:

- Assuming any index covers. A single-column index only covers a query selecting that column plus the key. Select anything else and the database must fetch from the table — no longer covering.
- Over-covering. Adding many columns bloats the index, slows writes and wastes space. Cover the queries that matter, not all of them.
- Forgetting that covering still isn't free. It avoids the table fetch, but the index itself is read and values compared; for large result fractions, a [sequential scan](/t/seq-scan-vs-index-scan) may still win.
- Ignoring index maintenance cost. Every index makes inserts/updates/deletes more expensive. A covering index for one query is a tax on every write — weigh it.
- Caching the wrong query. Covering helps repeated, latency-sensitive lookups (hot reads). If the query runs rarely, the write cost likely outweighs the benefit.
- Assuming visibility rules are free. On some MVCC databases, index-only scans still check heap visibility for recently changed rows, so the win varies with vacuum state (see [VACUUM](/t/vacuum)).

**When to use it:** for frequent, performance-critical read queries where the table fetch dominates — typically point lookups or small-range reads on hot tables. Confirm with the plan that you've actually achieved an index-only scan, and mind the write overhead. It's one of the highest-value index optimisations when aimed at the right query.
