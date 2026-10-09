---
title: "Reruns and Catch-Up"
summary: "Re-running past intervals after a failure or code change."
levels: { data-engineer: mid-level }
aliases: ["catch-up", "catchup", "backfills in orchestrators", "rerunning past runs", "clearing task runs", "Airflow catchup"]
prereqs: ["partitioned-runs", "idempotent-pipeline"]
related: ["backfill", "idempotent-pipeline", "partitioned-runs", "pipeline-retries", "scheduling-pipelines", "debugging-failed-pipeline"]
core: [data-engineer]
---

Pipelines don't always run when they should. The orchestrator was down, a source was late, or a bug in the logic means last month's results were wrong. **Catch-up** and **reruns** are how you get the right data for past intervals.

- **Catch-up**: automatically running the intervals that were **missed** between a start date (or the last run) and now.
- **Rerun**: deliberately running intervals **again**, after a failure or a code change.

## Catch-up behavior

Many orchestrators have a setting for what to do after a pipeline is deployed or resumed after downtime. In Airflow, for example, `catchup=True` creates runs for every missed interval since the start date, and `catchup=False` only runs the latest one.

```python
with DAG("orders_daily", start_date=datetime(2024, 1, 1), schedule="@daily", catchup=False):
    ...
```

Neither is always right. With `catchup=True` on a new pipeline with an old start date, you suddenly launch hundreds of runs at once. With `False`, missed days stay missing unless you backfill them.

## Rerunning

- **Retry a failed task** (and what depends on it) after fixing the cause.
- **Clear or re-trigger specific runs** for a date range, from the UI or command line.
- **Backfill** a range after a logic change or a source correction ([backfill](/t/backfill)).

## What makes it safe

- **Idempotent, partitioned runs.** Each rerun for a date replaces that date's output, and nothing duplicates ([idempotent pipelines](/t/idempotent-pipeline), [partitioned runs](/t/partitioned-runs)). Without this, reruns are dangerous.
- **Use the logical date**, not the current time.
- **Be careful with dependencies.** Rerunning an upstream interval means downstream ones are now stale, so rerun them too (and in order).
- **Limit concurrency.** Running 365 days in parallel can overload the source or warehouse. Cap parallel runs, and throttle.
- **Mind side effects**: reruns that send emails, post to APIs or trigger alerts. Skip or protect those steps.
- **Mind cost**: a large backfill can be expensive. Estimate before launching.

## Good practice

- **Decide the catch-up policy deliberately** for each pipeline.
- **Tell downstream users** when historical data is being reprocessed, since numbers will change ([data incidents](/t/data-incident)).
- **Verify after reruns**: row counts, totals and tests on the affected partitions.
- **Keep a record** of what was rerun and why.
- **Ensure the inputs still exist.** If you've deleted raw data, or the source can't replay old states, you can't reproduce history ([landing zone](/t/landing-zone)).
