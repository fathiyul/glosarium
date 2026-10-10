---
title: "Zero-Copy Clone"
summary: "Copying a table instantly by sharing its underlying files."
levels: { data-engineer: senior }
aliases: ["zero-copy cloning", "table cloning", "clone table", "zero copy clone"]
prereqs: ["compute-storage-separation", "data-warehouse"]
related: ["time-travel", "open-table-format", "data-sharing", "file-compaction", "lakehouse", "mpp-warehouse"]
---

A **zero-copy clone** creates a new table (or schema, or database) that shares the original's underlying data files instead of copying the bytes. It looks like a full, independent copy, but at the moment you create it, it takes almost no extra storage.

```
orders          ─┐
                 ├── both point at the same files in storage
orders_dev      ─┘
```

When either side is written to, the platform writes new files for the changed data and leaves the shared files alone (copy-on-write). Storage grows only for the parts that diverge.

Platforms that support this name it differently — Snowflake's `CREATE TABLE ... CLONE`, Databricks table clones and BigQuery table clones are examples — so check the syntax and exact semantics of the one you use.

## Why it matters

The classic mistake is copying terabytes of production data to get a realistic dev or test environment. The copy takes a long time, doubles storage, and has to be refreshed. A clone gives you a full, writable copy in seconds and pays only for what changes.

Other uses: a scratch copy for an experiment, a point-in-time snapshot before a risky migration, and a branch of a table for testing a pipeline change.

```sql
-- Snowflake-style; other platforms differ
CREATE TABLE orders_dev CLONE orders;
```

## Trade-offs

- A clone reflects a **point in time**. Rows written to the original after the clone was created are usually not in the clone, unless the platform offers a way to refresh it or clone "at a time".
- Diverged clones accumulate storage. Each side keeps its own changed files, so a clone that gets heavy writes is no longer cheap.
- Dropping the original doesn't always free the files. Shared files stay as long as some clone still references them.
- A clone is **not a backup**. It usually depends on the same underlying files and the platform's retention settings, so a retention cleanup can remove history you assumed was safe.
- Semantics vary: some platforms clone data, others clone only metadata or offer shallow copies. Read the docs for yours.

Clones rely on shared, immutable files in storage, which is why they show up in systems built on [storage and compute separation](/t/compute-storage-separation) and [open table formats](/t/open-table-format). They pair naturally with [time travel](/t/time-travel) and are a lightweight alternative to [data sharing](/t/data-sharing) when the other side is on the same platform.
