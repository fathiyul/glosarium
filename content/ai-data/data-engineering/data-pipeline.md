---
title: "Data Pipeline"
summary: "A sequence of steps that moves and transforms data."
levels: { backend: mid-level, data-engineer: junior , data-analyst: mid-level }
aliases: ["data pipelines", "pipeline", "ETL pipeline", "data flow pipeline"]
prereqs: ["etl"]
related: ["etl-vs-elt", "pipeline-dag", "scheduling-pipelines", "data-ingestion", "data-transformation", "idempotent-pipeline"]
core: [data-engineer]
also: [data-orchestration]
---

A **data pipeline** is an automated sequence of steps that moves data from where it's produced to where it's used, transforming it on the way:
extract from sources, clean and combine, load into a warehouse, publish for reports.

```
sources ──► ingest ──► store raw ──► clean & transform ──► serve (dashboards, ML, apps)
```

Pipelines can run in **batches** on a schedule or process data **continuously** ([batch vs stream](/t/batch-vs-stream)).

## What turns a script into a pipeline

A one-off script copies data once. A **pipeline** is dependable, repeated and observable:

- **Scheduled or triggered** automatically ([scheduling](/t/scheduling-pipelines)).
- **Ordered with dependencies** between steps ([pipeline DAG](/t/pipeline-dag)).
- **Idempotent**: rerunning a step gives the same result without duplicates ([idempotent pipelines](/t/idempotent-pipeline)).
- **Handles failure**: retries, alerts, partial recovery ([retries](/t/pipeline-retries)).
- **Tested and monitored**: data checks, freshness, row counts ([data tests](/t/data-tests)).
- **Versioned and deployed like code.**
- **Documented**, with an owner.

## Typical problems

- A source changes its schema and the pipeline breaks ([schema drift](/t/schema-drift)).
- Late or missing data produces wrong numbers silently.
- One slow step delays everything downstream.
- Nobody knows what depends on a table, so changes break things.
- Costs creep up as data grows.

Design for **failure and change** from the start, as those are the main reasons pipelines need human attention.
