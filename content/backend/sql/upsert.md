---
title: "Upsert"
summary: "Insert, or update if the row exists, in one statement."
levels: { backend: mid-level, data-engineer: junior }
aliases: ["INSERT ON CONFLICT", "ON DUPLICATE KEY UPDATE", "MERGE", "insert or update", "INSERT OR REPLACE"]
prereqs: ["primary-key", "constraint"]
related: ["unique-constraint-guard", "idempotence", "race-condition", "crud", "constraint"]
core: [data-engineer]
also: [ingestion]
---

An **upsert** means "**insert** this row, or **update** it if one already exists", as a single atomic statement. The name
combines update and insert.

Without it, you'd write check-then-insert in code, which is a [race condition](/t/race-condition): two processes both see "no row", and
both insert, so one fails or you get duplicates.

```sql
-- PostgreSQL and SQLite
INSERT INTO daily_stats (day, visits)
VALUES ('2024-06-01', 120)
ON CONFLICT (day)
DO UPDATE SET visits = EXCLUDED.visits;

-- MySQL
INSERT INTO daily_stats (day, visits)
VALUES ('2024-06-01', 120)
ON DUPLICATE KEY UPDATE visits = VALUES(visits);

-- SQL standard; used by SQL Server, Oracle, and others (newer PostgreSQL versions too)
MERGE INTO daily_stats t USING (SELECT '2024-06-01' AS day, 120 AS visits) s ON t.day = s.day
WHEN MATCHED THEN UPDATE SET visits = s.visits
WHEN NOT MATCHED THEN INSERT (day, visits) VALUES (s.day, s.visits);
```

The syntax differs between databases. The idea is the same.

## What it needs

A **unique constraint or primary key** that defines "the same row" (here `day`). The database uses it to detect the conflict.
That's also what makes it safe under concurrency ([unique constraint as a guard](/t/unique-constraint-guard)).

## Why data engineers love it

Loading data should be **idempotent**: running a pipeline twice, because of a retry or a backfill, must not create duplicates
([idempotence](/t/idempotence)). Upserting by a business key makes reruns harmless:

```sql
INSERT INTO customers (id, name, updated_at)
SELECT id, name, updated_at FROM staging_customers
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, updated_at = EXCLUDED.updated_at;
```

## Cautions

- **Decide what happens on conflict**: overwrite everything, only some columns, or do nothing
  (`ON CONFLICT DO NOTHING`).
- **Don't overwrite newer data with older**: add a condition on the timestamp if records may arrive out of order.
- **Duplicates within the incoming batch** can cause an error or arbitrary results. Deduplicate the source first.
- **Row counts** from upserts don't separate inserts from updates in every database.
- Upserts that fire triggers or rewrite many rows can be heavy. Test with realistic volumes.
