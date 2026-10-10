---
title: "Fixing Data in Production"
summary: "Correcting bad rows safely: a reviewed script, a backup, and a record of what changed."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["data fix", "production data fix", "correcting bad data"]
prereqs: ["database", "backups"]
related: ["transaction", "audit-columns", "idempotence", "adhoc-production-queries", "production-console"]
---

When data is wrong — a bad import, a bug that wrote the wrong value, a migration that mis-set a column — you often have to correct it in production. Data changes are the highest-risk kind of production work, because a mistake can be hard or impossible to undo. The discipline is to be careful, reversible and recorded.

A safe sequence:

1. Understand the scope first. How many rows, which ones, is it still happening? A read-only query answers this (see [ad-hoc queries](/t/adhoc-production-queries)).
2. Fix the cause, not just the rows. If the bug still writes bad data, your fix will be overwritten. Deploy the code fix first.
3. **Write a reviewed script.** Not a hand-typed command. Someone else reads it before it runs.
4. **Back up the affected data.** Take a [backup](/t/backups) or snapshot of the rows (or table) so you can restore.
5. Dry-run / test on a copy. Run the script against a copy or a single row and check the result.
6. **Run it in small batches in a [transaction](/t/transaction).** A huge single update can lock a table and block the app.
7. **Record what changed.** Log the before/after, or write to [audit columns](/t/audit-columns), so there's a paper trail.
8. Verify afterwards. Re-run the query that found the problem and confirm the count is now correct.

```sql
-- review, back up, then batch
BEGIN;
UPDATE orders SET status = 'refunded'
WHERE id IN (101, 102, 103) AND status = 'paid';
COMMIT;
```

The classic mistakes: an ad-hoc `UPDATE` with a wrong or missing `WHERE` (which can hit the whole table), no backup, one giant transaction that locks everything, and no record of what was changed. Make the script [idempotent](/t/idempotence) where possible so a re-run is safe.

A data fix that changes a value another system depends on may need to be paired with a [migration tool](/t/migration-tools) or a coordinated replay. Treat the whole thing as a small project, not a quick command.
