---
title: "Write-Ahead Log"
summary: "Logging changes before applying them, for durability and replication."
levels: { backend: senior, data-engineer: senior }
aliases: ["write-ahead log", "WAL", "write ahead logging"]
prereqs: ["transaction", "storage-engine"]
related: ["mvcc", "checkpoint", "database-high-availability"]
---

A **write-ahead log (WAL)** is an append-only record of every change, written to durable storage *before* the change is applied to the actual data files. The rule is the name: log first, then data. It's what makes a database durable across crashes and what enables replication and point-in-time recovery.

```text
1. append "UPDATE accounts SET balance=50 WHERE id=1" to the WAL (fsync)
2. later, apply it to the data pages
a crash between 1 and 2: replay the WAL on restart
```

Why it works: a commit only needs the WAL record flushed (a sequential append, fast) rather than the many scattered data pages updated. On restart, the database replays any logged changes not yet reflected in the data files, so committed transactions survive and uncommitted ones are discarded. The log is also the basis for [replication](/t/streaming-vs-logical-replication) (ship the log to a replica) and [point-in-time recovery](/t/point-in-time-recovery).

The classic mistakes:

- Assuming a commit means data pages are written. A commit means the *WAL* is durable. Data pages are written later (at a [checkpoint](/t/checkpoint)); that's the efficiency, not a gap in durability.
- Ignoring `fsync`. Durability depends on the WAL actually reaching disk (`fsync`). Disabling it for speed means commits can be lost on a power failure — a real [trade-off](/t/fsync-durability), not a free win.
- Thinking WAL is only for crash recovery. It's also the backbone of physical replication, change data capture and backups — used well beyond recovery.
- Confusing it with an application log. A database WAL is a structured record of data changes, not a text log of events. It's a mechanism of the storage engine.
- Underestimating its size. Under heavy writes the WAL grows until a checkpoint flushes and truncates it; running far behind (or an overwhelmed checkpoint process) can fill the disk.
- Assuming MVCC's old versions live in the WAL. Old row versions live in the data files and are reclaimed by [VACUUM](/t/vacuum); the WAL is the change history. Different things.

**Why it matters:** the WAL is the foundation of database durability, recovery and replication — the reason a committed transaction survives a crash and the reason a standby can stay in sync. Understanding it connects [transactions](/t/transaction), [checkpoints](/t/checkpoint), [fsync durability](/t/fsync-durability) and [replication](/t/streaming-vs-logical-replication).
