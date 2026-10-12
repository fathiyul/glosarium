---
title: "Moving Average"
summary: "Smoothing a series by averaging each point with its neighbours."
levels: { data-analyst: mid-level , data-scientist: junior }
aliases: ["moving average", "rolling average", "7-day average"]
prereqs: ["time-series", "trend"]
related: ["trend", "exponential-smoothing", "line-chart", "seasonality"]
---

A **moving average** replaces each point in a [time series](/t/time-series) with the average of the points around it — the last 7 days, say — and the jagged line turns into a readable one. Day-to-day noise cancels out while slower movement survives, so the [trend](/t/trend) and turning points become visible. The 7-day average on every COVID-era dashboard was a moving average doing exactly this job.

```text
daily:   5  9  4  12  6  15  3  ...
7-day avg:       7.7  8.4  ...        (each point = mean of surrounding days)
```

Window size is the whole trade-off. A short window follows turns quickly but leaves noise; a long window is smooth but lags — a 30-day average confirms a downturn weeks after it started. There is no correct size, only the one matched to the question: detecting a change wants short, showing direction wants long.

The classic mistakes:

- Averaging away the signal. A 30-day window on data with strong weekly [seasonality](/t/seasonality) hides both the season and fast breaks. Check the raw series alongside the smoothed one.
- Treating the smoothed line as data. The average lags reality by design; the most recent smoothed value describes the middle of its window, not today. Never read "current value" off a moving average.
- Centered vs trailing confusion. A centered average uses future points and cannot be computed for the latest days; a trailing average can, but lags more. Dashboards should use trailing and say so.
- Smoothing before alerting. Alerts on smoothed values fire late. Detect on raw data, display smoothed.

**When not to use it:** when each point matters (alerts, exact values) or when the series needs modelling rather than viewing — then reach for [exponential smoothing](/t/exponential-smoothing) or a real forecast. Moving averages are for eyes, not for decisions made by machines.
