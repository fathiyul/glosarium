---
title: "Logical vs Physical Backups"
summary: "SQL dumps vs copies of the data files."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["logical backup", "physical backup", "logical vs physical backup"]
prereqs: ["backups", "database"]
related: ["point-in-time-recovery", "wal", "disaster-recovery"]
---

Backups come in two fundamental kinds, and knowing the difference tells you which fits which need.

- **Logical backup** — export the data as statements or records: `pg_dump` producing `INSERT`s, a CSV export, a BSON dump. It's readable, portable across versions and even platforms, and lets you restore *selected* tables or rows. But it's slow to produce and slow to restore for large databases, and it captures a point-in-time snapshot.
- Physical backup — copy the database's actual files (and the [write-ahead log](/t/wal) needed for consistency). It's fast to take and fast to restore, and by replaying WAL it supports [point-in-time recovery](/t/point-in-time-recovery). But it's tied to the same database version and platform, and you restore the whole thing.

```text
logical:  dump → statements/rows  (portable, selective, slow)
physical: copy files + WAL         (fast, whole, same version)
```

The classic mistakes:

- Assuming a logical dump is enough for large databases. A multi-hour dump/restore can blow your recovery-time objective. For big systems, physical plus WAL is the fast road back.
- Expecting physical backups to be portable. Moving a physical backup to a different major version or platform usually fails; use logical for migrations between versions.
- No WAL for point-in-time recovery. A physical backup alone restores to when the backup was taken; to recover to a specific moment (just before a bad migration) you need the WAL too.
- Believing a backup is a backup without testing restore. Both kinds are worthless if the restore hasn't been verified. Test restores regularly.
- Backing up only the data, not roles/config. A restore that's missing users, extensions or configuration isn't a recovery. Capture the whole setup.
- Storing backups next to the database. A backup on the same disk/region as the live database dies with it. Keep copies off-site/off-region.
- Assuming replicas are backups. A replica faithfully reproduces a mistaken `DELETE`; it's not a backup. You need history (see [high availability](/t/database-high-availability)).

**How to choose:** often *both* — regular physical backups with WAL for fast, granular recovery, plus periodic logical dumps for portability, selective restores and version migrations. Whatever you use, verify restores and store copies away from the primary. See [point-in-time recovery](/t/point-in-time-recovery) and [disaster recovery](/t/disaster-recovery).
