---
title: "VACUUM and Bloat"
summary: "Cleaning up dead rows in PostgreSQL."
levels: { backend: senior, data-engineer: senior }
aliases: ["vacuum", "autovacuum", "table bloat"]
prereqs: ["mvcc", "storage-engine"]
related: ["db-index", "disk-usage", "transaction"]
---

In an [MVCC](/t/mvcc) database, an update doesn't overwrite a row — it writes a new version and marks the old one dead; a delete just marks the row dead. The old versions stay on disk until something reclaims them. **VACUUM** does that reclamation, and the space it hasn't yet reclaimed is called **bloat**.

```text
UPDATE row → new version written, old version becomes dead
VACUUM     → dead versions reclaimed for reuse
no VACUUM  → table and indexes keep growing (bloat)
```

Bloat hurts in two ways: tables and indexes occupy more disk, and scans and index lookups touch more pages, so queries get slower. Reclaiming keeps the physical size in line with the live data. Most databases run **autovacuum** automatically; it just has to keep up.

The classic mistakes:

- Autovacuum can't keep up. On a high-update table, autovacuum may not fire often enough; bloat grows and performance degrades. Tune its thresholds for hot tables.
- Long-running transactions blocking cleanup. Vacuum can't reclaim versions that some open transaction might still need to see. A transaction left open for hours (or an idle-in-transaction connection) pins old versions and blocks reclamation — a frequent cause of runaway bloat.
- Confusing VACUUM with VACUUM FULL. A regular VACUUM marks space for reuse but doesn't shrink the file; `VACUUM FULL` rewrites the table to actually shrink it, taking an exclusive lock. Don't run FULL casually on a live system.
- Forgetting indexes. Index entries for dead rows also need cleanup; vacuum handles them, but an unvacuumed table has bloated indexes too.
- Treating disk usage as the only symptom. Bloat's bigger cost is often *slower queries*, not just storage. Watching query latency can reveal bloat before disk alarms do.
- Ignoring it until it's severe. By the time bloat is huge, cleanup is expensive and may need maintenance. Monitor table bloat and transaction age.

**How to manage it:** keep autovacuum healthy (tuned for your write rate), avoid long-running transactions, and monitor bloat and disk usage. It's a maintenance concern specific to MVCC storage engines — a trade-off they accept in exchange for readers not blocking writers (see [MVCC](/t/mvcc)). Periodically forced `VACUUM (ANALYZE)` after bulk changes keeps plans and space in shape.
