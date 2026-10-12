---
title: "Business Intelligence (BI)"
summary: "Dashboards and reports that help people make decisions."
levels: { data-engineer: junior , data-analyst: junior , data-scientist: mid-level }
aliases: ["BI", "analytics reporting", "business analytics"]
prereqs: ["data-warehouse"]
related: ["bi-dashboard", "data-serving", "semantic-layer", "self-service-analytics", "data-warehouse", "metric-definitions"]
core: [data-analyst]
---

Business intelligence (BI) is the practice and tooling for turning company data into reports and dashboards that help people make decisions. Typical questions: what were sales last quarter, which regions are growing, how many users churned.

A typical BI stack, from the data side:

```
source systems ─▶ pipelines ─▶ warehouse ─▶ BI tool (dashboards, reports)
```

BI tools include Looker, Tableau, Power BI and Metabase. They connect to the [warehouse](/t/data-warehouse), run queries, and present charts that non-programmers can filter and explore.

## BI versus other analytics work

BI mostly looks backwards at **known questions** with agreed metrics ("what happened?"). Data science and machine learning explore open-ended questions or predict the future. Both depend on the same clean data underneath.

## What data engineers do for it

- Prepare modelled, documented tables designed for analysis.
- Define metrics once so charts agree. See [metric definitions](/t/metric-definitions) and the [semantic layer](/t/semantic-layer).
- Keep data fresh and monitor the pipelines.
- Control cost: poorly written dashboards can run heavy queries constantly.
- Enable [self-service](/t/self-service-analytics) so analysts can answer their own questions without a ticket to the data team.

## Pitfalls

- **Conflicting numbers.** The classic BI problem: finance and sales report different revenue because they define it differently. Settle definitions and implement them in one place.
- **Trusting a number without knowing its source.** Show where the data comes from and when it last updated.
- **Too many dashboards, too little adoption.** Build for real decisions, check usage, and retire what nobody opens.
- Treating the BI tool as the data model. Putting logic only inside dashboards makes it hard to reuse and test.
