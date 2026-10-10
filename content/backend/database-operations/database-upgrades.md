---
title: "Database Version Upgrades"
summary: "Moving to a new major version with little downtime."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["database upgrade", "database version upgrade", "major version upgrade"]
prereqs: ["database", "backups"]
related: ["disaster-recovery", "migration-tools", "database-high-availability"]
---

A **database version upgrade** moves a database to a new major version — for security patches, features or support. Minor patches are routine; **major** upgrades can change storage formats, query behaviour, defaults and deprecated features, making them a project rather than a maintenance task.

The common approaches:

- In-place upgrade — the database converts itself on the existing machine. Fast to do, some downtime, and hard to roll back (the data has changed).
- Dump and restore — export from the old version, import into a fresh new-version database. Portable and lets you validate, but slow for large datasets and needs a maintenance window.
- Replica upgrade / blue-green — build a new-version replica, let it catch up, and switch over. Minimal downtime, but more infrastructure and operational care.

```text
in-place:  upgrade now, downtime, hard to revert
dump:      export → import new version, portable, slow
replica:   new-version copy → switch over, low downtime
```

The classic mistakes:

- Upgrading without testing the application. New versions change behaviour and remove deprecated features; a query or driver that worked before may break. Test the app against the new version before switching.
- No recent backup. An upgrade that fails can leave data in a converted state; a tested [backup](/t/backups) (and preferably [point-in-time recovery](/t/point-in-time-recovery)) is non-negotiable.
- Ignoring compatibility and deprecations. Deprecated syntax, removed extensions and behaviour changes are the usual upgrade surprises. Read the release notes and check for removed features.
- Underestimating the time. Large datasets take hours to convert or dump/restore; the maintenance window must fit the *actual* time, with margin.
- No rehearsed rollback plan. In-place upgrades are hard to undo; know in advance whether you can roll back and how, or accept forward-only with a validated backup.
- Skipping too far. Jumping multiple major versions at once is riskier than stepping through; some databases require intermediate versions.
- Forgetting the replicas and tooling. Replicas, drivers, backup tools and monitoring agents may need upgrading in step.

**How to do it:** rehearse on a copy at realistic size, test the application, back up, choose the least-disruptive approach you can manage (replica switchover is best if available), and execute in a planned window with a rollback or recovery plan. It's a routine operation done rarely — treat it with the care that infrequency invites. See [high availability](/t/database-high-availability).
