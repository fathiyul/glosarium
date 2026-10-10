---
title: "LSM Tree"
summary: "A write-optimized structure that buffers writes in memory and merges sorted files."
levels: { backend: senior, data-engineer: senior }
aliases: ["LSM tree", "log-structured merge tree", "LSM"]
prereqs: ["storage-engine", "b-tree-vs-lsm"]
related: ["sstable-compaction", "write-amplification", "wal", "storage-engine"]
---

An **LSM tree** (log-structured merge tree) is a storage structure optimised for **writes**. Instead of updating data in place (as a [B-tree](/t/b-tree-vs-lsm) does), it appends. New writes go to an in-memory sorted structure called a **memtable** (and to the [WAL](/t/wal) for durability); when the memtable fills, it's flushed to disk as an immutable sorted file (an **SSTable**). Background compaction merges these files so reads don't have to check too many.

```text
write → memtable (memory, sorted) + WAL
memtable full → flush → SSTable (immutable, sorted)
background → compaction merges SSTables
```

Why it's fast for writes: appending sequentially is far cheaper than modifying pages scattered on disk. A write touches memory and an append, not a random page rewrite. That's why LSM trees shine for write-heavy workloads — ingestion, logging, time series, key-value stores.

The cost is on reads and maintenance: a key might live in the memtable *or* in one of several SSTables (the newest version wins), so a read checks multiple places (read amplification), softened by indexes and Bloom filters. And compaction rewrites data repeatedly (write amplification), consuming I/O and SSD wear.

The classic mistakes:

- Ignoring read amplification. A read may probe several levels; without tuning and filters, reads can be much slower than a B-tree's. Know your read pattern.
- Tuning compaction badly or ignoring it. Compaction strategy (size-tiered, leveled) hugely affects read, write and space performance. Defaults and settings matter (see [SSTables and compaction](/t/sstable-compaction)).
- Forgetting write amplification's effect on SSDs. Compaction rewrites data many times, wearing flash and consuming bandwidth (see [write amplification](/t/write-amplification)).
- Assuming one LSM fits all. Configuration (memtable size, level count, compaction) should match the workload; a generic setup may be poor for yours.
- Tombstones lingering. Deletes are often tombstones that persist until compaction removes them; heavy deletes can accumulate.
- Confusing LSM with "no indexes". LSM stores still use in-memory indexes and filters to find keys across SSTables; it's not a scan-everything design.

When to use it: for write-heavy workloads where append throughput matters more than read latency — logging, metrics, event storage, large key-value data. For read-heavy transactional work, a B-tree-based engine often fits better. The trade-off is the core of [B-tree vs LSM](/t/b-tree-vs-lsm).
