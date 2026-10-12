---
title: "Data-Aware / Event-Driven Scheduling"
summary: "Triggering work when data lands instead of at fixed times."
levels: { data-engineer: mid-level , data-scientist: mid-level }
aliases: ["event-driven scheduling", "data-driven scheduling", "dataset-aware scheduling", "trigger on data arrival", "asset-based scheduling"]
prereqs: ["scheduling-pipelines"]
related: ["sensors", "scheduling-pipelines", "asset-based-orchestration", "partitioned-runs", "push-vs-pull-ingestion", "task-dependencies"]
core: [data-engineer]
---

**Time-based scheduling** says "run at 02:00, because the upstream data usually lands by then". When the upstream is late, the job processes incomplete data, silently. **Data-aware (or event-driven) scheduling** triggers work **when the data it depends on is actually ready**.

```
Time-based:   02:00 ─► run (hope the data is there)
Data-aware:   upstream table updated / file landed ─► run the downstream job
```

## Ways to do it

- **Sensors**: a task that waits (polls) for a condition: a file exists, a partition appears, a table has new rows ([sensors](/t/sensors)).
- **Dataset or asset triggers**: the orchestrator tracks that task A *produces* dataset X, and automatically runs jobs that *consume* X when it's updated ([asset-based orchestration](/t/asset-based-orchestration)).
- **Event notifications**: object storage sends an event when a file arrives, a webhook fires or a message is published, and that starts the pipeline ([push vs pull](/t/push-vs-pull-ingestion)).
- **Upstream completion triggers**: a pipeline starts when another finishes (a chain of DAGs).

## Benefits

- **No guessing about timing**, and no idle waiting time baked into schedules.
- **Faster results**: downstream work starts as soon as data is ready.
- **Correctness**: no running on partial or stale inputs.
- **The dependency is explicit**, and visible in lineage.

## Pitfalls

- **"Ready" is hard to define.** A file may appear before it's fully written. A partition may exist but be incomplete. Use completion markers (`_SUCCESS` files), manifests or table-level commit signals.
- **Missed events**: if the notification is lost, nothing runs. Add a **fallback schedule** or a freshness check that alerts on staleness ([data freshness](/t/data-freshness)).
- **Duplicate triggers**: the same event may fire twice, so make runs idempotent ([idempotent pipelines](/t/idempotent-pipeline)).
- **Fan-in**: a job needing three upstream datasets must wait for all of them (and decide what happens if one is late). Timeouts and clear failure handling matter.
- **Sensors can waste resources** if they hold worker slots while polling. Use deferrable or lightweight modes where available.
- **Debuggability**: "why didn't it run?" needs good visibility into events and dependencies.

## A practical blend

Many teams combine them: a **time window** (expected arrival), plus a **data check** (only proceed once the data is really there), plus a **deadline alert** if it isn't by a certain time ([scheduling pipelines](/t/scheduling-pipelines)). Run each interval's work for its own partition ([partitioned runs](/t/partitioned-runs)).
