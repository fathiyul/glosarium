---
title: "Write Amplification"
summary: "One logical write turning into many physical ones."
levels: { backend: principal, data-engineer: principal }
aliases: ["write amplification", "write amplification factor", "WA"]
prereqs: ["storage-engine", "lsm-tree"]
related: ["lsm-tree", "sstable-compaction", "wal", "checkpoint"]
---

**Write amplification** is the ratio of bytes physically written to storage for each logical write the application performs. A single `UPDATE` can cause many physical writes — the [WAL](/t/wal) record, the data page, index updates, and (in an LSM tree) repeated compaction rewrites — so writing one logical byte may cost several physical ones.

```text
logical write: 1 row updated
physical writes: WAL + data page + index pages + (LSM) compaction rewrites
write amplification = physical bytes / logical bytes
```

Why it matters: storage has finite write throughput and, on SSDs, finite write endurance (cells wear out after so many writes). High write amplification means slower writes, more I/O contention, and shorter SSD life. It's a central performance characteristic of storage engines.

The main sources:

- WAL — every change is written to the log before the data (see [write-ahead log](/t/wal)).
- Page rewrites — a B-tree update rewrites a whole page, even for a small change.
- Compaction — an [LSM tree](/t/lsm-tree) rewrites data multiple times as it merges levels (see [SSTables and compaction](/t/sstable-compaction)).
- Index maintenance — updating every index a changed column belongs to.
- Replication — writing to replicas multiplies physical writes.

The classic mistakes:

- Assuming a write costs one write. The WAL, indexes, page rewrites and compaction all multiply it. Understanding this explains why bulk writes and many small updates feel different.
- Ignoring compaction's amplification. LSM engines can amplify writes several-fold through compaction; this wears SSDs and consumes bandwidth, especially under heavy write load (see [SSTables and compaction](/t/sstable-compaction)).
- Too many indexes. Each index adds write cost on every affected change; a table with many indexes pays for them on every write. Index deliberately (see [indexes](/t/db-index)).
- Small random writes instead of batching. Many tiny writes each pay the WAL and page costs; batching amortises them (a reason bulk loads are efficient).
- Forgetting the SSD endurance angle. High write amplification shortens flash life; for write-heavy workloads, engine and index choices affect hardware longevity.
- Only optimising reads. A system tuned purely for read speed (many indexes, read-optimised structures) can have terrible write amplification.

**How to manage it:** understand where your writes multiply (WAL, indexes, compaction), batch where possible, avoid unnecessary indexes, and choose an engine matching your read/write mix. It's the hidden cost behind storage-engine design — the reason "just write the data" is never quite one write. See [storage engine](/t/storage-engine) and [B-tree vs LSM](/t/b-tree-vs-lsm).
