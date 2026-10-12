---
title: "Data SLAs and SLOs"
summary: "Promises about when data will be ready and how correct it will be."
levels: { data-engineer: senior , data-analyst: senior , data-scientist: senior }
aliases: ["data SLO", "data service level agreement", "data SLAs", "data reliability targets", "data freshness SLA"]
prereqs: ["slo", "data-freshness"]
related: ["slo", "data-freshness", "data-quality-dimensions", "data-contract", "data-incident", "data-observability"]
core: [data-engineer]
---

A **data SLA** (or SLO) is a **promise about the data you provide**: when it will be ready, how complete and correct it will be, and how quickly problems will be handled. It applies the ideas of [service level objectives](/t/slo) to datasets and pipelines, so consumers know what to rely on and producers know what they're accountable for.

Without one, expectations are implicit and unequal: the finance team assumes the table is ready by 07:00 and exactly right, the data team assumes "sometime in the morning, mostly correct", and the gap is discovered during a board meeting.

## What a data SLA covers

| Dimension | Example commitment |
|---|---|
| **Freshness / timeliness** | "`analytics.orders` is updated by 06:00 UTC every day" ([data freshness](/t/data-freshness)) |
| **Completeness** | "Contains all orders up to the previous midnight, with fewer than 0.1% missing" |
| **Accuracy / correctness** | "Revenue reconciles with the finance ledger within 0.5%" ([data reconciliation](/t/data-reconciliation)) |
| **Validity and uniqueness** | "No duplicate `order_id`; status only has allowed values" ([data quality dimensions](/t/data-quality-dimensions)) |
| **Availability** | "Queryable 99.5% of the time" |
| **Schema stability** | "No breaking schema changes without 30 days' notice" ([data contracts](/t/data-contract)) |
| **Support and response** | "Issues acknowledged within 2 hours in working hours; critical incidents within 30 minutes" |

As with service SLOs, define **indicators** (what's measured), **targets** (the level) and a **window**, and consider an **error budget**: how often it's acceptable to miss ([error budget](/t/error-budget)).

```
SLI:  lag = time between the 06:00 deadline and the table's publication
SLO:  published by 06:00 UTC on 95% of days over a rolling 30 days, and by 08:00 on 100%
```

## Setting them sensibly

- **Start from consumer needs.** Who uses this data, for what decision, and what happens if it's late or wrong? A dashboard reviewed weekly needs less than a fraud model.
- **Tier your data.** Critical datasets (finance reporting, customer-facing features) get tight SLAs, monitoring and on-call. Exploratory datasets get "best effort", stated clearly.
- **Be realistic.** Look at actual historical performance and upstream dependencies: you can't promise more than your sources deliver.
- **Account for upstream** SLAs: if the source arrives at 05:30, a 06:00 promise leaves little margin.
- **Agree them with consumers**, in writing, in the dataset's documentation ([documenting datasets](/t/documenting-datasets)).

## Making them real

- **Measure automatically** with freshness and quality checks ([data observability](/t/data-observability), [data tests](/t/data-tests)), and report compliance over time.
- **Alert before the deadline** when a run is late, so people can intervene.
- **Have a response process** when breached: communicate early, fix, and review ([data incidents](/t/data-incident)).
- **Review periodically**: raise or relax targets as needs and capabilities change.
- **Don't make promises you can't monitor.**

A data SLA is more than a number: it's a conversation that makes expectations explicit and builds trust. Pair it with ownership ([data ownership](/t/data-ownership)) and clear interfaces ([data products](/t/data-product)).
