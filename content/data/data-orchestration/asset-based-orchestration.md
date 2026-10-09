---
title: "Asset-Based Orchestration"
summary: "Orchestrating the datasets you want to exist, not just the tasks."
levels: { data-engineer: senior }
aliases: ["software-defined assets", "asset-centric orchestration", "Dagster assets", "data asset orchestration", "declarative orchestration"]
prereqs: ["pipeline-dag", "pipeline-orchestration"]
related: ["orchestrator-choice", "data-aware-scheduling", "pipeline-dag", "data-lineage", "partitioned-runs", "idempotent-pipeline"]
core: [data-engineer]
---

Traditional orchestration is **task-centric**: you define **tasks** and the order they run in ("run extract, then transform, then load"). **Asset-based orchestration** is **data-centric**: you declare the **assets** (the tables, files and models that should exist), **what each is built from**, and **how to produce it**, and the orchestrator works out what to run.

```python
# Dagster-style assets (illustrative)
@asset
def raw_orders():
    return extract_orders()

@asset
def clean_orders(raw_orders):            # depends on raw_orders
    return clean(raw_orders)

@asset
def daily_revenue(clean_orders):         # depends on clean_orders
    return aggregate(clean_orders)
```

The orchestrator builds a graph of **assets and dependencies**, and can ask: *"Is `daily_revenue` up to date? If upstream data changed, which assets are stale? Rebuild just those."*

## What changes compared with task DAGs

| Task-centric | Asset-centric |
|---|---|
| "Run these steps on this schedule" | "Make these datasets exist and stay fresh" |
| The graph is a set of operations | The graph is a set of **data assets** and their lineage |
| Tasks hide what data they produce | The produced assets are first-class, named and trackable |
| Rerun by task and date | Rematerialize an asset, or everything downstream of a changed one |
| Lineage needs extra tooling | Lineage comes from the declarations ([data lineage](/t/data-lineage)) |

## Benefits

- **Lineage and observability built in**: you can see what each asset depends on, when it was last materialized, and whether it's stale or failing.
- **Targeted recomputation**: after a bug fix or an upstream change, rebuild only the affected assets ([reprocessing history](/t/reprocessing-history)).
- **Declarative freshness**: state how fresh an asset should be (and, in some tools, let the orchestrator schedule work to meet it) ([data-aware scheduling](/t/data-aware-scheduling), [data freshness](/t/data-freshness)).
- **A natural fit with SQL transformation projects**, whose models are already assets with dependencies ([SQL transformation models](/t/sql-transformation-models)).
- **Easier local development and testing**: assets are functions you can run and test in isolation.
- **Partitions are first-class**: assets can be partitioned by date, with each partition tracked ([partitioned runs](/t/partitioned-runs)).

## Trade-offs

- **A different mental model** from the task-based tools many teams know.
- **Not everything is an asset.** Side-effect-heavy operations (sending emails, calling APIs, deploying) fit tasks more naturally.
- **Maturity and ecosystem** differ between tools, and the lines are blurring: task-based orchestrators have added dataset and asset concepts too ([choosing an orchestrator](/t/orchestrator-choice)).
- **Migration cost** for existing pipelines.

## Practical advice

- Think in assets even if your tool is task-based: name each dataset a pipeline produces, and document its inputs and freshness expectations ([documenting datasets](/t/documenting-datasets)).
- Keep asset definitions **idempotent and parameterized by partition** ([idempotent pipelines](/t/idempotent-pipeline)).
- Use the asset graph for impact analysis in changes and incidents ([data incidents](/t/data-incident)).
