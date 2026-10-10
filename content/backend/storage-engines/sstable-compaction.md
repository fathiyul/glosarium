---
title: "SSTables and Compaction"
summary: "Sorted immutable files and the background process that merges them."
levels: { backend: senior, data-engineer: senior }
aliases: ["sstables and compaction", "sstable", "compaction"]
prereqs: ["lsm-tree", "storage-engine"]
related: ["lsm-tree", "write-amplification", "b-tree-vs-lsm", "storage-engine"]
---

In an [LSM tree](/t/lsm-tree), flushed writes become **SSTables** — immutable, sorted files on disk. Over time there are many, and the same key can appear in several (the newest version wins). **Compaction** merges SSTables into fewer, larger ones, discarding overwritten and deleted (tombstoned) versions, so reads don't have to check an ever-growing number of files.

```text
many small SSTables → compaction → fewer, larger SSTables (garbage removed)
```

Compaction is what keeps an LSM tree healthy: it bounds **read amplification** (fewer files to check), reclaims space from overwritten/deleted data, and keeps the level structure organised. It runs in the background and is central to LSM tuning.

The trade-off is **write amplification**: compaction rewrites data multiple times (a byte written once may be rewritten several times as it moves down levels), consuming disk bandwidth and SSD endurance (see [write amplification](/t/write-amplification)). So compaction is a constant tension between read efficiency and write/space cost.

The common strategies:

- Size-tiered — merge similarly-sized files; good for write-heavy, ingest-style workloads; can leave higher read amplification.
- Leveled — organise files into levels with bounded overlap; better read performance, more write amplification.

The classic mistakes:

- Tuning compaction for the wrong workload. A strategy that's great for bulk ingest can hurt a read-heavy or update-heavy pattern, and vice versa. Match it to your access pattern.
- Ignoring compaction's I/O. Background compaction competes with foreground reads/writes; if it can't keep up, read amplification grows and latency spikes. Monitor compaction lag.
- Letting compaction fall behind. A backlog of SSTables means reads slow down and disk fills; sustained write pressure without enough compaction capacity is a common failure.
- Forgetting tombstones. Deletes add tombstones that linger until compaction; heavy delete patterns consume space and read time until merged.
- Assuming compaction is free or optional. It's essential; disabling or starving it degrades the engine over time.
- Changing strategies without benchmarking. Strategy changes affect read, write and space; measure on your workload.

How to manage it: choose a compaction strategy matching your read/write mix, size the system so compaction keeps up, monitor compaction backlog and read amplification, and accept the write-amplification cost as the price of a healthy LSM tree. It's the maintenance that makes the LSM's fast writes usable over time — see [LSM tree](/t/lsm-tree).
