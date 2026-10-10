---
title: "Snapshot Isolation"
summary: "Each transaction reads from a consistent snapshot of the database."
levels: { backend: senior, data-engineer: senior }
aliases: ["snapshot isolation", "snapshot isolation level", "SI"]
prereqs: ["mvcc", "isolation-level"]
related: ["mvcc", "write-skew", "isolation-level", "transaction"]
---

**Snapshot isolation** is a concurrency-control guarantee in which every transaction reads from a **consistent snapshot** of the database as of when it started. Changes made by transactions that commit after it began aren't visible — so a transaction's reads are stable and internally consistent, all from "the same moment".

```text
T1 begins at t=100 → reads always see the database as of t=100
T2 commits at t=105 → T1 still doesn't see T2's changes
```

It's implemented with [MVCC](/t/mvcc): the engine keeps multiple row versions, and each transaction is directed to the versions valid in its snapshot. The benefits: readers don't block writers and vice versa, reads are consistent, and it prevents [non-repeatable reads](/t/non-repeatable-read) and [phantom reads](/t/phantom-read) (in most implementations).

But snapshot isolation is **not full serializability**. The classic gap is **[write skew](/t/write-skew)**: two transactions read overlapping data, each decides to write different rows, and together they break an invariant — neither wrote the row the other read, so snapshot isolation allows both. It also doesn't prevent all anomalies a serializable level would.

The classic mistakes:

- Assuming snapshot isolation means serializable. It prevents many anomalies but not write skew (and, in some databases, not all phantoms). If you need true serializability, use a serializable level (or explicit locks).
- Confusing snapshot time with "when I read". The snapshot is fixed at transaction start; you don't see concurrent commits even if they happen before your next statement.
- Long-running transactions pinning versions. A snapshot must be preserved for the transaction's lifetime; a long transaction prevents [vacuum/cleanup](/t/vacuum) of old versions, causing bloat. Keep transactions short.
- Write conflicts. Snapshot isolation usually detects write-write conflicts (two transactions updating the same row) and aborts one; handle the abort and retry.
- Assuming all databases implement it identically. Names and exact behaviour vary ("repeatable read" in one database may mean snapshot isolation in another). Read the specifics.

When to use it: as the default for many modern databases, giving consistent reads with good concurrency. For workload where lost updates must be prevented it's excellent; for set-based invariants vulnerable to write skew, escalate to serializable or lock explicitly. It's the sweet spot of consistency and concurrency, with the write-skew caveat you must remember — see [MVCC](/t/mvcc) and [isolation levels](/t/isolation-level).
