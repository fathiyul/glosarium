---
title: "Onboarding a New Data Source"
summary: "Understanding, ingesting, testing and documenting a new source."
levels: { data-engineer: mid-level , data-scientist: mid-level }
aliases: ["adding a new data source", "new source onboarding", "integrating a new data source", "source onboarding checklist"]
prereqs: ["source-systems", "data-ingestion"]
related: ["source-systems", "data-contract", "data-profiling", "data-tests", "documenting-datasets", "landing-zone"]
core: [data-engineer]
---

Adding a new source to the platform is a small project. Doing it well means understanding the data before you move it, so you don't build a pipeline on wrong assumptions.

## 1. Understand the source

Talk to the **owner** and look at the data:

- **What is it, and why do we need it?** Which questions or products depend on it?
- **Who owns it**, and how do they tell us about changes?
- **How does it change?** Are rows updated in place, or appended? Are deletes hard or soft? Is there reliable `updated_at` or a change log?
- **Volume and growth**, and how fresh we need it.
- **Access method**: database replica, API, files, stream. Credentials, rate limits, and the load we're allowed to put on it ([source systems](/t/source-systems)).
- **Sensitive data**: personal or regulated fields, and what we're allowed to copy and who may see it ([data classification](/t/data-classification)).
- **Known quirks**: time zones, sentinel values, historical changes of meaning, test data mixed in.

## 2. Ingest the raw data first

- Choose the pattern: full or incremental, batch or streaming, pull or push ([full vs incremental](/t/full-vs-incremental-load), [push vs pull](/t/push-vs-pull-ingestion)).
- **Land it raw and untouched**, with load metadata ([landing zone](/t/landing-zone)).
- Make it **idempotent** and restartable ([idempotent pipelines](/t/idempotent-pipeline)).
- Load the **history**, if needed ([backfill](/t/backfill)).

## 3. Profile and validate

Look at what's really in it ([data profiling](/t/data-profiling)): null rates, distinct counts, key uniqueness, ranges, formats, relationships. Compare to what the owner said. Reconcile counts and totals with the source ([data reconciliation](/t/data-reconciliation)).

## 4. Model it

Clean, rename and type it in a staging layer, then build the models consumers need ([data transformation](/t/data-transformation), [staging, intermediate and marts](/t/staging-intermediate-marts)). Decide the grain and keys.

## 5. Test and monitor

- **Data tests**: unique keys, not-null, accepted values, referential integrity ([data tests](/t/data-tests)).
- **Freshness and volume monitoring** with alerts, and an owner for the alerts ([data observability](/t/data-observability)).
- **Schema checks** so upstream changes get noticed ([schema drift](/t/schema-drift)).

## 6. Document and hand over

- A dataset page: description, grain, owner, schedule, caveats and example queries ([documenting datasets](/t/documenting-datasets)).
- Add it to the catalog, and record lineage ([data catalog](/t/data-catalog)).
- Agree on expectations with the source team ([data contract](/t/data-contract)).
- Write a runbook for failures.

## Common mistakes

Building the full model before looking at the data, trusting the documentation over the data, ignoring deletes and history, forgetting about sensitive fields until later, and shipping without tests or an owner. Plan the work, and share what you learn.
