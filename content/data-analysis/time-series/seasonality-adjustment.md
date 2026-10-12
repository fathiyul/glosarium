---
title: "Seasonal Adjustment"
summary: "Removing the calendar pattern so the underlying movement is visible."
levels: { data-analyst: senior , data-scientist: junior }
aliases: ["seasonal adjustment", "deseasonalising", "seasonally adjusted"]
prereqs: ["seasonality", "time-components"]
related: ["seasonality", "trend", "moving-average", "stationarity"]
---

**Seasonal adjustment** estimates a series' repeating calendar pattern and divides (or subtracts) it out, leaving trend plus noise. The adjusted series answers "how are we doing apart from the time of year?" — the number behind every "seasonally adjusted" jobs report, retail figure and growth chart.

```text
observed:   Dec spike every year
seasonal:   +25% each December (estimated from history)
adjusted:   Dec spike removed → trend readable month to month
```

It is an estimate, not a fact: the "season" is inferred from past repetition, and the adjustment revises history as new data arrives — last quarter's adjusted growth can change next quarter. Treat adjusted numbers as modelled, and keep the raw series beside them.

The classic mistakes:

- Adjusting with too little history. A season estimated from one repetition is a guess wearing a method's clothes. Two to three full cycles minimum before trusting it.
- Hiding the raw data. Adjusted series look authoritative and smooth; stakeholders forget the adjustment exists. Always show or link the unadjusted series.
- Adjusting away real breaks. A level shift (new pricing, a pandemic) gets smeared across seasons by the estimator, distorting years of history. Detect breaks first; adjust around them.
- Over-adjustment of noisy series. On thin, volatile data the seasonal estimate is mostly noise, and "adjusting" adds error rather than removing pattern. Check the season is stable before removing it.
- Comparing adjusted to unadjusted. Mixing the two in one chart or sentence produces nonsense growth rates. Label every number.

**When not to adjust:** when the audience needs the raw truth (cash planning needs actual December, not adjusted December), when history is short, or when a simple [period-over-period](/t/period-over-period) comparison already answers the question. Adjustment is for trend-reading, not for every chart.
