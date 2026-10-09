---
title: "Data Lineage"
summary: "Where data came from and everything it flows into."
levels: { data-engineer: mid-level }
aliases: ["lineage", "data provenance", "column-level lineage", "upstream and downstream", "data flow lineage"]
prereqs: ["pipeline-dag"]
related: ["data-catalog", "data-incident", "data-observability", "data-contract", "deprecating-tables", "data-governance"]
core: [data-engineer]
---

**Data lineage** is the **map of where data comes from and where it goes**: which sources feed which tables, which transformations produce which outputs, and which dashboards, models and exports depend on them.

```
app_db.orders ─┐
               ├─► stg_orders ─► fct_orders ─┬─► revenue dashboard
payments_api ──┘                             ├─► finance export
                                             └─► churn model features
```

**Upstream** means what a dataset is built from. **Downstream** means what depends on it. Lineage can be tracked at the **table level** (this table uses those tables) or at the **column level** (this metric comes from these source columns).

## What you use it for

- **Impact analysis**: before changing or dropping a column or table, see what will break ([deprecating tables](/t/deprecating-tables)).
- **Incident response**: when a source is wrong, find every downstream consumer to warn. When a number is wrong, trace it back to its origin ([data incidents](/t/data-incident), [debugging a failed pipeline](/t/debugging-failed-pipeline)).
- **Trust and understanding**: "where does this revenue number come from?" ([metric definitions](/t/metric-definitions)).
- **Governance and compliance**: show where personal data flows, and prove how a reported figure was derived ([data governance](/t/data-governance)).
- **Cost clean-up**: find tables nothing uses.

## How it's captured

- **From code**: SQL transformation tools know the dependency graph, because models reference each other ([SQL transformation models](/t/sql-transformation-models)).
- **From orchestrators**: tasks and the datasets they read and write ([pipeline DAGs](/t/pipeline-dag)).
- **By parsing queries and logs** from warehouses and BI tools.
- **From standards and integrations** that emit lineage events from jobs.
- **Manually**, for things that can't be inferred (spreadsheets, scripts). It decays quickly.

Lineage is usually shown inside a [data catalog](/t/data-catalog).

## Limits and good habits

- **Automated lineage has gaps**: dynamic SQL, code-based transformations and spreadsheets are hard to trace. Treat missing links as unknown, not as "no dependencies".
- **Column-level lineage** is more useful and harder to get right.
- **It describes dependencies, not correctness.** Combine it with tests and monitoring ([data observability](/t/data-observability)).
- **Keep it current by deriving it from the real code and runs**, not from hand-drawn diagrams.
- **Use it in change processes**: check downstream impact in the pull request, and notify the owners of consumers ([data contracts](/t/data-contract)).
