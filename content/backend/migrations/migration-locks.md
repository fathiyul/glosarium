---
title: "Migration Locks"
summary: "Schema changes that lock tables and take production down."
levels: { backend: senior, data-engineer: senior }
aliases: ["migration locks", "schema migration locks", "ddl locks"]
prereqs: ["schema-migration", "pessimistic-locking"]
related: ["online-schema-change", "row-vs-table-lock", "migration-tools"]
---

Many schema changes take a **lock** on the table for the duration of the operation — some exclusive, some blocking writes, some merely holding a queue. On a large, busy table, that lock can stall the application: queries wait behind the migration, connections pile up, and a "quick" column change causes an outage.

```text
ALTER TABLE orders ADD COLUMN x ... → takes a lock → writes wait
```

Even a metadata-only change can be disruptive because of how locks queue: a migration waiting for a lock can block *new* queries behind it, even ones that would otherwise be compatible. A short migration can thus cause a long stall indirectly.

The classic mistakes:

- Running DDL during peak traffic. A lock that's fine at 3am is an outage at noon. Schedule schema changes for low-traffic windows.
- Assuming "metadata only" is always instant and safe. Adding a nullable column may be fast in one database and rewrite the table in another; and regardless, the lock acquisition can block. Know your database's actual behaviour.
- Ignoring lock queues. A blocked migration can block subsequent requests, so "it only ran for a second" hides a longer wait. Check for waiting locks during migrations.
- No lock timeout. A migration that waits forever for a lock can pile up requests indefinitely. Set a lock timeout so it fails fast rather than cascading.
- Rewriting large tables in place. Operations that rewrite (change type, add index on big tables) hold heavy locks and take time; use online techniques.
- Forgetting dependent objects. Locks on a parent table can block access to children via foreign keys, widening the impact.

**How to avoid the stall:** schedule during quiet periods, set a lock timeout, keep migrations small, and use online schema-change techniques for large or busy tables (see [online schema change](/t/online-schema-change)). Test the migration's lock behaviour on a copy at production scale. For big tables, the answer is usually not "run the ALTER" but "do it without blocking".
