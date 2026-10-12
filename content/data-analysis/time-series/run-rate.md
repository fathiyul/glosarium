---
title: "Run Rate"
summary: "Extending today's pace to the full period — and why it usually overstates."
levels: { data-analyst: junior , data-scientist: junior }
aliases: ["run rate", "annualized run rate", "pacing"]
prereqs: ["time-series", "trend"]
related: ["trend", "forecasting", "seasonality", "business-metrics"]
---

A **run rate** extends the pace so far into a full-period number: $2M booked by day 10 of a 30-day month is a $6M monthly run rate. It answers "if this keeps up, where do we land?" in one multiplication. Sales teams live on it; finance uses it to pace quarters.

```text
booked so far: $2.0M in 10 days  →  run rate: $2.0M × 30/10 = $6.0M
```

The catch is that things rarely keep up evenly. Early-month enterprise deals, end-of-quarter pushes, weekday-weekend patterns and [seasonality](/t/seasonality) all bend the pace. A run rate computed on day 3 amplifies three unusual days into a whole-quarter story.

The classic mistakes:

- Quoting it as a forecast. A run rate assumes a flat pace; a [forecast](/t/forecasting) models the shape. Present it as "current pace", never as "expected finish".
- Ignoring calendar effects. Ten days including two weekends annualise differently from ten weekdays. Adjust for working days before multiplying.
- Updating the target to match the run rate. When the pace sags, moving the goalpost hides the miss. Track run rate against a fixed target so the gap stays visible.

Use run rate for pacing conversations early in a period, then switch to a real forecast once enough of the period's shape is known. It is a speedometer, not a destination.
