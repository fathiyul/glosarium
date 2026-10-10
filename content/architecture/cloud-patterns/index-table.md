---
title: "Index Table"
summary: "A separate table that indexes data by a field the main store can't query efficiently."
levels: { backend: senior }
aliases: ["index table", "secondary index table", "lookup table pattern"]
prereqs: ["key-value-store", "denormalization"]
related: ["denormalization", "single-table-design", "eventual-consistency"]
---
The **index table** pattern maintains a separate lookup structure for non-key queries on key-value stores: duplicate the needed attributes under alternate keys (by email, by status, by date), keeping them consistent via transactional writes or change-feed propagation. NoSQL's single efficient access path multiplies into many through maintained duplicates.

```text
main:  PK=user#42 → full record
index: EMAIL#x@y → user#42 | STATUS#active → [user#42, …]  (maintained on write)
```

Consistency is the design surface: transactional dual-write (atomic where supported), change-stream propagation (eventual, ordered), or periodic rebuild (simple, stale). Each suits different freshness needs; all beat full scans.

The classic mistakes:

- Ad-hoc queries without indexes. Scanning entire tables for "users by status" collapses at scale. Model access patterns first; build index tables for each.
- Inconsistent dual writes. Main and index updated in separate non-atomic steps diverge on partial failure. Transact where possible; propagate via streams otherwise.
- Index-everything enthusiasm. An index per conceivable query multiplies write amplification and storage. Index measured access patterns, not hypothetical ones.
- Hot index partitions. A status index with one giant value (99% "active") concentrates reads/writes pathologically. Shard hot index keys (suffixes, time-buckets).
- Stale reads presented as fresh. Eventually-consistent indexes serving user-visible state need freshness signals (timestamps, "updating" states) or transactional guarantees where correctness demands.
- Deletion gaps. Removed records lingering in index tables resurrect ghosts in queries. Delete flows must cover every index (tombstones, transactional deletes).
- Rebuild story missing. Corrupted or diverged indexes need full rebuild paths; without them, drift accumulates permanently. Build rebuild tooling with the index.

**How to use it:** model queries first, maintain indexes transactionally-or-streamed, shard hot keys, rebuild deliberately. Key-value speed for every access pattern — at the cost of maintained duplication.
