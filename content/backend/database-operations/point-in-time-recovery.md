---
title: "Point-in-Time Recovery"
summary: "Restoring a database to any moment using a base backup plus the log."
levels: { backend: senior, data-engineer: senior }
aliases: ["point-in-time recovery", "PITR", "point in time recovery"]
prereqs: ["backups", "wal"]
related: ["logical-vs-physical-backup", "disaster-recovery", "database-high-availability"]
---

**Point-in-time recovery (PITR)** restores a database to a specific moment in the past, not just to when a backup was taken. It combines a base **physical backup** with the continuous stream of **[write-ahead log](/t/wal)** records: you restore the backup, then replay WAL up to the chosen timestamp.

```text
restore base backup (say, last night) → replay WAL → stop at 14:32:10
target: the instant just before the bad deploy
```

This is the tool for the worst-case accident: a bad migration, an accidental `DELETE` without a `WHERE`, a corrupted batch update. Instead of losing everything since the last backup, you recover to the second before the mistake, then selectively recover the lost data if needed.

It matters because mistakes are often *logical* (a wrong statement) rather than infrastructural. [High availability](/t/database-high-availability) doesn't help — a standby replicates the mistake. Backups alone lose recent data. PITR recovers to the precise moment.

The classic mistakes:

- No WAL archiving, so only "to the backup". PITR requires the WAL to be continuously archived (or retained) *and* the base backup. Without WAL, you can only restore to the backup's moment, potentially losing hours.
- Assuming replicas give you PITR. Replicas are current, not historical; they can't rewind. PITR needs backups + WAL, kept with history.
- Recovering in place over the live database. The safe practice is to recover to a *new* instance, verify, and then swap — never overwrite the only copy while the cause is unresolved.
- Forgetting the recovery window. Retention settings determine how far back you can go; if the WAL is pruned too soon, old points are unrecoverable. Know your window.
- Not testing restores. An untested PITR procedure tends to fail when needed. Rehearse it.
- Restoring everything when you needed one table. A full PITR is heavy; sometimes restoring to a side instance and extracting the needed rows is better (or a logical restore for a table).
- Overlooking the cause. Recovering without fixing the bug that caused the loss risks repeating it moments later. Find and fix first.

**How to build it:** take regular base backups, archive the WAL continuously, store both off the primary, know your retention window, and rehearse recovery to a side instance. It's the difference between "we lost the day's orders" and "we recovered to the second before the mistake" — the strongest safety net for a database, alongside ordinary [backups](/t/backups). See [disaster recovery](/t/disaster-recovery).
