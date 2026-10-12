---
title: "Descriptive Analysis"
summary: "Summarising what happened: counts, averages, breakdowns."
core: [data-scientist]
levels: { data-analyst: junior , data-scientist: junior }
aliases: ["descriptive analysis", "descriptive statistics in practice", "summarising data"]
prereqs: ["statistics-basics", "group-by"]
related: ["descriptive-statistics", "exploratory-data-analysis", "diagnostic-analysis", "data-visualization"]
---

**Descriptive analysis** answers "what happened?" with summaries: totals, averages, breakdowns by segment, distributions over time. It is the foundation every other analysis type stands on — you cannot diagnose, predict or prescribe before you can describe accurately.

```text
raw events → totals, means, medians → breakdowns (by segment, by time)
           → distributions (shape, spread, outliers)
```

The work is choosing summaries that do not lie by omission. A mean without the distribution hides skew; a total without the time window hides pace; a breakdown by one dimension hides the dimension that actually explains it. Report the centre *and* the spread, the total *and* the rate, the overall *and* the segments.

The classic mistakes:

- Mean-only reporting. Revenue per user "averages $40" while the median is $3 and one whale pays thousands. Show the distribution or pick the [typical value](/t/central-tendency) honestly.
- Breakdowns that stop one level too soon. Overall conversion is flat while every segment moves — [Simpson's paradox](/t/simpsons-paradox) lives in undescribed data. Cut by the dimensions that could change the story.
- Precision without context. "12,483 users" with no comparison, no window, no definition of "user". Every number needs its denominator and its timeframe.
- Describing dirty data beautifully. Summaries of unexamined data launder its problems. Profile first ([exploratory analysis](/t/exploratory-data-analysis)).

Good description is underrated because it looks easy. It is easy to do and easy to do misleadingly — the difference is whether each number carries its context with it. See [data visualisation](/t/data-visualization) for presenting it.
