---
title: "Pipeline Orchestration (Airflow)"
summary: "Scheduling and managing data pipelines."
levels: { backend: senior, data-engineer: junior }
aliases: ["Airflow", "orchestrator", "workflow orchestration", "Apache Airflow", "Dagster", "Prefect", "data orchestration"]
prereqs: ["pipeline-dag", "scheduling-pipelines"]
related: ["pipeline-retries", "orchestrator-choice", "catchup-reruns", "idempotent-pipeline", "partitioned-runs", "asset-based-orchestration"]
core: [data-engineer]
also: [data-orchestration]
---

**Pipeline orchestration** is the layer that **runs your pipeline's steps in the right order, on time, and recovers when something fails**. An
orchestrator knows which tasks exist, what depends on what ([pipeline DAG](/t/pipeline-dag)), when to run them
([scheduling](/t/scheduling-pipelines)), what to retry ([retries](/t/pipeline-retries)) and how to show you what happened.

**Apache Airflow** is the best-known; **Dagster** and **Prefect** are other popular ones, and each cloud provider has managed offerings.

```python
# Airflow-style DAG (simplified)
with DAG("orders_daily", schedule="0 2 * * *", start_date=datetime(2024, 1, 1), catchup=False) as dag:
    extract = PythonOperator(task_id="extract", python_callable=extract_orders)
    transform = BashOperator(task_id="transform", bash_command="dbt build --select orders")
    publish = PythonOperator(task_id="publish", python_callable=refresh_dashboard)

    extract >> transform >> publish
```

## What an orchestrator provides

- **Scheduling and triggers**, including waiting for upstream data ([sensors](/t/sensors)).
- **Dependency management** and parallelism.
- **Retries, timeouts and alerts** on failure.
- **Backfills and reruns** for past dates ([catch-up and reruns](/t/catchup-reruns)).
- **A UI and logs** showing run history, durations and failures.
- **Parameters and connections** (secrets for databases and APIs).

## Design advice

- **Orchestrate, don't compute.** The orchestrator should *trigger* work in a warehouse, Spark or a container, not process large data itself inside
  its own workers.
- **Keep tasks idempotent and parameterized by date**, so reruns and backfills are safe ([idempotent pipelines](/t/idempotent-pipeline),
  [partitioned runs](/t/partitioned-runs)).
- **Don't pass big data between tasks** through the orchestrator's metadata. Write to storage and pass a reference.
- **Keep DAG files lightweight**, because the scheduler parses them continuously.
- **Treat pipelines as code**: version control, review and test.
- **Monitor the orchestrator itself.** If it's down, nothing runs, and nothing alerts you.

Some orchestrators model **data assets** (tables and files) and what produces them, instead of only tasks
([asset-based orchestration](/t/asset-based-orchestration)). See [choosing an orchestrator](/t/orchestrator-choice).
