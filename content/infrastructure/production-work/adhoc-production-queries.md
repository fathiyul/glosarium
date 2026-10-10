---
title: "Ad-Hoc Queries on Production"
summary: "Querying live data without hurting it: read replicas, timeouts and LIMIT."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["production queries", "ad hoc queries", "querying prod"]
prereqs: ["database", "sql"]
related: ["query-optimization", "read-replica", "connection-pooling", "production-console", "production-data-fix"]
---

Sometimes you need to look at real production data: to confirm a bug, check how many rows are affected, or answer a customer's question. That's fine. What isn't fine is doing it carelessly. Production is live, and a heavy query can slow down or lock the very database the whole application depends on.

Habits that keep it safe:

- **Query a [read replica](/t/read-replica)**, not the primary, when one exists. Replicas serve reads and absorb the load; the primary stays free for the application.
- **Always add a `LIMIT`.** `SELECT * FROM orders` on a large table can scan and return far more than you need.
- **Set a timeout** so a query that runs away is cancelled instead of holding a connection forever.
- Filter and count, don't fetch. To gauge scale, `SELECT count(*) ...` with a narrow `WHERE` beats pulling rows into your terminal.
- **Avoid writes and long transactions.** Reading is usually low-risk; an accidental `UPDATE` is not (see [fixing data in production](/t/production-data-fix)).
- Mind the hour. Even a read-heavy query can hurt during peak traffic.

```sql
-- replica, bounded, timed out
SELECT id, status FROM orders
WHERE customer_id = 1042
ORDER BY created_at DESC
LIMIT 20;
```

The classic mistakes are a missing `LIMIT` on a big table and running an expensive query against the primary at peak. Both are easy to avoid and can take down an otherwise healthy system. Know how to read a query plan ([query optimization](/t/query-optimization)) so you can tell a cheap lookup from a full scan before you run it.

Take care with sensitive data too: ad-hoc output can contain personal information, so don't paste it into public channels or tickets. Prefer a [production console](/t/production-console) with proper access controls over ad-hoc connections to the database, and never a shared password. When a query turns into a change, treat it as a [data fix](/t/production-data-fix).
