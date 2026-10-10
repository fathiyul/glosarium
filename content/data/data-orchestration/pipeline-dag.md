---
title: "Pipeline DAG"
summary: "A pipeline expressed as tasks and their dependencies."
levels: { data-engineer: junior , data-analyst: mid-level }
aliases: ["DAG", "directed acyclic graph pipeline", "workflow DAG", "task graph", "data pipeline graph"]
prereqs: ["batch-processing"]
related: ["task-dependencies", "scheduling-pipelines", "idempotent-pipeline", "directed-acyclic-graph", "orchestrator-choice", "partitioned-runs"]
core: [data-engineer]
---

A data pipeline is usually a set of **tasks** with **dependencies** between them: "load the orders **after** the extract finishes, and build
the report **after** both orders and customers are loaded." Drawn as a graph, tasks are the nodes and dependencies are the arrows. That
graph is the **DAG**: a **directed acyclic graph** ([DAG](/t/directed-acyclic-graph)).

```
extract_orders ─┐
                ├─► transform ─► load_warehouse ─► build_report
extract_customers ┘
```

- **Directed**: dependencies have a direction (A must finish before B).
- **Acyclic**: no loops. A task can't (directly or indirectly) depend on itself, because then nothing could ever run first.

In an orchestrator such as Airflow, Dagster or Prefect, you define it in code:

```python
# Airflow-style
extract_orders >> transform
extract_customers >> transform
transform >> load_warehouse >> build_report
```

## What the graph gives you

- **Correct order**: a task runs only when everything it depends on has succeeded.
- **Parallelism**: independent tasks (the two extracts) run at the same time.
- **Partial reruns**: if `load_warehouse` fails, rerun it and what comes after, without redoing the extracts.
- **Visibility**: you can see where a run is stuck, and what a failure blocks downstream.
- **Clear ownership and documentation**: the graph *is* the description of the pipeline.

## Designing a good one

- **One clear job per task.** Small tasks are easier to retry, debug and reuse than a script doing everything.
- **Make every task [idempotent](/t/idempotent-pipeline)**, so that rerunning it is safe.
- **Pass data through storage** (files, tables), not through memory or task messages, so tasks can run on different machines and be rerun on their own.
- **Express real dependencies only.** Extra arrows reduce parallelism, and missing ones cause tasks to run too early.
- **Parameterize by time window** so a DAG can run for any date ([partitioned runs](/t/partitioned-runs)).
- **Keep the DAG definition cheap.** It's parsed repeatedly, so don't run queries or heavy imports at definition time.

See [task dependencies](/t/task-dependencies) for the kinds of relationships (all upstream succeeded, any failed, etc.),
[scheduling](/t/scheduling-pipelines) and [orchestrator choice](/t/orchestrator-choice).
