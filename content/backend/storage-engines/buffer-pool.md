---
title: "Buffer Pool / Page Cache"
summary: "Keeping hot disk pages in memory."
levels: { backend: senior, data-engineer: senior }
aliases: ["buffer pool", "page cache", "buffer cache"]
prereqs: ["storage-engine", "ram"]
related: ["storage-engine", "cache-hit-miss", "checkpoint", "b-tree-vs-lsm"]
---

A **buffer pool** (or page cache) is the database's in-memory cache of disk **pages**. The engine reads and writes data in fixed-size pages; before a page is used it's loaded into the pool, and future accesses to that page are served from memory. Because [RAM is orders of magnitude faster than disk](/t/latency-numbers), keeping hot pages cached is the single biggest factor in query performance.

```text
read page → in buffer pool?  hit → return from memory
                             miss → fetch from disk, cache, evict something
```

When the pool is full, a page must be **evicted** (often with an LRU-like policy) to make room. A page changed in memory (dirty) is written back to disk later, at a [checkpoint](/t/checkpoint). The **hit ratio** — the share of reads served from the pool — is a key metric: a high hit ratio means disk is mostly avoided.

The classic mistakes:

- Sizing the pool too small. An undersized buffer pool means constant disk reads (a "cold" working set). Sizing it to hold the hot data is often the biggest tuning lever; too big and it starves the OS or other processes.
- A working set larger than the pool. If the actively-used data exceeds the pool, pages are evicted before reuse and the hit ratio collapses — the database thrashes the disk. Add memory, or reduce the working set.
- Forgetting the OS page cache. The OS also caches file pages; double caching (database pool + OS) can waste memory unless configured (e.g. direct I/O).
- Ignoring the impact of one huge query. A scan that pulls a massive amount of data through the pool evicts the genuinely hot pages, hurting everyone. Bound large queries.
- Mixing it up with a result cache. The buffer pool caches *pages*, not query results; it doesn't save you recomputing work, only re-reading pages.
- Neglecting dirty-page writeback. Too many dirty pages slow a checkpoint and lengthen crash recovery; the writeback pacing matters (see [checkpoint](/t/checkpoint)).

How to think about it: the buffer pool is where the database keeps its working set in memory; its size, hit ratio and eviction behaviour decide whether queries hit RAM or disk. Understanding it explains "why is my database slow even though the query is indexed?" — the answer is often a cold or undersized pool (see [cache hit/miss](/t/cache-hit-miss)).
