---
title: "Period-Over-Period Comparison"
summary: "This week vs last week, done without fooling yourself."
core: [data-scientist]
levels: { data-analyst: junior , data-scientist: junior }
aliases: ["period over period", "PoP comparison", "week over week", "year over year"]
prereqs: ["time-series", "seasonality"]
related: ["seasonality", "trend", "run-rate", "metric-definitions"]
---

**Period-over-period** compares a metric against its own past: week-over-week, month-over-month, year-over-year. It is the most common analysis in business, and the most common source of false stories — because two adjacent periods differ in composition, calendar and context, not just performance.

```text
this week: 1,204 signups   last week: 1,089   →  +10.5% WoW
check first: same weekdays? holiday? campaign? definition unchanged?
```

Make the periods genuinely comparable before computing: align weekdays, adjust for holidays and campaigns, confirm the [metric definition](/t/metric-definitions) did not change mid-stream. A definition change between periods makes the comparison measure the instrumentation, not the business.

The classic mistakes:

- Ignoring [seasonality](/t/seasonality). December beats November every year; Monday beats Sunday every week. Compare against the matching period, not the adjacent one.
- Percentage on tiny bases. "+100%!" from 2 to 4 signups is noise with a chart. Show absolute numbers beside every percentage.
- Cherry-picked windows. The comparison that makes the number look best is suspicious precisely because it was chosen after seeing the data. Fix comparison windows by rule (trailing 4 weeks, same quarter last year), not by inspection.
- Mixing adjusted and raw. A seasonally adjusted this-month against a raw last-month is nonsense. Label every number.

**The rule:** comparable periods, absolute numbers beside percentages, fixed windows. Done right, PoP is the fastest honest read on performance; done carelessly, it is a story generator.
