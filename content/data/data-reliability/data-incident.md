---
title: "Data Incident"
summary: "A data quality failure that reaches users, and how to respond."
levels: { data-engineer: mid-level }
aliases: ["data quality incident", "data outage", "bad data incident", "data downtime incident"]
prereqs: ["data-tests", "incident"]
related: ["data-downtime", "data-observability", "debugging-failed-pipeline", "postmortem", "circuit-breaker-data", "data-lineage"]
core: [data-engineer]
---

A **data incident** is a **data problem that affects the people or systems relying on the data**: a dashboard showing wrong revenue, a model trained on corrupted input, a report that's a day late, customers emailed with the wrong numbers. The pipeline might be "green", but the **data** is wrong, missing or stale.

## Common forms

- **Wrong data**: duplicates, a bad join, a changed definition, a unit mix-up, a source bug.
- **Missing or incomplete data**: a failed load, a partial day, a dropped column.
- **Stale data**: a table didn't update ([data freshness](/t/data-freshness)).
- **Schema or meaning change** upstream that silently altered results ([schema drift](/t/schema-drift)).
- **Exposed sensitive data** (a privacy incident, handled by security and compliance processes).

## Responding, step by step

1. **Detect.** Via a test or monitor (ideally), or a stakeholder noticing ([data observability](/t/data-observability), [data tests](/t/data-tests)).
2. **Triage the impact.** Which tables are affected? Use **lineage** to find downstream dashboards, models and exports, and who uses them ([data lineage](/t/data-lineage)). How wrong, and since when?
3. **Communicate early.** Tell affected consumers what's known, what to avoid using and when you'll update. A short, honest message beats silence. Mark affected data or dashboards as suspect.
4. **Stop the bleeding.** Pause the pipeline, block publication of bad data ([circuit breaker for data](/t/circuit-breaker-data)), or revert to the last good version (table time travel and snapshots help).
5. **Find the cause** ([debugging a failed pipeline](/t/debugging-failed-pipeline), [root cause analysis](/t/root-cause-analysis)).
6. **Fix and recover.** Correct the logic or data, then **reprocess** the affected range with idempotent reruns ([backfill](/t/backfill), [reruns](/t/catchup-reruns)), and verify the numbers against an independent source.
7. **Confirm and close**: tell stakeholders the data is correct again and what changed.
8. **Learn.** Hold a blameless [postmortem](/t/postmortem), and add the test, check or contract that would have caught it.

## Preventing and shrinking them

- **Test at critical points**, and block bad data before it reaches consumers ([write-audit-publish](/t/write-audit-publish)).
- **Monitor freshness, volume and distributions**, and alert on anomalies ([data anomaly detection](/t/data-anomaly-detection)).
- **Know ownership** of each table, so someone responds ([data ownership](/t/data-ownership)).
- **Agree on contracts** with upstream producers ([data contracts](/t/data-contract)).
- **Measure** how long data was bad and how long detection and recovery took ([data downtime](/t/data-downtime)).

The most damaging data incidents are the ones nobody notices. A wrong number used in decisions for weeks costs far more than a loud failure.
