---
title: "Rolling Back a Migration"
summary: "Undoing a migration, and why some can't be undone."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["rollback migration", "revert migration", "down migration"]
prereqs: ["schema-migration", "backups"]
related: ["migration-tools", "schema-and-code-deploys", "backups", "roll-forward"]
---

**Rolling back a migration** means reversing a database change — dropping a column you added, restoring values you transformed, un-splitting a table. Migration tools often pair each migration with a "down" step, and the assumption is that you can undo any change.

In practice, rollback is often harder than forward migration, and sometimes impossible. Adding a column is easy to reverse (drop it); *dropping* a column or *transforming* data is another matter — the old data is gone unless you kept it.

```text
reversible:   add nullable column            → drop it
hard:         drop a column                  → data is gone
impossible:   transform values in place      → originals not kept
```

The classic mistakes:

- Assuming every migration has a clean inverse. Many don't. Dropping a column loses data; a lossy transform can't be undone. Plan for the irreversibility before you run it.
- Writing the down migration unsafely. A "down" that drops a column destroys data if it's actually needed; a "down" that re-adds a column may not restore values. Test rollbacks, and be honest when they're destructive.
- Rolling back a schema the old code can't use. Like forwards, backwards changes must be compatible with the application version running at the time (see [schema and code deploys](/t/schema-and-code-deploys)). A rollback that breaks the live app is worse than no rollback.
- Relying on rollback instead of safe forward steps. Prefer the expand-contract approach — additive, reversible steps — so you rarely *need* to roll back (see [roll forward](/t/roll-forward)).
- No backup for destructive changes. For anything that drops or transforms data, a [backup](/t/backups) (or point-in-time recovery) is your real rollback.
- Forgetting the deployed code. A database rollback usually implies reverting the app too; coordinate them.

**How to handle it:** design migrations to be reversible where possible (add first, drop last, keep old data until safe), test the down path, and for genuinely destructive changes rely on backups and [point-in-time recovery](/t/point-in-time-recovery) rather than a hand-written inverse. Assume the safest rollback is often "fix forward" — see [migration tools](/t/migration-tools) and [roll forward](/t/roll-forward).
