---
title: "Storage Engine"
summary: "The part of a database that reads and writes data on disk."
levels: { backend: senior, data-engineer: senior }
aliases: ["storage engine", "storage engines", "data engine"]
prereqs: ["database", "db-index"]
related: ["b-tree-vs-lsm", "lsm-tree", "wal", "buffer-pool", "checkpoint"]
---

A **storage engine** is the part of a database that actually stores and retrieves data on disk. Above it sits the query layer (parsing, planning, transactions); below it, the filesystem and hardware. The engine defines the **on-disk structure** — how data and indexes are laid out — and the mechanisms for durability.

Its main components:

- The data structure — usually a [B-tree](/t/b-tree-vs-lsm) (update in place) or an [LSM tree](/t/lsm-tree) (append and compact), which determines read/write characteristics.
- The [buffer pool](/t/buffer-pool) — caches pages in memory.
- The [write-ahead log](/t/wal) — makes changes durable and enables recovery.
- [Checkpoints](/t/checkpoint) — flush memory to data files.
- Index structures — the B-trees, hash indexes and others that speed lookups.

```text
query layer (SQL, planner, transactions)
        ↓
storage engine: structure + buffer pool + WAL + indexes
        ↓
filesystem → disk
```

The classic mistakes:

- Treating the database as a black box. Two databases can offer the same SQL but wildly different read/write performance based on their engine. Understanding the engine explains the behaviour.
- Ignoring which engine you're using. Some databases support several engines with different trade-offs; the same workload can be fast or slow depending on the choice (see [B-tree vs LSM](/t/b-tree-vs-lsm)).
- Assuming the engine is interchangeable. A B-tree and an LSM tree have opposite read/write profiles; choosing well depends on the workload.
- Ignoring the durability machinery. WAL, checkpointing and `fsync` policy determine what survives a crash — not just "the database saves data" (see [fsync durability](/t/fsync-durability)).
- Blaming the query for everything. Sometimes the bottleneck is the engine's I/O, compaction or buffer pool, not the SQL. Know the layers.
- Over-tuning the query layer while the engine is the bottleneck. Indexes and SQL matter, but if the storage engine can't keep up (compaction backlog, cold buffer pool), no query rewrite saves you.

**Why it matters:** understanding the storage engine connects the SQL you write to the disk behaviour underneath — why one insert pattern is fast and another slow, why a bulk load behaves differently from many small writes, and why durability and compaction features exist. It's the foundation under [query plans](/t/query-plan) and [transactions](/t/transaction). See [LSM tree](/t/lsm-tree) and [buffer pool](/t/buffer-pool).
