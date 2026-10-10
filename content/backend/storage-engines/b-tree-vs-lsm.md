---
title: "B-Tree vs LSM Tree"
summary: "Read-optimized pages vs write-optimized logs, and when each wins."
levels: { backend: senior, data-engineer: senior }
aliases: ["b-tree vs lsm", "btree vs lsm", "storage engine structures"]
prereqs: ["b-tree", "storage-engine"]
related: ["lsm-tree", "write-amplification", "storage-engine", "buffer-pool"]
---

Almost every database's storage engine is built on one of two structures, and the choice shapes its read/write profile:

- B-tree — a balanced, page-based tree updated **in place**. A write finds the page, modifies it, and writes it back. Reads are fast and predictable (a few page lookups); writes cost a page rewrite and random I/O. Most traditional relational databases use variations of this.
- LSM tree (log-structured merge tree) — writes are **appended** to memory and flushed as immutable sorted files, which are merged (compacted) in the background. Writes are fast and sequential; reads may have to check several files. Many modern NoSQL and time-series stores use this (see [LSM tree](/t/lsm-tree)).

```text
B-tree: update in place   → fast reads, heavier writes, page granularity
LSM:    append + compact   → fast writes, read amplification, background work
```

The trade-offs are in three "amplifications": **read amplification** (how many places a read must check), **write amplification** (how many bytes are written per logical write), and space amplification (extra storage used). B-trees favour reads and bounded space; LSM trees favour writes and pay in compaction work and read cost.

The classic mistakes:

- Assuming one is simply "better". The right choice depends on the workload: read-heavy vs write-heavy, latency-sensitive vs throughput. B-trees suit read-heavy transactional work; LSM trees suit write-heavy ingestion.
- Ignoring write amplification. An LSM's background compaction rewrites data repeatedly, which wears SSDs and consumes I/O (see [write amplification](/t/write-amplification)).
- Ignoring read amplification on LSM. A key may live in several SSTables plus memory; reads check more places unless tuned.
- Mixing up the storage engine with the database. A database may offer several engines, and the same SQL can behave very differently underneath. Know which you're using.
- Tuning compaction casually. LSM performance is dominated by compaction settings; defaults aren't always right for your load.

How to choose: read-dominated transactional workloads generally favour B-trees; write-dominated ingestion favours LSM trees. Neither is universal — understand the amplification trade-offs and match them to your access pattern. See [storage engine](/t/storage-engine) and [buffer pool](/t/buffer-pool).
