---
title: "Data Migration"
summary: "Moving or transforming existing data."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["data migration", "backfill", "data backfill"]
prereqs: ["schema-migration", "backups"]
related: ["migration-tools", "schema-and-code-deploys", "idempotence", "online-schema-change"]
---

A **data migration** changes the data itself — backfilling a new column, moving records to a new table, transforming values — as opposed to changing the schema. It's often the risky half of a database change: schema changes are mechanical, but moving live data can lose or corrupt it if it goes wrong.

```text
add column discounts → backfill it from existing rows → switch reads → later drop old column
```

Common shapes: a **backfill** (compute a value for existing rows), a **move** (copy rows to a new structure), a **transform** (change a value's format), and a split/merge (restructure).

The classic mistakes:

- Doing it in one big transaction. Updating millions of rows in a single statement locks the table and can blow up the transaction log. Batch it — chunks of a few thousand, with pauses.
- No backup or verification. Before changing data, have a [backup](/t/backups), and after, verify counts and values. Without a check, silent corruption goes unnoticed.
- Not idempotent. If the migration dies halfway and is re-run, it can double-apply. Make each batch safe to re-run (see [idempotence](/t/idempotence)).
- Running and forgetting. Migrations deployed as code but not actually run leave the database inconsistent with the app. Track what has run.
- Zero-downtime mismatch. If new code expects the backfilled column while old data isn't migrated, reads fail or return wrong results. Backfill *before* switching reads (see [schema and code deploys](/t/schema-and-code-deploys)).
- Not throttling. A backfill competes with live traffic for I/O and locks; run it slowly, off-peak, with monitoring.
- No observability. Log progress, count remaining rows, and make it resumable — a long migration you can't observe is a black box.

How to do it: plan the steps, back up, batch and throttle, make it resumable and idempotent, verify, and coordinate with the code deploy that depends on it. Tools often help (see [migration tools](/t/migration-tools) and [online schema change](/t/online-schema-change)). Treat data as the precious thing it is — schema can be rebuilt, data often can't.
