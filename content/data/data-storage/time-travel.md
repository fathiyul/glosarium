---
title: "Time Travel"
summary: "Querying a table as it was at an earlier point in time."
levels: { data-engineer: mid-level , data-scientist: mid-level }
aliases: ["AS OF queries", "temporal queries", "table versioning"]
prereqs: ["data-warehouse", "data-retention"]
related: ["mvcc", "snapshot-isolation", "backups", "data-retention-tiers", "lakehouse"]
---

Time travel lets you query a table as it looked at an earlier moment. You name a timestamp or a version, and the engine reads the table's state from then, instead of its current state.

The classic mistake is treating time travel as a backup. It is not. It only covers the history the system chose to keep, and it depends on **retention**: after the retention window the old versions are gone. It also does not help with data deleted outside the table, or with corruption in the underlying files.

Where it does shine is recovering from a specific mistake:

```sql
-- examples; syntax differs by engine
SELECT * FROM orders AT (TIMESTAMP => '2026-01-01 09:00:00');
SELECT * FROM orders FOR SYSTEM_TIME AS OF TIMESTAMP '2026-01-01 09:00:00';
```

Those two lines are from different engines. Snowflake uses `AT`/`BEFORE`, BigQuery uses `FOR SYSTEM_TIME AS OF`, and lakehouse formats like Delta and Iceberg expose version and snapshot syntax. Read your engine's docs — the feature is not standard SQL.

## How it works

Systems implement it in different ways, often on top of versioned storage. [MVCC](/t/mvcc) keeps multiple row versions for concurrent readers; [snapshot isolation](/t/snapshot-isolation) reads a consistent snapshot. Table formats on a [lakehouse](/t/lakehouse) keep old data files and a log of snapshots, so a query can point at an older snapshot.

## Trade-offs

Keeping history costs storage, and the retention window is the limit on how far back you can go. Querying old versions can also scan more files than a current query. When not to rely on it: for disaster recovery, keep real [backups](/t/backups); time travel is for undoing recent, targeted changes. The window is set by the engine or table, so check it rather than assuming.
