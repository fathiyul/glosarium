---
title: "BI Dashboard"
summary: "A collection of charts answering a recurring business question."
levels: { data-engineer: junior }
aliases: ["BI dashboard", "analytics dashboard", "business dashboard"]
prereqs: ["business-intelligence"]
related: ["business-intelligence", "self-service-analytics", "semantic-layer", "metric-definitions", "data-serving", "aggregate-tables"]
---

A BI dashboard is a collection of charts and numbers that answers a recurring business question, such as "how are sales doing this week?" or "where are users dropping out of signup?". Built in tools like Looker, Tableau, Power BI or Metabase, it is the most common way the output of data engineering reaches people.

For the data engineer, the dashboard is the point where data quality becomes visible. If it shows the wrong number, nobody blames the SQL; they blame the data team.

## What makes a dashboard work

- **One question per dashboard.** Pick an audience and a decision it supports. A page of 40 unrelated charts answers nothing.
- **Agreed definitions.** "Revenue" or "active user" must mean one thing everywhere. Define metrics once, not in every chart. See [metric definitions](/t/metric-definitions) and the [semantic layer](/t/semantic-layer).
- **Show freshness.** Display when the data was last updated, so people don't act on stale numbers.
- **Fast.** A dashboard that takes a minute to load won't be used. Pre-compute heavy aggregations. See [aggregate tables](/t/aggregate-tables).

## Common problems for data engineers

- Charts that disagree. Two dashboards report different totals because each computes the metric from different tables. Fix at the source of truth.
- Dashboard sprawl. Hundreds of abandoned dashboards still querying the warehouse, costing money. Remove unused ones.
- Breaking changes. Renaming a column in a table silently breaks every chart that uses it. Check what depends on a table before changing it.
- Querying raw tables. Point dashboards at modelled, tested tables instead.

Dashboards are one part of [business intelligence](/t/business-intelligence).
