---
title: "Zero-Downtime Migration"
summary: "Changing the schema while the app keeps serving traffic."
levels: { backend: senior, data-engineer: senior }
aliases: ["online migration", "zero downtime schema change", "no-downtime migration", "online schema change", "live migration"]
prereqs: ["schema-migration", "expand-contract-migration"]
related: ["expand-contract-migration", "online-schema-change", "migration-locks", "backfill", "schema-and-code-deploys", "rollback-migration"]
core: [backend]
---

A **zero-downtime migration** changes the database schema **while the application keeps serving traffic**, with no maintenance window and no errors. It requires avoiding two kinds of trouble: **locks** that block queries, and **incompatibility** between the schema and whichever app version is running.

## Problem 1: locks

Many schema changes take **heavy locks** or **rewrite the whole table**, blocking reads and writes for as long as it takes. On a big table, that's minutes or hours of outage. What's safe depends heavily on your database and version, so check the documentation. Common patterns for PostgreSQL, as examples:

```sql
-- Adding a nullable column is cheap. A constant default is also fast in recent versions,
-- but check your version: older ones rewrote the table.
ALTER TABLE orders ADD COLUMN note TEXT;

-- Build indexes without blocking writes:
CREATE INDEX CONCURRENTLY idx_orders_customer ON orders (customer_id);

-- Add a constraint without scanning under a heavy lock: add as NOT VALID, then validate separately
ALTER TABLE orders ADD CONSTRAINT fk_customer FOREIGN KEY (customer_id) REFERENCES customers (id) NOT VALID;
ALTER TABLE orders VALIDATE CONSTRAINT fk_customer;
```

MySQL and others have their own online DDL capabilities and restrictions. For changes that would rewrite or lock a huge table, **online schema change tools** (such as gh-ost and pt-online-schema-change for MySQL) copy the table in the background and swap it in ([online schema change](/t/online-schema-change)).

**Always set a lock timeout** for DDL, so a migration waiting for a lock doesn't queue up and block everything behind it ([migration locks](/t/migration-locks)):

```sql
SET lock_timeout = '3s';       -- fail fast and retry later instead of blocking traffic
```

A long-running transaction can block a quick `ALTER TABLE`, which then blocks all later queries. Check for long transactions first.

## Problem 2: compatibility

During a rolling deploy, **old and new code run together**, and either might run against the old or the new schema. So every schema change must be **backward-compatible with the running code**, and every code change must work with the schema before and after the migration. Use [expand–contract](/t/expand-contract-migration):

- **Add before use, stop using before removing.**
- Don't rename or drop in one step.
- Make new columns nullable or defaulted, so old code's inserts still work.

The ordering rules are in [schema and code deploys](/t/schema-and-code-deploys).

## Problem 3: data volume

- **Backfills** run in **small batches** with pauses, so they don't saturate the database or cause replication lag ([backfill](/t/backfill)).
- Watch **replication lag** and connection pool usage during the migration.

## Process

- **Rehearse on production-like data**, and measure lock times and duration.
- **Have a rollback plan** for each step ([rollback](/t/rollback-migration)). Many steps can't be undone (dropped data), so back up and delay destructive steps.
- **Run during lower traffic** when possible, and **monitor** error rates, latency and lock waits live.
- **Separate migrations from deployments** where possible, and keep each change small.
- **Automate in CI/CD**, with safety checks (linters that flag unsafe migrations).

Zero downtime isn't a magic feature. It's a discipline of small, compatible, lock-aware steps.
