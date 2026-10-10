---
title: "Sensors"
summary: "Tasks that wait for a condition, like a file arriving."
levels: { data-engineer: mid-level }
aliases: ["sensor task", "file sensor", "waiting task", "polling task"]
prereqs: ["scheduling-pipelines", "pipeline-dag"]
related: ["data-aware-scheduling", "scheduling-pipelines", "asset-based-orchestration", "task-dependencies", "pipeline-dag", "data-freshness"]
---

A **sensor** is a task in an orchestrator that waits for a condition to become true before letting downstream tasks run. Typical conditions: a file has landed, a partition exists, or an upstream table has new rows. The orchestrator checks (polls) the condition repeatedly, and proceeds once it is met or gives up after a timeout.

It replaces the fragile pattern "run at 02:00 because the upstream file usually arrives by then". The first day the upstream is late, your job runs against incomplete data and nobody notices. A sensor makes the dependency explicit: the job starts when the data is actually there.

```python
# illustrative, Airflow-style
wait_for_orders = FileSensor(
    task_id="wait_for_orders",
    filepath="/landing/orders/2024-06-01.csv",
    poke_interval=60,   # seconds between checks
    timeout=3600,       # give up after an hour
)
wait_for_orders >> transform >> load
```

**Watch what "ready" means.** A file can exist before it is fully written. Wait for a completion marker (often a `_SUCCESS` file) or a manifest, not just for the path to appear. An upstream table can likewise have a partition that exists but is still being filled.

**Sensors cost resources while they wait.** A polling sensor can hold a worker slot for as long as it waits, so dozens of them can starve the tasks that do real work. Many orchestrators offer a mode that frees the slot between checks or a deferrable/event-driven variant; prefer those for long waits. Always set a timeout, and make a timeout fail the run (or raise an alert) rather than silently succeeding and letting downstream jobs read missing data.

When not to use one: if your orchestrator supports data-aware or asset-based triggers, those express "run when this dataset is updated" without polling ([data-aware scheduling](/t/data-aware-scheduling), [asset-based orchestration](/t/asset-based-orchestration)). A sensor is the right tool when the condition is something the orchestrator cannot track by itself, such as an external file drop.

Related: [pipeline scheduling](/t/scheduling-pipelines), [task dependencies](/t/task-dependencies), [idempotent pipelines](/t/idempotent-pipeline), [data freshness](/t/data-freshness).
