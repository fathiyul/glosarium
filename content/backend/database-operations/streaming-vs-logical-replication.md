---
title: "Streaming vs Logical Replication"
summary: "Copying the raw log vs copying row changes, and what each lets you do."
levels: { backend: senior, data-engineer: senior }
aliases: ["streaming replication", "logical replication", "physical vs logical replication"]
prereqs: ["wal", "database"]
related: ["database-high-availability", "point-in-time-recovery", "sql"]
---

Both replicate changes from one database to another, but at different levels.

- Streaming (physical) replication ships the [write-ahead log](/t/wal) — the raw physical changes to data pages — to a standby, which applies them byte-for-byte. The standby is a **bit-identical copy** of the primary: same version, same platform, whole cluster. It's the standard basis for [high availability](/t/database-high-availability) and read replicas, and it's fast and low-overhead.
- Logical replication decodes the WAL into **logical changes** (row inserts/updates/deletes on specific tables) and applies them to another database. Because it's logical, the target can differ — a different version, selected tables only, transformed rows — and it can feed non-database consumers (change data capture).

```text
streaming: WAL pages → identical standby (whole cluster, same version)
logical:   row changes → flexible target (subset, transform, different version)
```

The classic mistakes:

- Choosing streaming when you need selective or cross-version replication. Physical replication copies everything and requires a matching version/platform. If you need one table, a different version, or to feed a service, use logical.
- Choosing logical for hot standby failover. Logical replication is more flexible but has more overhead and different failover characteristics; for straightforward HA standbys, streaming is the normal choice.
- Ignoring the schema on the target. Logical replication requires compatible table structures on the target and applies row changes; schema changes need coordination (and aren't always replicated automatically).
- Assuming logical replication is conflict-free. If the target also receives writes, conflicts can arise; typically the target is read-only or owned by the replication.
- Overlooking replication lag. Both are asynchronous by default; a replica can fall behind. Reads from it may be stale (see [sync vs async replication](/t/sync-vs-async-replication)).
- Forgetting that neither replaces backups. A replica reproduces mistakes; you still need [backups](/t/backups) and [PITR](/t/point-in-time-recovery).
- Underestimating logical replication's overhead. Decoding and applying logical changes costs more CPU and can be slower under heavy write load.

**How to choose:** streaming (physical) for HA standbys and read replicas — the default for keeping a copy of the whole database. Logical for selective replication, cross-version migration, feeding data pipelines, or zero-downtime upgrades. Many systems use streaming for HA and logical for data movement — the same WAL serving two purposes.
