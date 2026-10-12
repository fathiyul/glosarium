---
title: "Choosing an Orchestrator (Airflow, Dagster, Prefect)"
summary: "Task-centric vs asset-centric orchestration and their trade-offs."
levels: { data-engineer: senior , data-scientist: senior }
aliases: ["Airflow vs Dagster vs Prefect", "choosing an orchestrator", "workflow orchestrator comparison", "Airflow", "Dagster", "Prefect"]
prereqs: ["pipeline-orchestration", "asset-based-orchestration"]
related: ["pipeline-orchestration", "asset-based-orchestration", "pipeline-dag", "scheduling-pipelines", "data-aware-scheduling", "workflow-engine"]
core: [data-engineer]
---

Pipelines need something to **schedule, order, retry and monitor** their steps ([pipeline orchestration](/t/pipeline-orchestration)). The main open-source options are **Apache Airflow**, **Dagster** and **Prefect**, alongside managed and cloud-native services (managed Airflow offerings, cloud workflow services). The choice matters because you'll live with it for years, but it's less important than the quality of the pipelines you build on it.

## Rough characterizations

These are generalizations. All of the tools evolve quickly, so check current capabilities.

| | Typical strengths | Typical considerations |
|---|---|---|
| **Airflow** | The most widely adopted. A huge ecosystem of provider integrations, lots of community knowledge, many managed offerings, and plenty of people who know it | Historically **task-centric**. DAG definitions are parsed regularly. Local testing and dev experience have been weaker. Dynamic or highly event-driven workflows were awkward (improving) |
| **Dagster** | **Asset-centric** model with lineage and freshness built in ([asset-based orchestration](/t/asset-based-orchestration)). Good local development, testing and observability. Strong fit with SQL transformation tools | A different mental model. A smaller ecosystem than Airflow |
| **Prefect** | Python-native, with a lightweight, flexible way to write dynamic workflows and flows that look like normal code | Fewer built-in data-lineage concepts than asset-first tools. Differences between hosted and self-hosted setups |
| **Cloud-native workflow services** (step-function style or data-factory style) | Tight integration with a cloud's services. Less infrastructure to run | Lock-in. Sometimes more limited for complex Python logic |
| **Plain cron or a CI scheduler** | Zero extra infrastructure | No dependency management, retries, backfills or visibility. Fine only for tiny setups |

## Questions that decide it

- **What does the team know**, and what can it operate? An orchestrator is infrastructure that needs care, or a managed service.
- **Task-centric or data-centric thinking?** Mostly "run things on a schedule", or "keep these tables fresh"?
- **How dynamic are the workflows?** Static daily jobs, or runtime-generated tasks and event-driven runs ([data-aware scheduling](/t/data-aware-scheduling))?
- **Scale and complexity**: how many pipelines and tasks, and how many teams share it?
- **Local development and testing**: can you run and test pipelines on a laptop?
- **Observability and lineage needs** ([data lineage](/t/data-lineage)).
- **Integrations** you need: warehouses, SQL transformation tools, Spark, cloud services.
- **Operational burden and cost**: self-hosted vs managed, and who's on call for the orchestrator itself.
- **Ecosystem and hiring.**
- **Lock-in and portability**: how much logic lives in the orchestrator's DSL versus plain code?

## Principles that outlast the tool

- **Keep business logic out of the orchestrator.** Put it in plain, testable code or SQL, and let the orchestrator **trigger** it ([pipeline orchestration](/t/pipeline-orchestration)).
- **Write idempotent, partitioned tasks** that any orchestrator can retry and backfill ([idempotent pipelines](/t/idempotent-pipeline), [partitioned runs](/t/partitioned-runs)).
- **Don't pass big data through the orchestrator.** Pass references to storage.
- **Treat orchestration code like code**: version control, review and CI.
- **Monitor the orchestrator itself.** If it fails silently, nothing runs and nothing alerts.
- **Don't over-engineer.** A small team with a few daily jobs may need very little.

Pick one that fits your team and use case, and be prepared to evolve. Good pipeline design makes migration between orchestrators far less painful.
