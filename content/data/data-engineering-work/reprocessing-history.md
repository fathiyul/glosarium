---
title: "Reprocessing History"
summary: "Recomputing past data after a logic fix, safely and affordably."
levels: { data-engineer: mid-level }
aliases: ["reprocessing data", "historical reprocessing", "recomputing history", "backfilling after a fix", "rebuild history"]
prereqs: ["backfill", "idempotent-pipeline"]
related: ["backfill", "catchup-reruns", "partitioned-runs", "idempotent-pipeline", "query-cost", "data-incident"]
core: [data-engineer]
---

Sometimes you must **recompute past data**: you fixed a bug in a transformation, changed a metric definition, added a derived column, corrected a source, or migrated to a new model. The old results are wrong or outdated, and every consumer sees them. Reprocessing history needs more care than a normal run: it's bigger, costlier and visible.

## Plan it before running it

1. **Define the scope**: which tables, which date range, which downstream dependents. Use lineage ([data lineage](/t/data-lineage)).
2. **Check the inputs still exist.** Reprocessing needs the raw data and the right versions of reference data for that time. If the source can't replay history and you didn't keep it, you can't ([landing zone](/t/landing-zone)).
3. **Estimate the cost and time.** Many days of data on large tables can be expensive and slow. Compute on a sample first ([query cost](/t/query-cost), [warehouse cost management](/t/warehouse-cost-management)).
4. **Decide about the change in numbers.** Reprocessing alters historical figures. Agree with stakeholders, and prepare to explain before-and-after.
5. **Choose the approach**: reprocess partition by partition in place, or build a **new version of the table** alongside the old one and switch over afterward (safer and easier to compare).

## Run it safely

- **Idempotent, partitioned runs**: each interval is recomputed independently and *replaces* its old output ([partitioned runs](/t/partitioned-runs), [idempotent pipelines](/t/idempotent-pipeline)).
- **Run in batches, and throttle** so you don't swamp the warehouse or hurt normal jobs. Limit concurrency ([reruns and catch-up](/t/catchup-reruns)).
- **Write to a new location or table first**, validate, then swap atomically (or by renaming), instead of overwriting production data in place.
- **Keep the old output** for a while so you can compare and roll back (table time travel or snapshots help).
- **Process in dependency order**: upstream tables before downstream.
- **Use the right logic for each period**: if business rules changed over time, history may need rules as of each date, not today's.

## Validate

- **Diff old vs new**: row counts, totals and key metrics per period. Differences should match what you expected the change to do, and nothing else.
- **Reconcile** with an independent source where possible ([data reconciliation](/t/data-reconciliation)).
- Run the usual [data tests](/t/data-tests) on the new output.

## Communicate

- Tell consumers what's changing, when and why, before it lands.
- Mark affected dashboards while the process runs, and confirm when it's complete.
- Record what was done: scope, date, reason and code version ([data incidents](/t/data-incident) if it followed one).

## Cautions

- **Downstream copies** (extracts, exports, ML features, cached tables) won't update by themselves.
- **External systems** that received the old data (partners, regulators) may need corrections.
- **Don't reprocess casually.** Weigh the value against cost and disruption. Sometimes it's better to apply a fix going forward and annotate the change.

A well-built, idempotent pipeline turns reprocessing from a scary project into a routine operation. See [backfill](/t/backfill).
