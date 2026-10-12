---
title: "Seasonality"
summary: "Patterns that repeat on a calendar: weekly, monthly, yearly."
levels: { data-analyst: mid-level , data-scientist: junior }
aliases: ["seasonality", "seasonal pattern", "weekly seasonality"]
prereqs: ["time-series", "time-components"]
related: ["time-series", "trend", "period-over-period", "seasonality-adjustment"]
---

**Seasonality** is the part of a [time series](/t/time-series) that repeats on a calendar: restaurant traffic dipping on Mondays, retail spiking every December, B2B signups sagging in August. Same shape, same calendar position, year after year. Once you see it, comparing any two adjacent periods without accounting for it is misleading — November always beats October, and that tells you nothing about performance.

```text
sales:  low ... climb ... PEAK(Dec) ... low ... climb ... PEAK(Dec)
         ← one year →  ← one year →
```

The honest comparison is [period-over-period](/t/period-over-period): this December against last December, this Monday against recent Mondays. That single habit removes most seasonal confusion without any modelling.

The classic mistakes:

- Celebrating a seasonal high as growth. December beat November because it is December. Compare like with like before claiming a win.
- One year of history treated as a pattern. A single December spike could be a one-off campaign. Two or three repetitions make a season; one makes an anecdote.
- Ignoring moving seasons. Easter, Ramadan, Lunar New Year and Black Friday slide around the calendar. Year-over-year comparisons that ignore the shift compare different things.
- Confusing season with trend. Several strong seasons in a row can mask a declining [trend](/t/trend), and vice versa. Split the series into [components](/t/time-components) so each gets judged on its own.

**When to go further:** if you need numbers with the season removed — for targets, anomaly alerts, or models — that is [seasonal adjustment](/t/seasonality-adjustment). For reading a chart correctly, period-over-period is usually enough.
