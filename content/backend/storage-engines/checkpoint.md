---
title: "Checkpoint"
summary: "Flushing in-memory changes to disk so recovery doesn't replay the whole log."
levels: { backend: senior, data-engineer: senior }
aliases: ["checkpoint", "database checkpoint", "checkpointing"]
prereqs: ["wal", "storage-engine"]
related: ["buffer-pool", "wal", "database-high-availability"]
---

A **checkpoint** is the process of flushing the database's in-memory (dirty) data pages to their data files on disk, so that the [write-ahead log](/t/wal) up to that point is no longer needed for recovery and can be truncated. It periodically reconciles the fast, append-only WAL with the actual data files.

```text
writes → WAL (durable, append) + dirty pages in buffer pool
checkpoint → write dirty pages to data files → WAL before this point can be discarded
```

Why it matters: without checkpoints, crash recovery would have to replay the *entire* WAL from the beginning, taking longer and longer as the database runs. After a checkpoint, recovery only needs to replay from the last checkpoint forward — bounded recovery time. Checkpoints also let the WAL (and its disk usage) be recycled.

The classic mistakes:

- No checkpoints → endless WAL growth and recovery. Without checkpointing, the log grows without bound and recovery replays everything. The database effectively never forgets. Checkpoints bound both.
- Checkpoints too aggressive. Frequent checkpoints cause bursts of I/O as many dirty pages flush at once, harming performance. They should be spread out gradually.
- Checkpoints too infrequent. Rare checkpoints mean a long recovery time and a large WAL, and more data to redo after a crash. Balance I/O impact against recovery time.
- Confusing checkpoints with commits. A commit means the *WAL* is durable; it doesn't mean data files are updated. Checkpoints handle the latter. Durability lives in the WAL, not the data files.
- Forgetting the impact of write spikes. A burst of writes creates many dirty pages, and a checkpoint must flush them; on slow storage this can stall.
- Ignoring checkpoint behavior on replicas. Standbys redo the primary's WAL; checkpoint timing affects their lag and recovery too.

**How to think about it:** the WAL makes commits durable; checkpoints make the data files catch up so recovery stays bounded and disk doesn't fill with log. Tuning the frequency is a trade between I/O spikes and recovery time. It's a core part of the [storage engine](/t/storage-engine)'s durability machinery, alongside the [buffer pool](/t/buffer-pool) it flushes (see [write-ahead log](/t/wal)).
