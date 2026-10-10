---
title: "Task Dependencies"
summary: "Which steps must finish before others can start."
levels: { data-engineer: junior , data-analyst: mid-level }
aliases: ["task ordering", "upstream and downstream", "DAG dependencies"]
prereqs: ["pipeline-dag"]
related: ["pipeline-dag", "scheduling-pipelines", "idempotent-pipeline", "pipeline-retries", "sensors", "partitioned-runs"]
---

Task dependencies say which steps of a pipeline must finish before others may start. If task B needs the output of task A, then B depends on A: A is **upstream**, B is **downstream**.

```
extract_orders ──┐
                 ├──▶ join_orders_customers ──▶ build_revenue_table ──▶ refresh_dashboard
extract_customers┘
```

The two extracts have no dependency on each other, so an orchestrator can run them in parallel. The join waits for both. This graph of tasks and dependencies is a [DAG](/t/pipeline-dag).

Orchestrators let you declare them, for example in Apache Airflow:

```python
# e.g. Airflow-style syntax
[extract_orders, extract_customers] >> join_orders_customers >> build_revenue_table
```

## Why get them right

- **Correctness.** Without a dependency, a downstream step may read half-written or yesterday's data.
- **Speed.** Independent tasks run in parallel; missing this makes pipelines slow for no reason.
- Failure handling. If `extract_orders` fails, downstream tasks are not run on bad data, and when you fix and re-run it they continue from there.

## Classic mistakes

- Using the clock instead of a dependency, like "job B starts at 2:00 because job A usually finishes by then". The first slow day, B reads incomplete data. Make B depend on A (or on a [sensor](/t/sensors) for the data it needs).
- Hidden dependencies, such as a task reading a table that another pipeline writes, which the orchestrator can't see. Make these explicit.
- Over-linking. Chaining everything in a line when steps are independent makes runs slow and failures cascade needlessly.
- Circular dependencies aren't allowed; a DAG has no loops.

Dependencies decide the order; also make each task safe to re-run. See [idempotent pipeline](/t/idempotent-pipeline).
