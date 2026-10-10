---
title: "One-Off Scripts"
summary: "Scripts run once against production, and why they deserve review and tests too."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["one-off script", "throwaway script", "migration script"]
prereqs: ["production-data-fix", "backups"]
related: ["adhoc-production-queries", "production-console", "idempotence", "break-glass-access", "runbook"]
---

A **one-off script** is a small program you run once against production: a backfill, a data correction, a cleanup, a migration. It feels disposable — you write it in an afternoon, run it, and move on. But it touches real data, and "disposable" is exactly why it's dangerous: nobody reviews it, it's never tested, and it has no second chance if it's wrong.

**Treat it like code that matters**, because it is.

- Review it. Someone else reads it before it runs, especially the `WHERE` clauses.
- Test on a copy. Run it against a snapshot or a test database first, not against production.
- Back up first. If it changes or deletes data, have a [backup](/t/backups) to fall back on.
- Make it [idempotent](/t/idempotence). If it dies halfway and you re-run it, it shouldn't double-apply. Prefer updates that check current state over blind increments.
- Log what it did. Record the before/after or write to [audit columns](/t/audit-columns), so there's a trail.
- Run it in small batches, inside transactions, so it doesn't lock a table or hammer the database.

```python
# reviewed, idempotent, bounded
for batch in fetch_users_missing_plan(limit=500):
    set_plan_if_missing(batch)   # no-op if already set
```

The classic mistakes: hand-typing the script directly into a [production console](/t/production-console) (no review, no record), skipping the backup, and writing something that only works once — so a retry after a crash corrupts data. Keep the script itself somewhere version-controlled too, so future-you can see what changed what.

A one-off script is a small [data fix](/t/production-data-fix) or query; see [ad-hoc queries](/t/adhoc-production-queries) for the read-only side. Run them under proper [break-glass](/t/break-glass-access) access, and capture the steps in the [runbook](/t/runbook) so the next person doesn't rewrite it from scratch.
