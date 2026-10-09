---
title: "Metric Definitions"
summary: "Precisely defining what a number means, so two dashboards don't disagree."
levels: { data-engineer: junior }
aliases: ["metrics definitions", "KPI definitions", "metric definition", "single source of truth for metrics", "metrics layer"]
prereqs: ["data-dictionary", "group-by"]
related: ["semantic-layer", "metric-discrepancy", "data-dictionary", "self-service-analytics", "bi-dashboard", "aggregate-tables"]
core: [data-engineer]
---

Two dashboards both say "monthly active users", and they show different numbers. The usual cause is that **nobody wrote down exactly what the
metric means**, so each dashboard computed its own version.

A proper **metric definition** pins down everything that affects the number:

| Element | Example for "Monthly Active Users" |
|---|---|
| **Name and purpose** | MAU: how many people use the product in a month |
| **Formula** | Count of distinct `user_id` with at least one qualifying event in the calendar month |
| **Qualifying events** | Logins and actions, excluding automated and background events |
| **Filters** | Exclude test accounts, employees and bots |
| **Grain / dimensions** | By month; can be sliced by country and plan |
| **Time rules** | Calendar month in UTC; late events up to 3 days are included |
| **Source** | `analytics.fct_user_events` |
| **Owner** | Product analytics |

```sql
SELECT DATE_TRUNC('month', event_time) AS month,
       COUNT(DISTINCT user_id)         AS mau
FROM analytics.fct_user_events
WHERE is_qualifying_event
  AND NOT is_internal_user
GROUP BY 1;
```

## Where disagreements come from

- **Different filters** (are refunds included? test users?).
- **Different time boundaries** (UTC vs local time, event time vs processing time).
- **Different grain** or double counting from a join.
- **Different sources** (app database vs billing system).
- **Different definitions of the same word** ("revenue": booked, recognized or collected?).

## Good practice

- **Define it once, in one place**, in code, and reuse it. That's the idea behind a **semantic layer**
  ([semantic layer](/t/semantic-layer)): metrics defined centrally and consumed by every dashboard and tool.
- **Write it in business language *and* as exact logic.**
- **Version it and announce changes.** Changing a definition changes history, so say when and why, and consider keeping old and new side by
  side for a while.
- **Give every metric an owner.**
- **Document known quirks** ([data dictionary](/t/data-dictionary)).
- When two numbers disagree, compare the definitions first, then the data
  ([metric discrepancy](/t/metric-discrepancy)).

A metric isn't a number. It's an **agreement** about what to count.
