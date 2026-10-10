---
title: "MVCC"
summary: "Multi-version concurrency control, where readers don't block writers."
levels: { backend: senior, data-engineer: senior }
aliases: ["MVCC", "multi-version concurrency control", "multiversion concurrency control"]
prereqs: ["transaction", "isolation-level"]
related: ["vacuum", "snapshot-isolation", "row-vs-table-lock", "phantom-read"]
---

**MVCC** (multi-version concurrency control) is how most modern databases let readers and writers work at the same time. Instead of overwriting a row, an update writes a *new version* and marks the old one as superseded; each transaction reads the version that was current when its **snapshot** began. Readers therefore never block writers, and writers never block readers.

```text
row v1 (old)   row v2 (new, current)
reader with an old snapshot still sees v1; a new reader sees v2
```

This is a huge concurrency win: a long read doesn't lock out updates, and an update doesn't stall reads. It also powers snapshot-based isolation levels, which give a transaction a stable, consistent view (see [snapshot isolation](/t/snapshot-isolation)).

The consequence is that old row versions accumulate. They can't be discarded while any transaction might still need to see them, so the database reclaims them later via [VACUUM](/t/vacuum). Until then, the table is "bloated".

The classic mistakes:

- Forgetting the cleanup. MVCC trades garbage for concurrency; long-running transactions keep old versions alive and prevent reclamation, causing bloat and slower scans. Keep transactions short (see [VACUUM](/t/vacuum)).
- Expecting MVCC to prevent all anomalies. MVCC gives snapshot isolation, which still permits [write skew](/t/write-skew) and, at some levels, phantoms. It's not automatically serialisable.
- Assuming row locks are gone entirely. MVCC reduces read/write conflicts, but writers still take locks against other writers of the same row (the second writer waits or aborts). It's not lock-free.
- Ignoring storage growth under heavy updates. A table updated constantly produces many versions and needs regular space reclamation; capacity planning must account for it.
- Confusing MVCC with a specific isolation level. MVCC is the *mechanism*; the isolation level is the *guarantee* it provides (often Snapshot or Read Committed). They're related but distinct.

**Why it matters:** MVCC is why a database can be highly concurrent without readers constantly blocking writers — a defining feature of modern engines. It shifts the cost from blocking to space and cleanup, and it shapes behaviour around long transactions, `VACUUM`, and isolation. See [transactions](/t/transaction) and [snapshot isolation](/t/snapshot-isolation).
