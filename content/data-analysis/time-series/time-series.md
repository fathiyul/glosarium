---
title: "Time Series"
summary: "Data ordered in time, and why the order changes everything."
levels: { data-analyst: mid-level , data-scientist: junior }
aliases: ["time series", "temporal data", "time-ordered data"]
prereqs: ["dataset", "line-chart"]
related: ["trend", "seasonality", "forecasting", "line-chart", "stationarity"]
---

A **time series** is data with an order that matters: daily revenue, hourly error rates, monthly active users. The order is the whole point — shuffling the rows of a time series destroys its meaning, which is what separates it from ordinary tables where rows are interchangeable. Almost every number a business watches is a time series.

```text
ordinary table:  rows interchangeable → summaries, group-bys
time series:     order is meaning → trends, seasons, streaks, breaks
```

That order breaks tools built for independent rows. Random train-test splits leak the future into training; averages hide movement; a single summary number cannot show a break halfway through. Time-series work starts by plotting the series as a [line chart](/t/line-chart) and reading its shape before computing anything.

The classic mistakes:

- Treating time-ordered rows as independent. Correlated neighbours, drift and breaks violate the assumptions behind ordinary averages and tests. Methods must respect the order (see [stationarity](/t/stationarity)).
- Summarising before looking. A monthly average can hide a mid-month collapse and recovery. Plot first, summarise second.
- Comparing adjacent periods naively. This week vs last week mixes [trend](/t/trend) and [seasonality](/t/seasonality) into one number. Compare like with like, or split the [components](/t/time-components).
- Future leakage. Any feature, split or aggregate that uses information from after the decision point inflates backtests and fails live. Cut strictly by time.

**When it matters most:** monitoring, alerting, [forecasting](/t/forecasting) and any before/after claim. If time is on an axis, the order is load-bearing — analyse it as a series, not a bag of rows.
