---
title: "Row Locks vs Table Locks"
summary: "How much a lock blocks."
levels: { backend: senior, data-engineer: senior }
aliases: ["row locks vs table locks", "row lock", "table lock", "lock granularity"]
prereqs: ["pessimistic-locking", "transaction"]
related: ["db-deadlock", "mvcc", "pessimistic-locking"]
---

Locks come at different **granularities**, and the choice trades concurrency against overhead. A **row lock** blocks only the specific rows a transaction touches, so other transactions can work on other rows of the same table. A **table lock** blocks the whole table, so nothing else can read (or, for some modes, write) until it's released.

```text
row lock:   T1 updates orders#42 → T2 can still update orders#43
table lock: T1 locks orders      → nobody else touches orders
```

Databases mostly use row-level locking for writes (with [MVCC](/t/mvcc) letting readers proceed), because it gives far more concurrency. Table locks appear for operations that fundamentally can't be concurrent — schema changes, bulk maintenance, or explicit `LOCK TABLE`.

The classic mistakes:

- Expecting row locks to scale to wide writes. A transaction that updates a million rows takes a million row locks — expensive in memory and blocking to others. Bulk changes should be batched.
- Forgetting that some operations escalate. Locking enough rows (or certain DDL) can escalate to a table lock, unexpectedly blocking everything. Know which statements do this (e.g. `ALTER TABLE`, some index builds).
- Blocking readers unnecessarily. Databases with MVCC let readers avoid writer locks entirely; code that takes explicit locks for reads may block more than needed. Don't lock for reads you don't need consistency on (see [MVCC](/t/mvcc)).
- Holding locks across slow work. Whether row or table, holding a lock during an external call or a long computation blocks others the whole time. Keep locked sections short.
- Assuming "SELECT" takes no locks. At higher isolation levels or with `FOR UPDATE`, reads can lock. Know what your read is acquiring.
- Overlooking lock waits as a cause of slow requests. A query that's fast in isolation can hang behind another transaction's locks. Monitoring lock waits points at the blocker.

**How to think about it:** lock the smallest thing that keeps you correct. Row locks for targeted writes, transactions kept short, bulk work batched, and table locks only for operations that genuinely need exclusivity. Locks are the price of serialising conflicting changes — pay as little as possible, and watch for waits and [deadlocks](/t/db-deadlock).
